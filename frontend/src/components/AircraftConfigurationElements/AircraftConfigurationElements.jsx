// Styles
import "./AircraftConfigurationElements.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// Store
import {
  selectTotalWeight,
  updateConfigurationElementWeight,
} from "../../store/features/weightBalanceSlice"
import WeightInput from "../SubComponents/WeightInput/WeightInput"

const AircraftConfigurationElements = () => {
  // Store
  const dispatch = useDispatch()

  // Data from Redux store
  const configurationElements = useSelector(
    (state) => state.weightBalance.configurationElements,
  )
  const totalWeight = useSelector(selectTotalWeight)

  // Local functions
  const handleWeightChange = (displayCode, weight) => {
    dispatch(
      updateConfigurationElementWeight({
        displayCode,
        weight: Number(weight),
      }),
    )
  }
  return (
    <div className="container__aircraftConfigurationElements">
      {configurationElements.map((element) => (
        <div
          key={element.displayCode}
          className="container__aircraftConfigurationElements-element"
        >
          <div className="container__aircraftConfigurationElements-element-name">
            {element.name}
          </div>

          <div className="container__aircraftConfigurationElements-element-weight">
            <WeightInput value={element.weight} onChange={(weight) => handleWeightChange(element.displayCode, weight)} />
          </div>
        </div>
      ))}
      <div className="container__aircraftConfigurationElements-totalWeight">
        Total weight: {totalWeight} kg
      </div>
    </div>
  )
}

export default AircraftConfigurationElements
