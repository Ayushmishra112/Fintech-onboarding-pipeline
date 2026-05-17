"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepThreeProps {
  onComplete: () => void
}

const STEPS = [
  { id: 1, label: "Fetching Bureau data" },
  { id: 2, label: "Evaluating School profile" },
] as const

const STEP_DURATION = 2500

export function StepThree({ onComplete }: StepThreeProps) {
  const [activeStep, setActiveStep] = useState(1)
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, index) => {
      const t = setTimeout(() => {
        setCompleted((prev) => [...prev, step.id])
        if (index < STEPS.length - 1) {
          setActiveStep(STEPS[index + 1].id)
        }
      }, STEP_DURATION * (index + 1))
      timers.push(t)
    })

    const finalTimer = setTimeout(() => {
      onComplete()
    }, STEP_DURATION * STEPS.length + 500)
    timers.push(finalTimer)

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <div className="flex flex-col items-center gap-12 py-6">
      {/* Animated radar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-44 w-44"
      >
        {/* Outermost ping rings */}
        <span
          className="absolute inset-0 rounded-full border border-primary/30 radar-ping"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="absolute inset-0 rounded-full border border-primary/30 radar-ping"
          style={{ animationDelay: "0.7s" }}
        />
        <span
          className="absolute inset-0 rounded-full border border-primary/30 radar-ping"
          style={{ animationDelay: "1.4s" }}
        />

        {/* Static rings */}
        <div className="absolute inset-0 rounded-full border border-primary/15" />
        <div className="absolute inset-4 rounded-full border border-primary/20" />
        <div className="absolute inset-10 rounded-full border border-primary/25" />

        {/* Crosshairs */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-primary/15" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-primary/15" />

        {/* Rotating sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="radar-sweep" />
        </div>

        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />

        {/* Center pulse dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_oklch(0.7_0.18_270)]"
          />
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-center space-y-2 max-w-sm"
      >
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground text-balance">
          Analyzing your profile
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We&apos;re crunching the numbers to give you the best offer
        </p>
      </motion.div>

      {/* Progress steps */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        {STEPS.map((step) => {
          const isDone = completed.includes(step.id)
          const isActive = activeStep === step.id && !isDone

          return (
            <motion.div
              key={step.id}
              animate={{
                opacity: isDone || isActive ? 1 : 0.4,
              }}
              className={cn(
                "flex items-center gap-4 rounded-[var(--radius)] border p-4 transition-all duration-300",
                isDone && "border-success/30 bg-success/[0.06] hover:bg-success/[0.08] hover:border-success/40 hover:scale-[1.01]",
                isActive && "border-primary/30 bg-primary/[0.06] shadow-sm shadow-primary/5 hover:bg-primary/[0.08] hover:border-primary/40 hover:scale-[1.01]",
                !isDone && !isActive && "border-border/60 bg-card/30",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                  isDone && "bg-success",
                  isActive && "bg-primary/15 ring-1 ring-primary/40",
                  !isDone && !isActive && "bg-muted",
                )}
              >
                {isDone ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                  >
                    <Check className="h-4 w-4 text-success-foreground" strokeWidth={3} />
                  </motion.div>
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  isDone ? "text-foreground" : isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
