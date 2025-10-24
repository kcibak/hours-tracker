import { diffMinutes } from '../utils/time'
import type { TimeRange, Meridiem } from '../types'

export type TimeRangeRowProps = {
  range: TimeRange
  onChange: (id: string, update: Partial<TimeRange>) => void
  onRemove: (id: string) => void
}

export default function TimeRangeRow({ range, onChange, onRemove }: TimeRangeRowProps) {
  const { id, start, end } = range

  const minutes = diffMinutes(start, end)
  const invalid = (start.hour != null && start.minute != null && start.ampm != null && end.hour != null && end.minute != null && end.ampm != null) ? minutes == null : false

  function setStart(upd: Partial<typeof start>) {
    onChange(id, { start: { ...start, ...upd } })
  }
  function setEnd(upd: Partial<typeof end>) {
    onChange(id, { end: { ...end, ...upd } })
  }

  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(max, val))
  }

  const toggle = (v: Meridiem | undefined): Meridiem => (v === 'AM' ? 'PM' : 'AM')

  return (
    <div className={`row ${invalid ? 'row-invalid' : ''}`}>
      <div className="time-group">
        <input
          className="time-input hour"
          type="number"
          inputMode="numeric"
          min={1}
          max={12}
          value={start.hour ?? ''}
          onChange={(e) => {
            const n = Number(e.target.value)
            setStart({ hour: Number.isFinite(n) ? clamp(n, 1, 12) : undefined })
          }}
          placeholder="hh"
          aria-label="Start hour"
        />
        <span>:</span>
        <input
          className="time-input minute"
          type="number"
          inputMode="numeric"
          min={0}
          max={59}
          value={start.minute ?? ''}
          onChange={(e) => {
            const n = Number(e.target.value)
            setStart({ minute: Number.isFinite(n) ? clamp(n, 0, 59) : undefined })
          }}
          placeholder="mm"
          aria-label="Start minute"
        />
        <button
          className="btn ampm"
          onClick={() => setStart({ ampm: toggle(start.ampm) })}
          aria-label="Toggle start AM/PM"
          type="button"
        >
          {start.ampm ?? 'AM'}
        </button>
      </div>

      <span className="dash">—</span>

      <div className="time-group">
        <input
          className="time-input hour"
          type="number"
          inputMode="numeric"
          min={1}
          max={12}
          value={end.hour ?? ''}
          onChange={(e) => {
            const n = Number(e.target.value)
            setEnd({ hour: Number.isFinite(n) ? clamp(n, 1, 12) : undefined })
          }}
          placeholder="hh"
          aria-label="End hour"
        />
        <span>:</span>
        <input
          className="time-input minute"
          type="number"
          inputMode="numeric"
          min={0}
          max={59}
          value={end.minute ?? ''}
          onChange={(e) => {
            const n = Number(e.target.value)
            setEnd({ minute: Number.isFinite(n) ? clamp(n, 0, 59) : undefined })
          }}
          placeholder="mm"
          aria-label="End minute"
        />
        <button
          className="btn ampm"
          onClick={() => setEnd({ ampm: toggle(end.ampm) })}
          aria-label="Toggle end AM/PM"
          type="button"
        >
          {end.ampm ?? 'AM'}
        </button>
      </div>

      <button
        className="btn btn-ghost"
        onClick={() => onRemove(id)}
        aria-label="Remove row"
        title="Remove row"
        type="button"
      >
        ✕
      </button>

      {invalid && (
        <div className="error">End must be after start</div>
      )}
    </div>
  )
}
