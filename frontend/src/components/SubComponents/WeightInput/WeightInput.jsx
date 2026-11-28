// Styles
import "./WeightInput.scss"

// React
import { useRef } from "react"

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons"

const WeightInput = ({ value, onChange, step = 5, min = 0, trash = true }) => {
  const justFocused = useRef(false)

  const adjust = (delta) => {
    const next = Math.max(min, Math.round(((value ?? 0) + delta) * 1000) / 1000)
    onChange(next)
  }

  return (
    <div className="container__weightInput">
      <div className="container__weightInput--inputBlock">
        <input
          className="container__weightInput--inputBlock--input"
          type="number"
          min={min}
          step="any"
          inputMode="decimal"
          value={value && value > 0 ? value : ""}
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
        <div className="container__weightInput--inputBlock--buttons">
          <button
            type="button"
            className="container__weightInput--inputBlock--buttons--buttonAdjust"
            aria-label={`Increase of ${step}`}
            aria-controls={"Increase"}
            onMouseDown={(e) => e.preventDefault()} // garde le focus dans l'input à la souris
            onClick={() => adjust(step)}
          >
            <FontAwesomeIcon icon={faCaretUp} size="sm" />
          </button>

          <button
            type="button"
            className="container__weightInput--inputBlock--buttons--buttonAdjust"
            aria-label="Decrease"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => adjust(-step)}
          >
            <FontAwesomeIcon icon={faCaretDown} size="sm" />
          </button>
        </div>
      </div>

      {trash && (
        <FontAwesomeIcon
          className="container__weightInput--buttonTrash"
          icon={faTrashCan}
          onClick={() => onChange(null)}
        />
      )}
    </div>
  )
}

export default WeightInput
