// Styles
import "./WeightsReport.scss"

// React
import { useSelector } from "react-redux"

// Components
import WeightsReportRow from "../SubComponents/WeightsReportRow/WeightsReportRow"

const WeightsReport = () => {
  // Store
  const aircraftEmptyWeight = useSelector(
    (state) => state.weightBalance.aircraft.weight,
  )
  const configurationWeight = useSelector(
    (state) => state.weightBalance.configurationWeight,
  )
  const emptyEquippedWeight = useSelector(
    (state) => state.weightBalance.emptyEquippedWeight,
  )
  const configurationElementsWeight = useSelector(
    (state) => state.weightBalance.configurationElementsWeight,
  )
  const zeroFuelWeight = useSelector(
    (state) => state.weightBalance.zeroFuelWeight,
  )

  const takeoffWeight = useSelector(
    (state) => state.weightBalance.takeoffWeight,
  )
  const landingWeight = useSelector(
    (state) => state.weightBalance.landingWeight,
  )
  return (
    <div className="container__weightsReport">
      {/** Aircraft empty weight */}
      <WeightsReportRow
        label="Empty weight:"
        value={`${aircraftEmptyWeight} kg`}
      />

      {/** Configuration weight */}
      <WeightsReportRow
        label="Configuration weight:"
        value={`${configurationWeight} kg`}
      />

      {/** Empty equipped weight */}
      <WeightsReportRow
        label="Empty equipped weight:"
        value={`${emptyEquippedWeight} kg`}
      />

      {/** Payload */}
      <WeightsReportRow
        label="Payload:"
        value={`${configurationElementsWeight} kg`}
      />

      {/** Zero fuel weight */}
      <WeightsReportRow
        label="Zero fuel weight:"
        value={`${zeroFuelWeight} kg`}
      />

      {/** Takeoff weight */}
      <WeightsReportRow label="Takeoff weight:" value={`${takeoffWeight} kg`} />

      {/** Landing weight */}
      <WeightsReportRow label="Landing weight:" value={`${landingWeight} kg`} />
    </div>
  )
}

export default WeightsReport
