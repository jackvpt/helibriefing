// 🎨 Styles
import "./AircraftCard.scss"

// Hooks
import { useGetAllAircraftTypes } from "../../hooks/useAircraftTypes"

// 🛠️ Store
import { useDispatch, useSelector } from "react-redux"
import {
  setSelectedAircraftRegistration,
  setSelectedAircraftType,
} from "../../store/features/settingsSlice"
import { setAircraft } from "../../store/features/weightBalanceSlice"
import { setFuelGroups } from "../../store/features/weightBalanceSlice"

const AircraftCard = ({ aircraft }) => {
  // Data from hooks
  const { data: aircraftTypes } = useGetAllAircraftTypes()

  // Local data
  const aircraftType = aircraftTypes?.find(
    (aircraftType) => aircraftType.name === aircraft.aircraftType,
  )

  // Store
  const dispatch = useDispatch()

  const selectedAircraft = useSelector(
    (state) => state.settings.selectedAircraft,
  )
  const isActive =
    selectedAircraft && selectedAircraft.registration === aircraft.registration
  const avatarSrc = aircraft.avatarSrc ?? ""

  // Local functions
  const handleClick = () => {
    dispatch(setSelectedAircraftType(aircraft.aircraftType))
    dispatch(setSelectedAircraftRegistration(aircraft.registration))
    dispatch(setAircraft(aircraft.toWeightBalance()))
    dispatch(setFuelGroups(aircraftType.fuelMoments.groups))
  }

  return (
    <div
      className={`container__aircraftCard ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <h2>{aircraft.registration}</h2>
      <img
        className="container__aircraftCard-avatar"
        src={avatarSrc}
        alt={`Photo de ${aircraft.registration}`}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/default-avatar.png"
        }}
      />
      <div className="container__aircraftCard-type">
        {aircraft.aircraftType}
      </div>
    </div>
  )
}

export default AircraftCard
