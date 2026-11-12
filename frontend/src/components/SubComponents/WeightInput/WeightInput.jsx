// Styles
import "./WeightInput.scss"

// React
import { useRef } from "react"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const WeightInput = ({ value, onChange, step = 5, min = 0 }) => {
  const justFocused = useRef(false)

  const adjust = (delta) => {
    const next = Math.max(min, Math.round(((value ?? 0) + delta) * 1000) / 1000)
    onChange(next)
  }

  return (
    <div className="container__weightInput">
      <button
        type="button"
        className="container__weightInput-buttonAdjust"
        aria-label="Diminuer"
        tabIndex={-1}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => adjust(-step)}
      >
        −
      </button>

      <input
        className="container__weightInput-input"
        type="number"
        min={min}
        step="any"
        inputMode="decimal"
        value={value && value >0 ? value : ""}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
        }
        onFocus={(e) => {
          justFocused.current = true
          e.target.select()
        }}
        onMouseUp={(e) => {
          if (justFocused.current) {
            e.preventDefault()
            justFocused.current = false
          }
        }}
        onWheel={(e) => e.target.blur()}
      />

      <button
        type="button"
        className="container__weightInput-buttonAdjust"
        aria-label="Augmenter"
        tabIndex={-1}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => adjust(step)}
      >
        +
      </button>

      <FontAwesomeIcon
        className="container__weightInput-buttonTrash"
        icon={faTrashCan}
        onClick={() => onChange(null)}
      />
    </div>
  )
}

export default WeightInput
