"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepWelcomeProps {
  onNext: () => void
}

export function StepWelcome({ onNext }: StepWelcomeProps) {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Hero Icon / Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 shadow-lg shadow-primary/5"
      >
        <Sparkles className="h-10 w-10 text-primary" />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col items-center text-center gap-3"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-success ring-1 ring-success/20 uppercase">
          Exclusive Invite
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
          Welcome to GrayQuest
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
          Activate your zero-cost student credit limit in less than 2 minutes.
        </p>
      </motion.div>

      {/* Feature list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col gap-4 bg-card/40 border border-border/60 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">100% Digital Process</span>
            <span className="text-xs text-muted-foreground">No physical paperwork required.</span>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/15">
            <Sparkles className="h-3.5 w-3.5 text-success" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Instant Approval</span>
            <span className="text-xs text-muted-foreground">Get your limit provisioned instantly.</span>
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="pt-4"
      >
        <Button
          size="lg"
          onClick={onNext}
          className={cn(
            "h-14 w-full text-[16px] font-semibold rounded-[var(--radius)]",
            "bg-primary text-primary-foreground shadow-xl shadow-primary/20",
            "hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"
          )}
        >
          Activate Limit
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}
