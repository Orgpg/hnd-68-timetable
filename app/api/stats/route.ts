import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ReminderUser from "@/models/ReminderUser";

export async function GET() {
  try {
    await dbConnect();

    // Get count of subscribed users
    const subscriberCount = await ReminderUser.countDocuments({
      isSubscribed: true,
    });

    // Get total registered users
    const totalUsers = await ReminderUser.countDocuments();

    return NextResponse.json({
      subscriberCount,
      totalUsers,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        subscriberCount: 0,
        totalUsers: 0,
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
