import type { DailyEntry } from "@/lib/timetable"
import { formatSessionTime } from "./date-utils" // Import getUnitColor and getUnitIcon

export function getSubscriptionConfirmationEmailHtml(
  userName: string,
  email: string,
  eveningReminderTime: string, // New parameter
  morningReminderTime: string, // New parameter
  unsubscribeToken: string,
): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2a9d8f;">Hello ${userName},</h2>
      <p>Thank you for subscribing to HND 68 Timetable reminders!</p>
      <p>You will receive daily timetable reminders to your email: <strong>${email}</strong> at the following times (Myanmar Time):</p>
      <ul style="list-style: disc; padding-left: 20px;">
        <li><strong>Evening Reminder:</strong> ${eveningReminderTime} (for the next day's schedule)</li>
        <li><strong>Morning Reminder:</strong> ${morningReminderTime} (as a refresher for today's schedule)</li>
      </ul>
      <p>Stay organized and never miss a class!</p>
      <p>If you wish to unsubscribe at any time, please click here: <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/unsubscribe?token=${unsubscribeToken}" style="color: #e74c3c; text-decoration: none;">Unsubscribe</a></p>
      <p>Best regards,<br>HND 68 Timetable Team</p>
      <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This is an automated confirmation email. Please do not reply directly to this message.</p>
    </div>
  `
}

export function getUnsubscriptionConfirmationEmailHtml(userName: string, email: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #e74c3c;">Hello ${userName},</h2>
      <p>You have successfully unsubscribed from HND 68 Timetable reminders.</p>
      <p>You will no longer receive daily timetable emails to your email: <strong>${email}</strong>.</p>
      <p>We're sad to see you go, but you can always re-subscribe anytime on the <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/reminder" style="color: #2a9d8f; text-decoration: none;">Reminder page</a>.</p>
      <p>Best regards,<br>HND 68 Timetable Team</p>
      <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This is an automated confirmation email. Please do not reply directly to this message.</p>
    </div>
  `
}

export function getDailyReminderEmailHtml(
  userName: string,
  date: string,
  dayName: string,
  dailyEntry: DailyEntry,
  unsubscribeToken: string, // New parameter
  reminderType: "evening" | "morning", // New parameter to distinguish reminder type
): string {
  const hasClasses = dailyEntry && dailyEntry.sessions && dailyEntry.sessions.length > 0
  const isHoliday = dailyEntry && (dailyEntry.label || dailyEntry.dayCode === "SAT" || dailyEntry.dayCode === "SUN")

  let scheduleContent = ""
  if (isHoliday) {
    scheduleContent = `
      <div style="background-color: #fff3e0; border-left: 4px solid #ff9800; padding: 15px; margin-top: 10px; border-radius: 5px;">
        <p style="margin: 0; color: #e65100; font-weight: bold;">${dailyEntry.label || "Holiday - No Classes Scheduled"}</p>
        <p style="margin: 5px 0 0; font-size: 0.9em; color: #e65100;">Enjoy your day off! 🌴☀️</p>
      </div>
    `
  } else if (hasClasses) {
    scheduleContent = `
      <div style="background-color: #f8f8f8; border-radius: 8px; padding: 15px; margin-top: 15px; border: 1px solid #eee;">
        ${dailyEntry.sessions
          .map(
            (session) => `
            <div style="background-color: #ffffff; border-radius: 6px; padding: 12px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
              <div style="font-size: 16px; font-weight: bold; color: #333; margin-bottom: 5px;">
                ${session.unit}
              </div>
              <div style="font-size: 14px; color: #555;">
                <strong>Time:</strong> ${formatSessionTime(session.time)}
              </div>
              <div style="font-size: 14px; color: #555;">
                <strong>Instructor:</strong> ${session.teacher}
              </div>
            </div>
          `,
          )
          .join("")}
      </div>
    `
  } else {
    scheduleContent = `
      <div style="background-color: #e0f7fa; border-left: 4px solid #00bcd4; padding: 15px; margin-top: 10px; border-radius: 5px;">
        <p style="margin: 0; color: #00838f; font-weight: bold;">No Classes Scheduled for Today</p>
        <p style="margin: 5px 0 0; font-size: 0.9em; color: #00838f;">Perfect day for self-study! 📚✨</p>
      </div>
    `
  }

  const subjectLine =
    reminderType === "evening"
      ? `HND 68 Timetable Reminder for ${dayName}, ${date} (Tomorrow's Schedule)`
      : `HND 68 Timetable Reminder for ${dayName}, ${date} (Today's Schedule)`

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h1 style="color: #2a9d8f; text-align: center; margin-bottom: 20px;">HND 68 Timetable Reminder</h1>
      <p>Hello ${userName},</p>
      <p>Here is your class schedule for <strong>${dayName}</strong>:</p>
      ${scheduleContent}
      <p style="margin-top: 20px;">Stay organized and have a great day!</p>
      <p>Best regards,<br>Wai Phyo Aung</p>
      <p style="margin-top: 30px; font-size: 0.8em; color: #777; text-align: center;">
        If you no longer wish to receive these reminders, you can <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/unsubscribe?token=${unsubscribeToken}" style="color: #e74c3c; text-decoration: none;">unsubscribe here</a>.
      </p>
      <p style="font-size: 0.8em; color: #777; text-align: center;">This is an automated email. Please do not reply directly to this message.</p>
    </div>
  `
}
