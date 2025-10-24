import { useMemo, useState } from 'react'
import './App.css'
import TimeRangeRow from './components/TimeRangeRow'
import type { TimeRange } from './types'
import { diffMinutes, formatDecimalHours, sumMinutes, toDecimalHours2dp } from './utils/time'

let idCounter = 0
function newId() {
  idCounter += 1
  return String(idCounter)
}

export default function App() {
  const [ranges, setRanges] = useState<TimeRange[]>([{
    id: newId(),
    start: { ampm: 'AM' },
    end: { ampm: 'AM' },
  }])

  const totalMinutes = useMemo(() => {
    return sumMinutes(
      ranges.map((r) => diffMinutes(r.start, r.end))
    )
  }, [ranges])

  const decimalHours = useMemo(() => toDecimalHours2dp(totalMinutes), [totalMinutes])

  function updateRange(id: string, update: Partial<TimeRange>) {
    setRanges((prev) => prev.map((r) => {
      if (r.id !== id) return r
      return {
        ...r,
        start: update.start ? { ...r.start, ...update.start } : r.start,
        end: update.end ? { ...r.end, ...update.end } : r.end,
      }
    }))
  }

  function addRange() {
    setRanges((prev) => [...prev, { id: newId(), start: { ampm: 'AM' }, end: { ampm: 'AM' } }])
  }

  function removeRange(id: string) {
    setRanges((prev) => prev.filter((r) => r.id !== id))
  }

  function clearAll() {
    setRanges([{ id: newId(), start: { ampm: 'AM' }, end: { ampm: 'AM' } }])
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Work Hours Tracker</h1>
        <p className="sub">Add time ranges; totals update automatically. Rounds to 2 decimals.</p>
      </header>

      <section className="card">
        <div className="rows">
          {ranges.map((r) => (
            <TimeRangeRow key={r.id} range={r} onChange={updateRange} onRemove={removeRange} />
          ))}
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={addRange}>+ Add range</button>
          <button className="btn btn-outline" onClick={clearAll}>Clear</button>
        </div>

        <div className="total">
          <div className="total-label">Total hours</div>
          <div className="total-value">{formatDecimalHours(decimalHours)}</div>
        </div>
      </section>

      <footer className="footer">No overnight ranges yet. End must be after start.</footer>
    </div>
  )
}
