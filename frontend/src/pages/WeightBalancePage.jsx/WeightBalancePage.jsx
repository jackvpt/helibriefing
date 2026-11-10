// Styles
import "./WeightBalancePage.scss"

// React
import { useSelector } from "react-redux"

// Hooks
import { useGetConfigurationsByAircraftType } from "../../hooks/useConfigurations"


import AircraftConfiguration from "../../components/AircraftConfiguration/AircraftConfiguration"

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
    </section>
  )
}

export default WeightBalancePage
