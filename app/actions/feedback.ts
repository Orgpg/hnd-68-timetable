"use server"

import { z } from "zod"
import nodemailer from "nodemailer" // Import nodemailer

// Define schema for feedback form data
const feedbackSchema = z.object({
  type: z.enum(["report", "suggestion"], {
    required_error: "Feedback type is required.",
    invalid_type_error: "Invalid feedback type.",
  }),
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message cannot exceed 500 characters."),
})

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

export async function submitFeedback(prevState: any, formData: FormData) {
  const data = {
    type: formData.get("type"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  // Validate data using zod
  const parsed = feedbackSchema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      message: "Validation failed.",
      errors: errors,
    }
  }

  const { type, email, message } = parsed.data

  try {
    // 1. Send email to Admin
    const adminMailOptions = {
      from: `"Wai Phyo Aung" <${process.env.ZOHO_MAIL_USER}>`,
      to: "admin@waiphyoaung.dev",
      subject: `HND 68 Timetable - New Feedback: ${type.charAt(0).toUpperCase() + type.slice(1)} from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2a9d8f;">New Feedback Received for HND 68 Timetable</h2>
          <p>A new feedback has been submitted through the website:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Feedback Type:</strong> <span style="background-color: #e0f2f1; padding: 5px 10px; border-radius: 5px; color: #2a9d8f;">${
              type.charAt(0).toUpperCase() + type.slice(1)
            }</span></li>
            <li style="margin-bottom: 10px;"><strong>From Email:</strong> <a href="mailto:${email}" style="color: #2a9d8f; text-decoration: none;">${email}</a></li>
            <li><strong>Message:</strong></li>
          </ul>
          <div style="background-color: #f5f5f5; border-left: 4px solid #2a9d8f; padding: 15px; margin-top: 10px; border-radius: 5px;">
            <p>${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This email was sent from the HND 68 Timetable feedback form.</p>
        </div>
      `,
    }

    await transporter.sendMail(adminMailOptions)
    console.log("Admin email sent successfully.")

    // 2. Send confirmation email to User
    const userMailOptions = {
      from: `"Wai Phyo Aung" <${process.env.ZOHO_MAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Feedback on HND 68 Timetable",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2a9d8f;">Dear HND 68 Student,</h2>
          <p>Thank you for taking the time to provide your ${type} for the HND 68 Timetable app. We truly appreciate your input!</p>
          <p>We have received your message:</p>
          <div style="background-color: #f5f5f5; border-left: 4px solid #2a9d8f; padding: 15px; margin-top: 10px; border-radius: 5px;">
            <p>${message}</p>
          </div>
          <p>Your feedback is valuable and helps us improve the app for everyone. We will review your submission and take appropriate action.</p>
          <p>If you have any further questions or need assistance, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Wai Phyo Aung</p>
          <p style="margin-top: 20px; font-size: 0.9em; color: #777;">This is an automated confirmation email. Please do not reply directly to this message.</p>
        </div>
      `,
    }

    await transporter.sendMail(userMailOptions)
    console.log("User confirmation email sent successfully.")

    return {
      success: true,
      message: "Thank you for your feedback! A confirmation has been sent to your email.",
    }
  } catch (error: any) {
    console.error("Failed to submit feedback or send email:", error)
    return {
      success: false,
      message: `Failed to submit feedback. Please try again later. Error: ${error.message || "Unknown error"}`,
    }
  }
}
