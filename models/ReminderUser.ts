import mongoose, { Schema, type Document } from "mongoose"

export interface IReminderUser extends Document {
  name: string
  email: string
  // reminderDateTimeEvening: Date // Removed as per user request
  // reminderDateTimeMorning: Date // Removed as per user request
  isSubscribed: boolean
  unsubscribeToken?: string
  createdAt: Date
  updatedAt: Date
}

const ReminderUserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // reminderDateTimeEvening: { type: Date, required: true }, // Removed
    // reminderDateTimeMorning: { type: Date, required: true }, // Removed
    isSubscribed: { type: Boolean, default: true },
    unsubscribeToken: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  },
)

if (!mongoose.models.ReminderUser) {
  ReminderUserSchema.index({ email: 1 }, { unique: true })
}

const ReminderUser =
  (mongoose.models.ReminderUser as mongoose.Model<IReminderUser>) ||
  mongoose.model<IReminderUser>("ReminderUser", ReminderUserSchema)

export default ReminderUser
