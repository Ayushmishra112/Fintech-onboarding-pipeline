"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const SCHOOLS = [
  "Delhi Public School, R.K. Puram",
  "Delhi Public School, Vasant Kunj",
  "Kendriya Vidyalaya, Dwarka",
  "Kendriya Vidyalaya, Lodhi Road",
  "Ryan International School, Noida",
  "Ryan International School, Gurgaon",
  "DAV Public School, Pushpanjali",
  "St. Xavier's School, Delhi",
  "Modern School, Barakhamba",
  "Amity International School, Noida",
  "Sanskriti School, Chanakyapuri",
  "The Shri Ram School, Aravali",
  "Vasant Valley School",
  "Pathways World School",
  "Step By Step School, Noida",
]

interface StepOneProps {
  onNext: () => void
}

export function StepOne({ onNext }: StepOneProps) {
  const [pan, setPan] = useState("")
  const [school, setSchool] = useState("")
  const [ckyc, setCkyc] = useState(false)
  const [cibil, setCibil] = useState(false)
  const [schoolOpen, setSchoolOpen] = useState(false)
  const [touchedPan, setTouchedPan] = useState(false)

  const isPanValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)
  const showPanError = touchedPan && pan.length === 10 && !isPanValid
  const isFormValid = isPanValid && !!school && ckyc && cibil

  const handlePanChange = (value: string) => {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10)
    setPan(cleaned)
  }

  return (
    <div className="flex flex-col gap-7">
      {/* Hero header with badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/20">
          <Sparkles className="h-3 w-3" />
          Instant approval
        </div>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-foreground text-balance">
          Let&apos;s unlock your{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            credit limit
          </span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
          Share a few details to check your eligibility. Takes under a minute.
        </p>
      </motion.div>

      {/* Form fields */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-5"
      >
        {/* PAN field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="pan" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            PAN Number
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
            </div>
            <Input
              id="pan"
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => handlePanChange(e.target.value)}
              onBlur={() => setTouchedPan(true)}
              className={cn(
                "h-14 pl-11 pr-11 text-base font-mono tracking-[0.2em] uppercase",
                "bg-input/80 border-border/80",
                "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50",
                showPanError && "border-destructive/70 focus-visible:ring-destructive/30",
                isPanValid && "border-success/50",
              )}
              autoComplete="off"
              autoCapitalize="characters"
            />
            {isPanValid && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success">
                  <Check className="h-3 w-3 text-success-foreground" strokeWidth={3} />
                </div>
              </motion.div>
            )}
          </div>
          {showPanError ? (
            <p className="text-xs text-destructive">Enter a valid PAN (e.g. ABCDE1234F)</p>
          ) : (
            <p className="text-xs text-muted-foreground/80">10 characters · format ABCDE1234F</p>
          )}
        </div>

        {/* School field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            School
          </label>
          <Popover open={schoolOpen} onOpenChange={setSchoolOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                role="combobox"
                aria-expanded={schoolOpen}
                className={cn(
                  "group flex h-14 w-full items-center gap-3 rounded-[var(--radius)] border bg-input/80 px-4 text-left transition",
                  "border-border/80 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50",
                  schoolOpen && "ring-2 ring-primary/40 border-primary/50",
                )}
              >
                <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span
                  className={cn(
                    "flex-1 truncate text-base",
                    school ? "text-foreground" : "text-muted-foreground/80",
                  )}
                >
                  {school || "Select your child's school"}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    schoolOpen && "rotate-180",
                  )}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
              sideOffset={6}
            >
              <Command>
                <CommandInput placeholder="Search schools..." />
                <CommandList>
                  <CommandEmpty>No school found.</CommandEmpty>
                  <CommandGroup>
                    {SCHOOLS.map((s) => (
                      <CommandItem
                        key={s}
                        value={s}
                        onSelect={() => {
                          setSchool(s)
                          setSchoolOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            school === s ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {s}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Consents */}
        <div className="flex flex-col gap-3 pt-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Consents
          </p>
          <ConsentRow
            label="CKYC consent"
            description="Allow access to your CKYC records for verification"
            checked={ckyc}
            onChange={setCkyc}
          />
          <ConsentRow
            label="CIBIL consent"
            description="Authorize a soft credit bureau check"
            checked={cibil}
            onChange={setCibil}
          />
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pt-2"
      >
        <Button
          size="lg"
          disabled={!isFormValid}
          onClick={onNext}
          className={cn(
            "h-14 w-full text-[15px] font-semibold rounded-[var(--radius)]",
            "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
            "hover:bg-primary/90 transition-all",
            "disabled:opacity-50 disabled:shadow-none",
          )}
        >
          Continue
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
        <div className="mt-3 min-h-[20px] text-center">
          {!isFormValid ? (
            <p className="text-[11px] text-destructive/80 font-medium">
              {!isPanValid && "Please enter a valid PAN."}{" "}
              {isPanValid && !school && "Please select a school."}{" "}
              {isPanValid && school && (!ckyc || !cibil) && "Please accept all consents to proceed."}
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function ConsentRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "group flex items-start gap-3 rounded-[var(--radius)] border p-4 text-left transition-all",
        checked
          ? "border-primary/40 bg-primary/[0.06]"
          : "border-border/70 bg-card/40 hover:border-border hover:bg-card/70",
      )}
      aria-pressed={checked}
    >
      {/* Custom checkbox */}
      <div
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all",
          checked
            ? "border-primary bg-primary"
            : "border-border bg-transparent group-hover:border-muted-foreground/60",
        )}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3.5} />
          </motion.div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <ShieldCheck
            className={cn(
              "h-3.5 w-3.5 transition-colors",
              checked ? "text-primary" : "text-muted-foreground",
            )}
          />
          {label}
        </span>
        <span className="text-xs text-muted-foreground leading-relaxed">{description}</span>
      </div>
    </button>
  )
}
