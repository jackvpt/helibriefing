// 🎨 Styles
import "./AircraftPage.scss"

import { useGetAllCompanies } from "../../hooks/useCompanies"

const AircraftPage = () => {
  const { data: companies } = useGetAllCompanies()

  return (
    <section className="container__aircraftPage">
      {companies.map((company) => (
        <div key={company.id} className="company">
          <h2>{company.name}</h2>
        </div>
      ))}
    </section>
  )
}

export default AircraftPage
