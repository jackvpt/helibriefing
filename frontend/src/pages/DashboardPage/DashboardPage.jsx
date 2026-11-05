// 🎨 Styles
import "./DashboardPage.scss"

// Hooks
import { useGetAllAircraftTypes } from "../../hooks/useAircraftTypes"

// Components
import EnvelopeViewer from "../../components/Balance/EnvelopeViewer/EnvelopeViewer"

const Dashboard = () => {
  const {
    data: aircraftTypes,
    isLoading: isLoadingAircraftTypes,
    error: aircraftTypesError,
  } = useGetAllAircraftTypes({ enabled: true })


  if (isLoadingAircraftTypes) return <p>Chargement des données...</p>
  if (aircraftTypesError)
    return <p>Erreur aircraftTypes : {aircraftTypesError.message}</p>

  return (
    <section className="container__dashboard">

      {aircraftTypes.map((aircraftType) => (
        <EnvelopeViewer key={aircraftType.id} aircraftType={aircraftType} />
      ))}
    </section>
  )
}

export default Dashboard
