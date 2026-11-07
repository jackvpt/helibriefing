// 🎨 Styles
import "./AircraftPage.scss"

import { useSelector } from "react-redux"
import { useGetAllCompanies } from "../../hooks/useCompanies"
import AircraftCard from "../../components/AircraftCard/AircraftCard"
import { useGetAllAircrafts } from "../../hooks/useAircrafts"
import { useMemo } from "react"

const AircraftPage = () => {
  const userCompany = useSelector((state) => state.user.company)

  const { data: companies, isLoading: companiesLoading } = useGetAllCompanies()
  const { data: allAircrafts, isLoading: aircraftsLoading } =
    useGetAllAircrafts()

  const companyAircrafts = useMemo(() => {
    const company = companies?.find((c) => c.name === userCompany)
    const registrations = new Set(
      (company?.ownedAircraft ?? [])
        .map((a) => a.registration?.toUpperCase())
        .filter(Boolean),
    )

    return (allAircrafts ?? []).filter((aircraft) =>
      registrations.has(aircraft.registration?.toUpperCase()),
    )
  }, [allAircrafts, companies, userCompany])

  if (companiesLoading || aircraftsLoading) return <p>Loading...</p>

  return (
    <section className="container__aircraftPage">
      {companyAircrafts.length > 0 ? (
        companyAircrafts.map((aircraft) => (
          <AircraftCard key={aircraft.id} aircraft={aircraft} />
        ))
      ) : (
        <p>No aircraft found.</p>
      )}
    </section>
  )
}

export default AircraftPage
