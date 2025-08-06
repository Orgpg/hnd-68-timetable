"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { submitFeedback } from "@/app/actions/feedback"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { Send, Loader2 } from "lucide-react"

// Declare grecaptcha globally
declare global {
  interface Window {
    grecaptcha: any
  }
}

interface FeedbackFormProps {
  recaptchaSiteKey: string
}

export function FeedbackForm({ recaptchaSiteKey }: FeedbackFormProps) {
  const [state, formAction, isPending] = useActionState(submitFeedback, null)
  const formRef = useRef<HTMLFormElement>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaLoading, setRecaptchaLoading] = useState(true) // State to track reCAPTCHA loading
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)

  useEffect(() => {
    const renderRecaptchaWidget = () => {
      if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current && widgetId.current === null) {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: recaptchaSiteKey, // Use the prop here
          callback: (token: string) => {
            setRecaptchaToken(token)
            setRecaptchaLoading(false) // reCAPTCHA is loaded and token obtained
          },
          "expired-callback": () => {
            setRecaptchaToken(null)
            setRecaptchaLoading(true) // Reset loading state if token expires
            if (widgetId.current !== null) {
              window.grecaptcha.reset(widgetId.current)
            }
          },
          "error-callback": () => {
            setRecaptchaToken(null)
            setRecaptchaLoading(false) // Allow submission even if reCAPTCHA has an error, but token is null
            toast.error("reCAPTCHA encountered an error. Please try again.")
          },
        })
        setRecaptchaLoading(false) // Set to false once render is called, even if token isn't immediately available
      }
    }

    // Check if grecaptcha is already available (e.g., on client-side navigation)
    if (window.grecaptcha && window.grecaptcha.render) {
      renderRecaptchaWidget()
    } else {
      // If not, wait for the script to load and call the render function
      const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          clearInterval(interval)
          renderRecaptchaWidget()
        }
      }, 100) // Check every 100ms

      // Cleanup interval on unmount
      return () => clearInterval(interval)
    }

    // Cleanup function for the widget itself
    return () => {
      if (window.grecaptcha && widgetId.current !== null) {
        window.grecaptcha.reset(widgetId.current)
        window.grecaptcha.destroy(widgetId.current) // Destroy the widget to prevent re-render issues
        widgetId.current = null
      }
    }
  }, [recaptchaSiteKey]) // Add recaptchaSiteKey to dependencies

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset() // Reset form on success
        setRecaptchaToken(null) // Clear token
        setRecaptchaLoading(true) // Re-enable loading state for next submission
        if (widgetId.current !== null) {
          window.grecaptcha.reset(widgetId.current) // Reset reCAPTCHA widget
        }
      } else {
        toast.error(state.message)
        if (state.errors) {
          Object.values(state.errors).forEach((errorMessages) => {
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => toast.error(msg))
            }
          })
        }
        // If reCAPTCHA failed or there was an error, reset it to allow user to try again
        setRecaptchaToken(null)
        setRecaptchaLoading(true) // Re-enable loading state
        if (widgetId.current !== null) {
          window.grecaptcha.reset(widgetId.current)
        }
      }
    }
  }, [state])

  const isSubmitDisabled = isPending || recaptchaLoading || !recaptchaToken

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

        {/* reCAPTCHA widget container */}
        <div ref={recaptchaRef} className="g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
        {state?.errors?.recaptchaToken && <p className="text-red-500 text-xs mt-1">{state.errors.recaptchaToken[0]}</p>}

        {/* Hidden reCAPTCHA token input */}
        <input type="hidden" name="recaptchaToken" value={recaptchaToken || ""} />

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          disabled={isSubmitDisabled}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending Feedback...
            </>
          ) : recaptchaLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Loading reCAPTCHA...
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
