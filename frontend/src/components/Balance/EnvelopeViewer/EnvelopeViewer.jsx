import EnvelopeDiagram from "../EnvelopeDiagram/EnvelopeDiagram"

export default function EnvelopeViewer({ aircraftType, cog }) {
  const envelope = aircraftType.standardEnvelope
  console.log(envelope)
  return (
    <div>


      {envelope.description && <p>{envelope.description}</p>}

      <EnvelopeDiagram
        aircraftType={aircraftType}
        envelope={envelope}
        direction="lateral"
        cog={cog && { weight: cog.weight, arm: cog["lateral"] }}
      />
    </div>
  )
}
