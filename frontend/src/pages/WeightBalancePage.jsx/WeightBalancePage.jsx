// Styles
import "./WeightBalancePage.scss"

// React
import { useSelector } from "react-redux"

// Hooks
import { useGetConfigurationsByAircraftType } from "../../hooks/useConfigurations"

// Components
import AircraftConfiguration from "../../components/AircraftConfiguration/AircraftConfiguration"
import AircraftConfigurationElements from "../../components/AircraftConfigurationElements/AircraftConfigurationElements"

const WeightBalancePage = () => {
  const selectedAircraft = useSelector(
    (state) => state.settings.selectedAircraft,
  )

  const { data: configurationsByType } = useGetConfigurationsByAircraftType(
    selectedAircraft?.aircraftType,
  )

  const selectedConfiguration = configurationsByType?.find(
    (configuration) => configuration.name === selectedAircraft?.configuration,
  )
  if (!selectedConfiguration) {
    return
  }

  return (
    <section className="container__weightBalancePage">
      <AircraftConfiguration configuration={selectedConfiguration} />
      <AircraftConfigurationElements />
    </section>
  )
}

export default WeightBalancePage
