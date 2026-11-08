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
      {selectedAircraft?.registration
        ? `${t("aircraft.selectedAircraft")} : ${selectedAircraft.registration} | ${selectedAircraft.aircraftType}`
        : t("aircraft.noAircraftSelected")}
    </footer>
  )
}

export default Footer
