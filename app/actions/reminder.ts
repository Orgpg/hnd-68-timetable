"use server"

import { z } from "zod"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import ReminderUser from "@/models/ReminderUser"
import { getSubscriptionConfirmationEmailHtml } from "@/lib/utils/email-templates"
import crypto from "crypto" // Import crypto for token generation
// Removed getMyanmarDate, parseTime, addDays as they are no longer needed for initial subscription time setting

// Define schema for reminder form data (no time field)
const reminderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").trim(),
  email: z.string().email("Invalid email address.").min(1, "Email is required.").trim(),
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

export async function subscribeToReminder(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
  }

  // Validate data using zod
  const parsed = reminderSchema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      message: "Validation failed.",
      errors: errors,
    }
  }

  const { name, email } = parsed.data

  await dbConnect()

  try {
    // Generate a unique unsubscribe token
    const unsubscribeToken = crypto.randomBytes(20).toString("hex")

    // Find and update or create a new reminder user
    const existingUser = await ReminderUser.findOne({ email })

    let user
    if (existingUser) {
      // Update existing user's name and ensure they are subscribed
      existingUser.name = name
      existingUser.isSubscribed = true
      existingUser.unsubscribeToken = unsubscribeToken // Update token
      user = await existingUser.save()
      console.log(`Updated reminder for ${email}`)
    } else {
      // Create new user without specific reminder times in DB
      user = await ReminderUser.create({
        name,
        email,
        isSubscribed: true,
        unsubscribeToken,
      })
      console.log(`Created new reminder for ${email}`)
    }

    // Send subscription confirmation email
    const userMailOptions = {
      from: `"HND 68 Timetable" <${process.env.ZOHO_MAIL_USER}>`,
      to: email,
      subject: "HND 68 Timetable Reminder Subscription Confirmation",
      html: getSubscriptionConfirmationEmailHtml(
        name,
        email,
        "9:00 PM", // Display fixed evening time
        "7:00 AM", // Display fixed morning time
        unsubscribeToken,
      ),
    }

    await transporter.sendMail(userMailOptions)
    console.log("Subscription confirmation email sent successfully.")

    return {
      success: true,
      message: "You have successfully subscribed to daily reminders!",
    }
  } catch (error: any) {
    console.error("Failed to subscribe to reminder:", error)
    if (error.code === 11000) {
      return {
        success: false,
        message: "An account with this email already exists. Please update your reminder time.",
        errors: { email: ["This email is already registered."] },
      }
    }
    return {
      success: false,
      message: `Failed to subscribe. Please try again later. Error: ${error.message || "Unknown error"}`,
    }
  }
}
