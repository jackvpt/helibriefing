// 🎨 Styles
import "./Footer.scss"

// 🛠️ Redux
import { useSelector } from "react-redux"

const Footer = () => {
  const selectedAircraft = useSelector(
    (state) => state.settings.selectedAircraft ,
  )

  return (
    <footer>
      {selectedAircraft.registration &&
        `Selected Aircraft: ${selectedAircraft.registration} | ${selectedAircraft.type}`}
    </footer>
  )
}

export default Footer
