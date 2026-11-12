// Styles
import "./AircraftConfiguration.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// Store
import { updateConfigurationElementWeight } from "../../store/features/weightBalanceSlice"

// Images
import SeatPax from "../../assets/images/seat_pax.svg?react"
import SeatPilot from "../../assets/images/seat_pilot.svg?react"

// Constants
const SEAT_COMPONENTS = {
  seat_pilot: SeatPilot,
  seat_pax: SeatPax,
}

const AircraftConfiguration = ({ configuration }) => {
  // Redux store
  const dispatch = useDispatch()
  const storeElements = useSelector(
    (state) => state.weightBalance.configurationElements,
  )

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

  // Local functions
  const weightByCode = Object.fromEntries(
    storeElements.map((e) => [e.displayCode, e.weight]),
  )

  const handleSeatClick = (element) => () => {
    const currentWeight = weightByCode[element.displayCode] ?? 0
    dispatch(
      updateConfigurationElementWeight({
        displayCode: element.displayCode,
        weight: currentWeight > 0 ? 0 : 80,
      }),
    )
  }

  return (
    <>
      <div className="container__aircraftConfiguration">
        <img
          className="container__aircraftConfiguration-aircraft"
          src={noSeatImage}
          alt={`Picture of ${configuration.name}`}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = "/default-avatar.png"
          }}
        />

        {/** Seats */}
        {configuration.elements.map((element) => {
          const { left, top } = toPercent(element.arm)
          const Seat = SEAT_COMPONENTS[element.elementType] ?? SeatPax
          const isOccupied = (weightByCode[element.displayCode] ?? 0) > 0

          return (
            <div
              className="container__aircraftConfiguration-element"
              key={element.id}
            >
              <div
                className="container__aircraftConfiguration-element-text"
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={handleSeatClick(element)}
              >
                {element.displayCode}
              </div>

              <Seat
                className={`container__aircraftConfiguration-element-seat ${isOccupied ? "seat--occupied" : ""}`}
                role="img"
                aria-label={`Siège ${element.displayCode}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${SEAT_SCALE_X * 100}%`,
                  height: `${SEAT_SCALE_Y * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${element.orientation ?? 0}deg)`,
                }}
                onClick={handleSeatClick(element)}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AircraftConfiguration
