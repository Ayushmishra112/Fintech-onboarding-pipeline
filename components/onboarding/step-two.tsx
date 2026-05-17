"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepTwoProps {
  onNext: () => void
  onBack: () => void
}

const OTP_LENGTH = 6

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [resendIn, setResendIn] = useState(30)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    // Small delay ensures the transition is complete before focusing
    const t = setTimeout(() => {
      inputsRef.current[0]?.focus()
    }, 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const isComplete = otp.every((d) => d !== "")

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus()
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill("")
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setOtp(next)
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[focusIndex]?.focus()
  }

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""))
    setResendIn(30)
    inputsRef.current[0]?.focus()
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-foreground text-balance">
            Verify your number
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We&apos;ve sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">+91 98•••••42</span>
          </p>
        </div>
      </motion.div>

      {/* OTP boxes */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex justify-between gap-1 sm:gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={cn(
                "w-full h-11 max-w-10 sm:h-14 sm:max-w-14 rounded-[var(--radius)] border bg-input/80 text-center",
                "text-xl sm:text-2xl font-semibold tracking-tight text-foreground",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/60",
                "focus:scale-105 focus:-translate-y-0.5 focus:shadow-md",
                digit
                  ? "border-primary/50 bg-primary/[0.05]"
                  : "border-border/80 hover:border-border",
              )}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Didn&apos;t get the code?</span>
          {resendIn > 0 ? (
            <span className="text-muted-foreground">
              Resend in <span className="font-medium text-foreground">{resendIn}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Resend OTP
            </button>
          )}
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex gap-3 pt-2"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="h-14 px-5 rounded-[var(--radius)] border-border/80 bg-transparent hover:bg-card/60"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          size="lg"
          disabled={!isComplete}
          onClick={onNext}
          className={cn(
            "h-14 flex-1 text-[15px] font-semibold rounded-[var(--radius)]",
            "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
            "disabled:opacity-40 disabled:shadow-none",
          )}
        >
          Verify
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
