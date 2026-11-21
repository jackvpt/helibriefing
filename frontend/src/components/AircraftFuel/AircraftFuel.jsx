// Styles
import "./AircraftFuel.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// Hooks
import { useGetAllAircraftTypes } from "../../hooks/useAircraftTypes"

// Store
import { updateFuelGroups } from "../../store/features/weightBalanceSlice"

// Components
import WeightInput from "../SubComponents/WeightInput/WeightInput"

const AircraftFuel = ({ aircraftType }) => {
  // Store
  const dispatch = useDispatch()
  const fuel = useSelector((state) => state.weightBalance.fuel)

  const fuelTakeoffGroups = fuel.takeoffGroups
  const fuelLandingGroups = fuel.landingGroups

  // Data from hooks
  const { data: aircraftTypes } = useGetAllAircraftTypes()

  // Local data
  const aircraft = aircraftTypes?.find(
    (aircraft) => aircraft.name === aircraftType,
  )
  const fuelGroups = aircraft?.fuelMoments.groups

  // Local functions
  const handleFuelChange = (phase, group, value) => {
    dispatch(
      updateFuelGroups({
        phase,
        group,
        value,
      }),
    )
  }

  return (
    <div className="container__aircraftFuel">
      {fuelGroups?.length === 1 && (
        <div className="container__aircraftFuel--singleGroup">
          <div className="container__aircraftFuel--singleGroup--row">
            <p>Take-off fuel</p>
            <WeightInput
              value={fuelTakeoffGroups[0]?.value || 0}
              onChange={(value) => handleFuelChange("takeoff", "Main", value)}
              step={50}
            />
          </div>
          <div className="container__aircraftFuel--singleGroup--row">
            <p>Landing fuel</p>
            <WeightInput
              value={fuelLandingGroups[0]?.value || 0}
              onChange={(value) => handleFuelChange("landing", "Main", value)}
              step={50}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AircraftFuel
