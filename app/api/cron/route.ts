import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import ReminderUser from "@/models/ReminderUser"
import { getDailyReminderEmailHtml } from "@/lib/utils/email-templates"
import { getMyanmarDate, getDayName } from "@/lib/utils/reminder-date-utils"
import { getDailyEntryByDate } from "@/lib/timetable"
import type { DayOfWeek } from "@/lib/timetable/data"

export async function GET(request: Request) {
  console.log("--- Cron job GET request initiated ---")

  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  const url = new URL(request.url)
  const isTestRun = url.searchParams.get("test") === "true"

  if (isTestRun) {
    console.log("🧪 TEST MODE DETECTED - Will send emails regardless of time restrictions")
  }

  if (!cronSecret) {
    console.error("CRON_SECRET environment variable is not set on Vercel.")
    return NextResponse.json({ message: "Server configuration error: CRON_SECRET missing." }, { status: 500 })
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    console.warn(
      `Unauthorized cron job access attempt. Auth Header: ${authHeader}, Expected Secret: ${cronSecret ? "Set" : "Not Set"}`,
    )
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  console.log("Authorization successful.")

  console.log("Nodemailer Config:")
  console.log(`  ZOHO_MAIL_HOST: ${process.env.ZOHO_MAIL_HOST ? "Set" : "Not Set"}`)
  console.log(`  ZOHO_MAIL_PORT: ${process.env.ZOHO_MAIL_PORT ? process.env.ZOHO_MAIL_PORT : "Not Set"}`)
  console.log(`  ZOHO_NOTI_MAIL: ${process.env.ZOHO_NOTI_MAIL ? "Set" : "Not Set"}`)
  console.log(`  ZOHO_NOTI_PASS: ${process.env.ZOHO_NOTI_PASS ? "Set" : "Not Set"}`)

  let transporter
  try {
    transporter = nodemailer.createTransport({
      host: process.env.ZOHO_MAIL_HOST,
      port: Number.parseInt(process.env.ZOHO_MAIL_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.ZOHO_NOTI_MAIL,
        pass: process.env.ZOHO_NOTI_PASS,
      },
    })
    console.log("Nodemailer transporter created successfully.")
  } catch (e) {
    console.error("Failed to create Nodemailer transporter:", e)
    return NextResponse.json(
      { message: "Email transporter setup failed.", error: (e as Error).message },
      { status: 500 },
    )
  }

  try {
    await dbConnect()
    console.log("MongoDB connected successfully in cron job.")

    const nowYGN = getMyanmarDate() // Current time in Asia/Yangon (UTC-adjusted Date)
    const currentHourYGN = nowYGN.getUTCHours()
    const currentMinuteYGN = nowYGN.getUTCMinutes()

    console.log(`Current Myanmar Time: ${nowYGN.toISOString()}`)
    console.log(`Current Hour YGN: ${currentHourYGN}, Current Minute YGN: ${currentMinuteYGN}`)
    console.log(`Myanmar Time String: ${nowYGN.toLocaleString("en-US", { timeZone: "Asia/Yangon" })}`)
    console.log(`UTC Time: ${new Date().toISOString()}`)

    const usersToProcess = await ReminderUser.find({
      isSubscribed: true,
    })
    console.log(`Found ${usersToProcess.length} subscribed users to process.`)

    if (usersToProcess.length > 0) {
      console.log("Subscribed users:")
      usersToProcess.forEach((user, index) => {
        console.log(
          `  ${index + 1}. ${user.email} (${user.name}) - Token: ${user.unsubscribeToken ? "Present" : "Missing"}`,
        )
      })
    } else {
      console.warn("No subscribed users found in database!")
    }

    const remindersSent: string[] = []
    const errorsSending: string[] = []
    const debugInfo: string[] = []

    // Determine reminder type based on current hour: morning (before 12) or evening (12 and after)
    const isEveningReminder = currentHourYGN >= 12 // 12 PM onwards = evening reminder
    const isMorningReminder = currentHourYGN < 12 // Before 12 PM = morning reminder

    if (isEveningReminder) {
      console.log(
        `Evening reminder triggered at ${currentHourYGN}:${currentMinuteYGN.toString().padStart(2, "0")} YGN - sending tomorrow's schedule`,
      )
      debugInfo.push(
        `Evening reminder at ${currentHourYGN}:${currentMinuteYGN.toString().padStart(2, "0")} - tomorrow's schedule`,
      )

      let dailyEntry
      let tomorrowDateKey = "unknown"

      try {
        const tomorrowUTC = new Date()
        tomorrowUTC.setUTCDate(tomorrowUTC.getUTCDate() + 1)
        dailyEntry = getDailyEntryByDate(tomorrowUTC)
        tomorrowDateKey = dailyEntry?.date || "unknown"
      } catch (error) {
        console.error("Error getting tomorrow's schedule:", error)
        dailyEntry = null
      }

      console.log(`Looking for schedule data for tomorrow: ${tomorrowDateKey}`)
      console.log(`Found daily entry:`, dailyEntry ? `${dailyEntry.sessions.length} sessions` : "null")

      if (dailyEntry) {
        console.log(`Tomorrow's schedule (${tomorrowDateKey}):`)
        dailyEntry.sessions.forEach((session, index) => {
          console.log(`  ${index + 1}. ${session.subject} (${session.time}) - ${session.instructor}`)
        })
        debugInfo.push(`Found ${dailyEntry.sessions.length} sessions for ${tomorrowDateKey}`)
      } else {
        debugInfo.push(`No schedule data found for tomorrow`)
      }

      if (!dailyEntry) {
        console.warn(`No timetable data found for tomorrow. Skipping evening reminders for all users.`)
        errorsSending.push(`No data for tomorrow for evening reminders.`)
      } else {
        for (const user of usersToProcess) {
          try {
            if (!user.unsubscribeToken) {
              console.warn(`User ${user.email} is subscribed but missing unsubscribeToken. Skipping evening email.`)
              errorsSending.push(`Missing unsubscribeToken for ${user.email} (evening)`)
              continue
            }

            let dayName = "Unknown Day"
            try {
              dayName = getDayName(dailyEntry.dayCode as DayOfWeek)
            } catch (error) {
              console.error("Error getting day name:", error)
              dayName = dailyEntry.dayCode || "Unknown Day"
            }

            const mailOptions = {
              from: `"HND 68 Timetable" <${process.env.ZOHO_NOTI_MAIL}>`,
              to: user.email,
              subject: `HND 68 Timetable Reminder for ${dayName}, ${tomorrowDateKey}`,
              html: getDailyReminderEmailHtml(
                user.name,
                tomorrowDateKey,
                dayName,
                dailyEntry,
                user.unsubscribeToken,
                "evening",
              ),
            }
            await transporter.sendMail(mailOptions)
            remindersSent.push(`${user.email} (evening)`)
            console.log(`Evening reminder sent to ${user.email} for ${tomorrowDateKey}.`)
          } catch (emailError: any) {
            console.error(`Failed to send evening reminder email to ${user.email}:`, emailError)
            errorsSending.push(`Evening email to ${user.email} failed: ${emailError.message}`)
          }
        }
      }
    }

    if (isMorningReminder) {
      console.log(
        `Morning reminder triggered at ${currentHourYGN}:${currentMinuteYGN.toString().padStart(2, "0")} YGN - sending today's schedule`,
      )
      debugInfo.push(
        `Morning reminder at ${currentHourYGN}:${currentMinuteYGN.toString().padStart(2, "0")} - today's schedule`,
      )

      let dailyEntry
      let todayDateKey = "unknown"

      try {
        const todayUTC = new Date()
        dailyEntry = getDailyEntryByDate(todayUTC)
        todayDateKey = dailyEntry?.date || "unknown"
      } catch (error) {
        console.error("Error getting today's schedule:", error)
        dailyEntry = null
      }

      console.log(`Looking for schedule data for today: ${todayDateKey}`)
      console.log(`Found daily entry:`, dailyEntry ? `${dailyEntry.sessions.length} sessions` : "null")

      if (dailyEntry) {
        console.log(`Today's schedule (${todayDateKey}):`)
        dailyEntry.sessions.forEach((session, index) => {
          console.log(`  ${index + 1}. ${session.subject} (${session.time}) - ${session.instructor}`)
        })
        debugInfo.push(`Found ${dailyEntry.sessions.length} sessions for ${todayDateKey}`)
      } else {
        debugInfo.push(`No schedule data found for today`)
      }

      if (!dailyEntry) {
        console.warn(`No timetable data found for today. Skipping morning reminders for all users.`)
        errorsSending.push(`No data for today for morning reminders.`)
      } else {
        for (const user of usersToProcess) {
          try {
            if (!user.unsubscribeToken) {
              console.warn(`User ${user.email} is subscribed but missing unsubscribeToken. Skipping morning email.`)
              errorsSending.push(`Missing unsubscribeToken for ${user.email} (morning)`)
              continue
            }

            let dayName = "Unknown Day"
            try {
              dayName = getDayName(dailyEntry.dayCode as DayOfWeek)
            } catch (error) {
              console.error("Error getting day name:", error)
              dayName = dailyEntry.dayCode || "Unknown Day"
            }

            const mailOptions = {
              from: `"HND 68 Timetable" <${process.env.ZOHO_NOTI_MAIL}>`,
              to: user.email,
              subject: `HND 68 Timetable Reminder for ${dayName}, ${todayDateKey}`,
              html: getDailyReminderEmailHtml(
                user.name,
                todayDateKey,
                dayName,
                dailyEntry,
                user.unsubscribeToken,
                "morning",
              ),
            }
            await transporter.sendMail(mailOptions)
            remindersSent.push(`${user.email} (morning)`)
            console.log(`Morning reminder sent to ${user.email} for ${todayDateKey}.`)
          } catch (emailError: any) {
            console.error(`Failed to send morning reminder email to ${user.email}:`, emailError)
            errorsSending.push(`Morning email to ${user.email} failed: ${emailError.message}`)
          }
        }
      }
    }

    console.log("--- Cron job execution finished successfully ---")
    return NextResponse.json(
      {
        message: "Cron job executed successfully",
        testMode: isTestRun,
        currentTime: nowYGN.toISOString(),
        currentHour: currentHourYGN,
        subscribedUsersCount: usersToProcess.length,
        debugInfo: debugInfo,
        remindersSentCount: remindersSent.length,
        remindersSent: remindersSent,
        errorsSendingCount: errorsSending.length,
        errorsSending: errorsSending,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error in cron job main logic:", error)
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
  }
}
