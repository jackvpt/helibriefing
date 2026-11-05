import { useId } from "react"
import { isPointInPolygon } from "../../../models/AircraftTypeModel"

const WIDTH = 640
const HEIGHT = 420
const MARGIN = { top: 20, right: 24, bottom: 56, left: 72 }

const UNIT_LABELS = { millimeters: "mm", centimeters: "cm", meters: "m" }

/** Round tick values (1, 2, 5 x 10^n) between min and max */
const getTicks = (min, max, count = 6) => {
  const raw = (max - min) / count
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const n = raw / magnitude
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * magnitude
  const ticks = []
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) {
    ticks.push(Math.round(v / step) * step)
  }
  return ticks
}

/**
 * Draws one diagram (longitudinal or lateral) of an envelope.
 *
 * @param {Object} props
 * @param {import("../models/AircraftTypeModel").default} props.aircraftType
 * @param {Object} props.envelope - An envelope of the aircraft type (see getEnvelope).
 * @param {"longitudinal"|"lateral"} props.direction
 * @param {{weight:number, arm:number}} [props.cog] - CG to plot, same units as the envelope.
 */
export default function EnvelopeDiagram({
  aircraftType,
  envelope,
  direction = "longitudinal",
  cog,
}) {
  const clipId = useId()
  const diagram = envelope?.[direction]
  if (!diagram) return <p>No {direction} diagram for this envelope.</p>

  const limits = aircraftType.getDiagramLimits(envelope, direction)
  const { xMinimum, xMaximum, yMinimum, yMaximum } = limits

  const plotWidth = WIDTH - MARGIN.left - MARGIN.right
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom

  const x = (arm) =>
    MARGIN.left + ((arm - xMinimum) / (xMaximum - xMinimum)) * plotWidth
  const y = (weight) =>
    MARGIN.top +
    plotHeight -
    ((weight - yMinimum) / (yMaximum - yMinimum)) * plotHeight

  const path =
    diagram.points
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.arm)},${y(p.weight)}`)
      .join(" ") + " Z"

  const inside = cog ? isPointInPolygon(cog, diagram.points) : null
  const cogColor = inside ? "#2e7d32" : "#c62828"

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`${envelope.name} ${direction} envelope`}
      style={{ width: "100%", maxWidth: WIDTH, height: "auto" }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={MARGIN.left} y={MARGIN.top} width={plotWidth} height={plotHeight} />
        </clipPath>
      </defs>

      {/* Grid + ticks */}
      {getTicks(xMinimum, xMaximum).map((v) => (
        <g key={`x${v}`}>
          <line x1={x(v)} x2={x(v)} y1={MARGIN.top} y2={MARGIN.top + plotHeight} stroke="#ddd" />
          <text x={x(v)} y={MARGIN.top + plotHeight + 18} textAnchor="middle" fontSize="11" fill="currentColor">
            {v}
          </text>
        </g>
      ))}
      {getTicks(yMinimum, yMaximum).map((v) => (
        <g key={`y${v}`}>
          <line x1={MARGIN.left} x2={MARGIN.left + plotWidth} y1={y(v)} y2={y(v)} stroke="#ddd" />
          <text x={MARGIN.left - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="currentColor">
            {v}
          </text>
        </g>
      ))}

      {/* Frame */}
      <rect
        x={MARGIN.left}
        y={MARGIN.top}
        width={plotWidth}
        height={plotHeight}
        fill="none"
        stroke="currentColor"
      />

      {/* Envelope + CG */}
      <g clipPath={`url(#${clipId})`}>
        <path d={path} fill="rgba(25, 118, 210, 0.15)" stroke="#1976d2" strokeWidth="2" />
        {cog && (
          <g stroke={cogColor} strokeWidth="2.5">
            <line x1={x(cog.arm) - 6} x2={x(cog.arm) + 6} y1={y(cog.weight) - 6} y2={y(cog.weight) + 6} />
            <line x1={x(cog.arm) - 6} x2={x(cog.arm) + 6} y1={y(cog.weight) + 6} y2={y(cog.weight) - 6} />
          </g>
        )}
      </g>

      {/* Axis labels */}
      <text
        x={MARGIN.left + plotWidth / 2}
        y={HEIGHT - 12}
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
      >
        Arm ({UNIT_LABELS[envelope.distanceUnit]})
      </text>
      <text
        transform={`translate(18 ${MARGIN.top + plotHeight / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize="12"
        fill="currentColor"
      >
        Weight ({aircraftType.weightUnit})
      </text>
    </svg>
  )
}