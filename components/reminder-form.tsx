"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribeToReminder } from "@/app/actions/reminder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Loader2, BellRing, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export function ReminderForm() {
  const [subscribeState, subscribeAction, isSubscribing] = useActionState(
    subscribeToReminder,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (subscribeState) {
      if (subscribeState.success) {
        if (subscribeState.isExisting) {
          toast.success(subscribeState.message, {
            icon: <AlertCircle className="h-4 w-4" />,
            duration: 4000,
          });
        } else {
          toast.success(subscribeState.message);
        }
        formRef.current?.reset(); // Reset form on success
      } else {
        toast.error(subscribeState.message);
        if (subscribeState.errors) {
          Object.values(subscribeState.errors).forEach((errorMessages) => {
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => toast.error(msg));
            }
          });
        }
      }
    }

    // Handle unsubscribe success message from URL params
    const status = searchParams.get("status");
    const email = searchParams.get("email");
    if (status === "unsubscribed" && email) {
      toast.success(
        `You have successfully unsubscribed from reminders for ${email}. Your data has been removed.`
      );
      // Clear the query parameters from the URL
      router.replace("/reminder", { scroll: false });
    }
  }, [subscribeState, searchParams, router]);

  const isPending = isSubscribing;

  return (
    <div
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100
    dark:bg-gray-950 dark:border-gray-800"
    >
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Timetable Reminders
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Subscribe to get daily timetable reminders directly to your email! You
        will receive two emails per day: one at{" "}
        <span className="font-semibold text-teal-600 dark:text-teal-400">
          9:00 PM
        </span>{" "}
        (Myanmar Time) for the next day&apos;s schedule, and another at{" "}
        <span className="font-semibold text-teal-600 dark:text-teal-400">
          7:00 AM
        </span>{" "}
        (Myanmar Time) as a morning refresher.
      </p>
      <form ref={formRef} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
            Your Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="mt-1 bg-gray-50 border-gray-200 focus:ring-teal-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-teal-500"
          />
          {subscribeState?.errors?.name && (
            <p className="text-red-500 text-xs mt-1">
              {subscribeState.errors.name[0]}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
            Your Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@example.com"
            required
            className="mt-1 bg-gray-50 border-gray-200 focus:ring-teal-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-teal-500"
          />
          {subscribeState?.errors?.email && (
            <p className="text-red-500 text-xs mt-1">
              {subscribeState.errors.email[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="submit"
            formAction={subscribeAction}
            className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isSubscribing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Subscribing...
              </>
            ) : (
              <>
                Subscribe <BellRing className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        If you don&apos;t see the emails, please check your spam or junk folder
        and mark them as &quot;not spam&quot; to ensure delivery.
      </p>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
        To unsubscribe from reminders, please use the unsubscribe link provided
        in your reminder emails.
      </p>
    </div>
  );
}
