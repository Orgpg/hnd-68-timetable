import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import ReminderUser from "@/models/ReminderUser"
import { getUnsubscriptionConfirmationEmailHtml } from "@/lib/utils/email-templates"

// Create a Nodemailer transporter using Zoho Mail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_MAIL_HOST,
  port: Number.parseInt(process.env.ZOHO_MAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.ZOHO_MAIL_USER,
    pass: process.env.ZOHO_MAIL_PASS,
  },
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    // Redirect to reminder page with an error status
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reminder?status=error&message=Unsubscribe token is missing.`,
    )
  }

  await dbConnect()

  let userEmail: string | undefined
  let userName: string | undefined

  try {
    // Find and delete the user based on the unsubscribe token
    const user = await ReminderUser.findOneAndDelete({ unsubscribeToken: token })

    if (!user) {
      // Redirect to reminder page with an error status
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reminder?status=error&message=Invalid or expired unsubscribe token, or user already unsubscribed.`,
      )
    }

    userEmail = user.email
    userName = user.name

    // Send unsubscription confirmation email
    try {
      const userMailOptions = {
        from: `"HND 68 Timetable" <${process.env.ZOHO_MAIL_USER}>`,
        to: user.email,
        subject: "HND 68 Timetable Reminder Unsubscription Confirmation",
        html: getUnsubscriptionConfirmationEmailHtml(user.name, user.email),
      }
      await transporter.sendMail(userMailOptions)
      console.log(`Unsubscription confirmation email sent to ${user.email}.`)
    } catch (emailError: any) {
      console.error(`Failed to send unsubscription confirmation email to ${user.email}:`, emailError)
      // Continue even if email fails, as the user is already deleted from DB
    }

    // Redirect to reminder page with success status
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reminder?status=unsubscribed&email=${userEmail}`,
    )
  } catch (error: any) {
    console.error("Error during unsubscription:", error)
    // Redirect to reminder page with an error status
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reminder?status=error&message=Internal Server Error during unsubscription.`,
    )
  }
}
