// Styles
import "./WeightsReportRow.scss"

const WeightsReportRow = ({ label, value }) => {
  return (
    <div className="container__weightsReportRow">
      <div className="container__weightsReportRow--label">{label}</div>
      <div className="container__weightsReportRow--value">{value}</div>
    </div>
  )
}

export default WeightsReportRow
