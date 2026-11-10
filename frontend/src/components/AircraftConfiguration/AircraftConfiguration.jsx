// Styles
import "./AircraftConfiguration.scss"

// Images
import SeatPax from "../../assets/images/seat_pax.svg?react"

const AircraftConfiguration = ({ configuration }) => {
  const noSeatImage = configuration.noSeatImageSrc ?? ""

  const MM_NOSE = configuration.noSeatImage?.min_longitudinal ?? 0
  const MM_REAR = configuration.noSeatImage?.max_longitudinal ?? 0
  const MM_LEFT = configuration.noSeatImage?.min_lateral ?? 0
  const MM_RIGHT = configuration.noSeatImage?.max_lateral ?? 0
  const SPAN_LONGITUDINAL = MM_REAR - MM_NOSE
  const SPAN_LATERAL = Math.abs(MM_LEFT - MM_RIGHT)
  const SEAT_WIDTH = 550
  const SEAT_HEIGHT = 700
  const SEAT_SCALE_X = SEAT_WIDTH / SPAN_LONGITUDINAL
  const SEAT_SCALE_Y = SEAT_HEIGHT / SPAN_LATERAL

  const toPercent = ({ longitudinal, lateral }) => ({
    left: ((longitudinal - MM_NOSE) / SPAN_LONGITUDINAL) * 100,
    top: ((MM_RIGHT - lateral) / SPAN_LATERAL) * 100,
  })

  return (
    <div className="container__aircraftConfiguration">
      <img
        className="container__aircraftConfiguration-aircraft"
        src={noSeatImage}
        alt={`Photo de ${configuration.name}`}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/default-avatar.png"
        }}
      />
      {configuration.elements.map((element) => {
        const { left, top } = toPercent(element.arm)
        return (
          <div
            className="container__aircraftConfiguration-element"
            key={element._id}
          >
            <div
              key={element._id}
              className="container__aircraftConfiguration-element-text"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {element.displayCode}
            </div>

            <SeatPax
              className="container__aircraftConfiguration-element-seat"
              role="img"
              aria-label={`Siège ${element.displayCode}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${SEAT_SCALE_X * 100}%`,
                height: `${SEAT_SCALE_Y * 100}%`,
                color: "#00f",
                transform: `translate(-50%, -50%) rotate(${element.rotation ?? 0}deg)`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AircraftConfiguration
