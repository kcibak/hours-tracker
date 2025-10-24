export type Meridiem = 'AM' | 'PM'

export type ClockInput = {
  hour?: number // 1-12
  minute?: number // 0-59
  ampm?: Meridiem
}

export type TimeRange = {
  id: string
  start: ClockInput
  end: ClockInput
}

export type RangeValidation = {
  isComplete: boolean // start and end have hour, minute, and ampm
  isValid: boolean // end >= start within same day (no overnight)
  minutes: number | null
  error?: string
}
