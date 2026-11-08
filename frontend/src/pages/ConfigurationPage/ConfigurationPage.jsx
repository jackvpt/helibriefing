// 🎨 Styles
import "./ConfigurationPage.scss"

// React
import { useSelector } from "react-redux"

// Hooks
import { useGetAllAircrafts } from "../../hooks/useAircrafts"
import { useGetAllConfigurations } from "../../hooks/useConfigurations"

// Components
import ConfigurationCard from "../../components/ConfigurationCard/ConfigurationCard"

const ConfigurationPage = () => {
  // Data
  const { data: aircrafts } = useGetAllAircrafts()
  const { data: configurations } = useGetAllConfigurations()

  const selectedAircraftType = useSelector(
    (state) => state.settings.selectedAircraft.aircraftType,
  )

  const selectedAircraftRegistration = useSelector(
    (state) => state.settings.selectedAircraft.registration,
  )

  const acceptedConfigurationsNames =
    aircrafts
      ?.find(
        (aircraft) => aircraft.registration === selectedAircraftRegistration,
      )
      ?.acceptedConfigurations?.flatMap(
        (configuration) => configuration.name,
      ) ?? []

  const aircraftConfigurationsByType = configurations?.filter(
    (configuration) => configuration.aircraftType === selectedAircraftType,
  )

  const aircraftConfigurations =
    aircraftConfigurationsByType?.filter((configuration) =>
      acceptedConfigurationsNames.includes(configuration.name),
    ) ?? []


  if (!aircraftConfigurations || aircraftConfigurations.length === 0) {
    return <p>No configurations found for the selected aircraft.</p>
  }

  return (
    <section className="container__configurationPage">
      {aircraftConfigurations.map((configuration) => (
        <ConfigurationCard configuration={configuration} />
      ))}
    </section>
  )
}

export default ConfigurationPage
