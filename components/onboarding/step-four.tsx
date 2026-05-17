"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react"
import confetti from "canvas-confetti"

const LIMIT = 150000
const MIN_EMI = 5000
const MAX_EMI = 25000

function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export function StepFour() {
  const [emi, setEmi] = useState(12500)
  const tenure = Math.ceil(LIMIT / emi)

  const fireConfetti = useCallback(() => {
    // Short, snappy burst — total ~800ms
    const colors = ["#a78bfa", "#c4b5fd", "#818cf8", "#f0abfc", "#ffffff"]
    const defaults = {
      spread: 70,
      ticks: 60,
      gravity: 1.1,
      decay: 0.92,
      startVelocity: 35,
      colors,
      zIndex: 100,
    }

    confetti({
      ...defaults,
      particleCount: 60,
      origin: { x: 0.5, y: 0.35 },
      scalar: 0.9,
    })
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 30,
        angle: 60,
        origin: { x: 0.1, y: 0.5 },
      })
      confetti({
        ...defaults,
        particleCount: 30,
        angle: 120,
        origin: { x: 0.9, y: 0.5 },
      })
    }, 200)
  }, [])

  useEffect(() => {
    const t = setTimeout(fireConfetti, 250)
    return () => clearTimeout(t)
  }, [fireConfetti])

  return (
    <div className="flex flex-col gap-6 py-2">
      {/* Success indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-success/30 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success">
            <CheckCircle2 className="h-9 w-9 text-success-foreground" strokeWidth={2.2} />
          </div>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-success">
          Approved
        </p>
      </motion.div>

      {/* Limit headline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="text-center space-y-1.5"
      >
        <p className="text-sm text-muted-foreground">Provisional Limit of</p>
        <h1 className="text-[44px] leading-none font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          ₹1,50,000
        </h1>
      </motion.div>

      {/* Limit card */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="metallic-card rounded-2xl border border-primary/20 p-5 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
      >
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-fuchsia-400/15 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-wider text-white/70">
              GrayQuest
            </span>
            <span className="text-sm font-semibold text-white">Student Credit Line</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur ring-1 ring-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="relative mt-5 flex items-baseline justify-between">
          <span className="font-mono text-sm tracking-[0.3em] text-white/80">
            •••• 4242
          </span>
          <span className="text-xs text-white/70">Active</span>
        </div>
      </motion.div>

      {/* EMI slider card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="glass rounded-2xl p-5 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Monthly EMI
            </span>
            <span className="text-[11px] text-muted-foreground/70">{tenure} month tenure</span>
          </div>
          <motion.span
            key={emi}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="text-2xl font-bold text-foreground tabular-nums"
          >
            {formatINR(emi)}
          </motion.span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Slider
            value={[emi]}
            onValueChange={(v) => setEmi(v[0])}
            min={MIN_EMI}
            max={MAX_EMI}
            step={500}
            className="w-full"
            aria-label="Select monthly EMI"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground/80">
            <span>{formatINR(MIN_EMI)}</span>
            <span>{formatINR(MAX_EMI)}</span>
          </div>
        </div>
      </motion.div>

      {/* Boost CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <Button
          variant="ghost"
          size="lg"
          className="group h-14 w-full text-[15px] font-semibold rounded-[var(--radius)] border border-primary/30 bg-primary/5 text-primary hover:text-primary hover:bg-primary/10 hover:border-primary/50 dark:hover:bg-primary/10"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Boost limit via Account Aggregator
          <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="text-center text-[11px] text-muted-foreground/70 leading-relaxed max-w-xs mx-auto"
      >
        Final limit subject to documentation. 0% EMI options available on select partners.
      </motion.p>
    </div>
  )
}
