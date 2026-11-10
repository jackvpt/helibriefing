// 🎨 Styles
import "./Footer.scss"

// 🛠️ Redux
import { useSelector } from "react-redux"

// 🌐 Language support
import { useTranslation } from "react-i18next"

const Footer = () => {
  // 🌐 Language support
  const { t } = useTranslation()

  const selectedAircraft = useSelector(
    (state) => state.settings.selectedAircraft,
  )

  return (
    <footer>
      <div>
        {selectedAircraft?.registration
          ? `${t("aircraft.selectedAircraft")} : ${selectedAircraft.aircraftType} | ${selectedAircraft.registration}`
          : t("aircraft.noAircraftSelected")}
      </div>
      <div>
        {selectedAircraft?.configuration
          ? `${t("aircraft.selectedConfiguration")} : ${selectedAircraft.configuration}`
          : t("aircraft.noConfigurationSelected")}
      </div>
    </footer>
  )
}

export default Footer
