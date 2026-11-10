// 🎨 Styles
import "./ConfigurationCard.scss"

// React
import { useDispatch, useSelector } from "react-redux"

// 🛠️ Redux
import { setSelectedAircraftConfiguration } from "../../store/features/settingsSlice"

const ConfigurationCard = ({ configuration }) => {
  const dispatch = useDispatch()

  const selectedConfiguration = useSelector(
    (state) => state.settings.selectedAircraft.configuration,
  )
  const isActive =
    selectedConfiguration && selectedConfiguration === configuration.name
  
    const avatarSrc = configuration.avatarSrc ?? ""

  // Local functions
  const handleClick = () => {
    dispatch(setSelectedAircraftConfiguration(configuration.name))
  }

  return (
    <div
      className={`container__configurationCard ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <h2>{configuration.name}</h2>
      <img
        className="container__configurationCard-avatar"
        src={avatarSrc}
        alt={`Photo de ${configuration.name}`}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/default-avatar.png"
        }}
      />
      <div className="container__configuration-description">
        {configuration.description}
      </div>
    </div>
  )
}

export default ConfigurationCard
