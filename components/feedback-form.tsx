'use client'

import { useActionState, useEffect, useRef } from "react"
import { submitFeedback } from "@/app/actions/feedback"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { Send, Loader2 } from 'lucide-react'

interface FeedbackFormProps {}

export function FeedbackForm({}: FeedbackFormProps) {
  const [state, formAction, isPending] = useActionState(submitFeedback, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset() // Reset form on success
      } else {
        toast.error(state.message)
        if (state.errors) {
          Object.values(state.errors).forEach((errorMessages) => {
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => toast.error(msg))
            }
          })
        }
      }
    }
  }, [state])

  const isSubmitDisabled = isPending

  return (
    <div
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100
    dark:bg-gray-950 dark:border-gray-800"
    >
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Send Us Feedback</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Have a suggestion or found a bug? Let us know!</p>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">
            Feedback Type
          </Label>
          <Select name="type" defaultValue="suggestion">
            <SelectTrigger
              className="w-full mt-1 bg-gray-50 border-gray-200 focus:ring-teal-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:focus:ring-teal-500"
            >
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="report">Bug Report</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.type && <p className="text-red-500 text-xs mt-1">{state.errors.type[0]}</p>}
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
          {state?.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
        </div>

        <div>
          <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Describe your feedback here..."
            rows={5}
            required
            className="mt-1 bg-gray-50 border-gray-200 focus:ring-teal-500
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:ring-teal-500"
          />
          {state?.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          disabled={isSubmitDisabled}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending Feedback...
            </>
          ) : (
            <>
              Send Feedback <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
