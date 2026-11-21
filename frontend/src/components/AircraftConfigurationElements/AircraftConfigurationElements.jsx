// Styles
import "./AircraftConfigurationElements.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// Store
import {setCustomWeight} from "../../store/features/settingsSlice"
import { updateConfigurationElementWeight } from "../../store/features/weightBalanceSlice"

// Components
import WeightInput from "../SubComponents/WeightInput/WeightInput"

const AircraftConfigurationElements = () => {
  // Store
  const dispatch = useDispatch()

  // Data from Redux store
  const customWeight = useSelector((state) => state.settings.customization.customWeight)
  const configurationElements = useSelector(
    (state) => state.weightBalance.configurationElements,
  )
  const totalWeights = useSelector((state) => state.weightBalance.totalWeights)

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
      <div className="container__aircraftConfigurationElements-element separator">
        <div className="container__aircraftConfigurationElements-element-name">
          Custom weight
        </div>
        <div className="container__aircraftConfigurationElements-element-weight">
          <WeightInput
            value={customWeight}
            onChange={(weight) =>
              dispatch(setCustomWeight(weight === null ? 0 : Number(weight)))
            }
            trash={false}
          />
        </div>
      </div>
      {configurationElements.map((element) => (
        <div
          key={element.displayCode}
          className="container__aircraftConfigurationElements-element"
        >
          <div className="container__aircraftConfigurationElements-element-name">
            {element.name}
          </div>

          <div className="container__aircraftConfigurationElements-element-weight">
            <WeightInput
              value={element.weight}
              onChange={(weight) =>
                handleWeightChange(element.displayCode, weight)
              }
            />
          </div>
        </div>
      ))}

      <div className="container__aircraftConfigurationElements-totalWeight">
        Total weight: {totalWeights} kg
      </div>
    </div>
  )
}

export default AircraftConfigurationElements
