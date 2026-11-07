// 🎨 Styles
import "./AircraftCard.scss"

// 🛠️ Redux
import { useDispatch, useSelector } from "react-redux"
import { setSelectedAircraftRegistration } from "../../store/features/settingsSlice"

const AircraftCard = ({ aircraft }) => {
  const selectedAircraftRegistration = useSelector(
    (state) => state.settings.selectedAircraftRegistration || null,
  )
  const isActive = selectedAircraftRegistration === aircraft.registration
  const avatarSrc = aircraft.avatarSrc ?? ""
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setSelectedAircraftRegistration(aircraft.registration))
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
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/default-avatar.png"
        }}
      />
      <div className="container__aircraft-details">
        <p>{aircraft.aircraftType}</p>
      </div>
    </div>
  )
}

export default AircraftCard
