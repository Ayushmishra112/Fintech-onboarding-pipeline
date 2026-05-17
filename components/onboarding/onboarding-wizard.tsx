"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StepWelcome } from "./step-welcome"
import { StepOne } from "./step-one"
import { StepTwo } from "./step-two"
import { StepThree } from "./step-three"
import { StepFour } from "./step-four"
import { ChevronLeft } from "lucide-react"
import { ThemeToggle } from "../theme-toggle"

const TOTAL_STEPS = 5

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const goTo = (step: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrentStep(step)
  }

  const handleNext = () => goTo(Math.min(currentStep + 1, TOTAL_STEPS), 1)
  const handleBack = () => goTo(Math.max(currentStep - 1, 1), -1)

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0, filter: "blur(4px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, filter: "blur(4px)" }),
  }

  // Step 2 (form) and Step 3 (OTP) allow back nav; loading & success do not
  const canGoBack = currentStep === 2 || currentStep === 3

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-subtle">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-5 py-3.5">
          {/* Back / logo */}
          <div className="flex items-center gap-2.5 min-w-0">
            {canGoBack ? (
              <button
                type="button"
                onClick={handleBack}
                className="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-card/60 hover:text-foreground transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
                <span className="text-sm font-bold text-primary-foreground">GQ</span>
              </div>
            )}
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                GrayQuest
              </span>
              <span className="text-sm font-semibold text-foreground truncate">
                Credit Limit
              </span>
            </div>
          </div>

          {/* Step counter and Theme */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tabular-nums text-muted-foreground bg-card/50 px-2 py-1 rounded-md border border-border/50">
              <span className="text-foreground">{currentStep}</span>
              <span className="opacity-60"> / {TOTAL_STEPS}</span>
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-lg px-5 pb-3">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-border/60">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/70"
              initial={false}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 overflow-x-hidden">
        <div className="mx-auto max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentStep === 1 && <StepWelcome onNext={handleNext} />}
              {currentStep === 2 && <StepOne onNext={handleNext} />}
              {currentStep === 3 && <StepTwo onNext={handleNext} onBack={handleBack} />}
              {currentStep === 4 && <StepThree onComplete={handleNext} />}
              {currentStep === 5 && <StepFour />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-4">
        <p className="mx-auto max-w-lg text-center text-[11px] text-muted-foreground/70">
          Secured by 256-bit encryption · RBI regulated partner
        </p>
      </footer>
    </div>
  )
}
