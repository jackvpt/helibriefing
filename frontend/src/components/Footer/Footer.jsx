// 🎨 Styles
import "./Footer.scss"

// 🛠️ Redux
import { useSelector } from "react-redux"

const Footer = () => {
  const selectedAircraftRegistration = useSelector(
    (state) => state.settings.selectedAircraftRegistration || null,
  )
  console.log(
    "Footer: selectedAircraftRegistration =",
    selectedAircraftRegistration,
  )
  return (
    <footer>
      {selectedAircraftRegistration &&
        `Selected Aircraft: ${selectedAircraftRegistration}`}
    </footer>
  )
}

export default Footer
