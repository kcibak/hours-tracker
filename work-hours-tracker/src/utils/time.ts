// Utilities for converting hour/min + AM/PM to minutes since midnight and computing totals
import type { ClockInput } from '../types'

export function toMinutes12(t: ClockInput | undefined): number | null {
  if (!t) return null
  const { hour, minute, ampm } = t
  if (hour == null || minute == null || ampm == null) return null
  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null
  let h24 = hour % 12
  if (ampm === 'PM') h24 += 12
  return h24 * 60 + minute
}

export function diffMinutes(start?: ClockInput, end?: ClockInput): number | null {
  const s = toMinutes12(start)
  const e = toMinutes12(end)
  if (s == null || e == null) return null
  if (e < s) return null // No overnight support initially
  return e - s
}

export function sumMinutes(values: Array<number | null | undefined>): number {
  return values.reduce<number>((acc, v) => acc + (typeof v === 'number' ? v : 0), 0);
}

export function toDecimalHours2dp(totalMinutes: number): number {
  const hrs = totalMinutes / 60;
  // Round to exactly 2 decimals using banker's rounding avoidance
  return Math.round(hrs * 100) / 100;
}

export function formatDecimalHours(hrs: number): string {
  return hrs.toFixed(2);
}
