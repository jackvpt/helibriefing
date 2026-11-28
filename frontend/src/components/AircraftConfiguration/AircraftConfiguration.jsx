// Styles
import "./AircraftConfiguration.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// Store
import { setCustomWeight } from "../../store/features/settingsSlice"
import { updateConfigurationElementWeight } from "../../store/features/weightBalanceSlice"

// Images
import SeatPax from "../../assets/images/seat_pax.svg?react"
import SeatPilot from "../../assets/images/seat_pilot.svg?react"
import Cargo from "../../assets/images/cargo.svg?react"
import Skid from "../../assets/images/skid.svg?react"
import Weight from "../../assets/images/weight.svg?react"

// Components
import WeightInput from "../SubComponents/WeightInput/WeightInput"

// Constants
const SEAT_COMPONENTS = {
  seat_pilot: SeatPilot,
  seat_pax: SeatPax,
  cargo: Cargo,
  skid: Skid,
  weight: Weight,
}

const AircraftConfiguration = ({ configuration }) => {
  // Redux store
  const dispatch = useDispatch()

  // Data from Redux store
  const customWeight = useSelector(
    (state) => state.settings.customization.customWeight,
  )

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
  const SEAT_WIDTH = 500    
  const SEAT_HEIGHT = 500
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
    const newWeight = currentWeight === customWeight ? 0 : customWeight

    dispatch(
      updateConfigurationElementWeight({
        displayCode: element.displayCode,
        weight: newWeight,
      }),
    )
  }

  return (
    <>
      <div className="container__aircraftConfiguration">
        <div className="container__aircraftConfiguration--image">
          <img
            className="container__aircraftConfiguration--image--aircraft"
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
                className="container__aircraftConfiguration--image--element"
                key={element.id}
                style={{
                  left: `${left - (SEAT_SCALE_X * 100) / 2}%`,
                  top: `${top - (SEAT_SCALE_Y * 100) / 2}%`,
                  width: `${SEAT_SCALE_X * 100}%`,
                  height: `${SEAT_SCALE_Y * 100}%`,
                }}
              >
                <div
                  className={`container__aircraftConfiguration--image--element--text ${isOccupied ? "text--occupied" : ""}`}
                  onClick={handleSeatClick(element)}
                >
                  {element.displayCode}
                </div>

                <div
                  className="container__aircraftConfiguration--image--element--weight"
                  onClick={handleSeatClick(element)}
                >
                  {weightByCode[element.displayCode] > 0
                    ? weightByCode[element.displayCode]
                    : ""}
                </div>

                <Seat
                  className={`container__aircraftConfiguration--image--element--seat ${isOccupied ? "seat--occupied" : ""}`}
                  role="img"
                  aria-label={`Siège ${element.displayCode}`}
                  onClick={handleSeatClick(element)}
                  style={{
                    transform: `rotate(${element.orientation ?? 0}deg)`,
                    transformOrigin: "center",
                  }}
                />
              </div>
            )
          })}
        </div>
        <div className="container__aircraftConfiguration--image--customWeight">
          <div className="container__aircraftConfiguration--image--customWeight--name">
            Custom weight
          </div>
          <div className="container__aircraftConfiguration--image--customWeight--weight">
            <WeightInput
              value={customWeight}
              onChange={(weight) =>
                dispatch(setCustomWeight(weight === null ? 0 : Number(weight)))
              }
              trash={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AircraftConfiguration
