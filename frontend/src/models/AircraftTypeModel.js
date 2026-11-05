/** Allowed unit values (must match the backend enums). */
export const WEIGHT_UNITS = ["kg", "lbs"]
export const DISTANCE_UNITS = ["millimeters", "centimeters", "meters"]

const MIN_POLYGON_POINTS = 3
const LIMIT_KEYS = ["xMinimum", "xMaximum", "yMinimum", "yMaximum"]

/** Ray casting, a point on an edge counts as inside (limits are inclusive). */
export const isPointInPolygon = ({ weight, arm }, points, epsilon = 1e-9) => {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i]
    const b = points[j]

    const cross =
      (arm - a.arm) * (b.weight - a.weight) -
      (weight - a.weight) * (b.arm - a.arm)
    const onSegment =
      Math.abs(cross) <= epsilon &&
      arm >= Math.min(a.arm, b.arm) - epsilon &&
      arm <= Math.max(a.arm, b.arm) + epsilon &&
      weight >= Math.min(a.weight, b.weight) - epsilon &&
      weight <= Math.max(a.weight, b.weight) + epsilon
    if (onSegment) return true

    if (
      a.weight > weight !== b.weight > weight &&
      arm <
        ((b.arm - a.arm) * (weight - a.weight)) / (b.weight - a.weight) + a.arm
    ) {
      inside = !inside
    }
  }
  return inside
}

/** Normalizes one API diagram ({ points, diagramLimits }), null if absent. */
const toDiagram = (diagram) => {
  if (!diagram) return null
  const limits = diagram.diagramLimits
  return {
    points: (diagram.points ?? []).map(({ weight, arm }) => ({
      weight: Number(weight),
      arm: Number(arm),
    })),
    diagramLimits: limits
      ? Object.fromEntries(LIMIT_KEYS.map((key) => [key, Number(limits[key])]))
      : null,
  }
}

/**
 * Represents an aircraft type with its weight & balance envelopes.
 * No unit conversion: weights are in `weightUnit`, arms in each envelope's `distanceUnit`.
 */
export default class AircraftTypeModel {
  /**
   * @param {Object} data - The aircraft type document returned by the API.
   * @param {string} [data._id] - The aircraft type id (undefined for a new one).
   * @param {string} data.type - The type name (e.g. "BK117 C2").
   * @param {"kg"|"lbs"} data.weightUnit - Unit of every weight of this type.
   * @param {number} data.minimumWeight - Minimum weight, in weightUnit.
   * @param {number} data.maximumWeight - Maximum weight, in weightUnit.
   * @param {Object} data.cogLimitations - Standard envelope { unit, longitudinal, lateral? }.
   * @param {Object[]} [data.extendedCogLimitations] - Extended envelopes
   *   [{ _id, name, description, distanceUnit, longitudinal?, lateral? }].
   */
  constructor(data = {}) {
    /** @type {string | undefined} */
    this.id = data._id

    /** @type {string} */
    this.name = data.type

    /** @type {"kg"|"lbs"} */
    this.weightUnit = data.weightUnit

    /** @type {number} */
    this.minimumWeight = Number(data.minimumWeight)

    /** @type {number} */
    this.maximumWeight = Number(data.maximumWeight)

    const standard = data.cogLimitations ?? {}

    /** Standard envelope, same shape as the extended ones. */
    this.standardEnvelope = {
      id: "standard",
      name: "Standard",
      description: "",
      distanceUnit: standard.unit, // backend field is "unit" here
      longitudinal: toDiagram(standard.longitudinal),
      lateral: toDiagram(standard.lateral),
    }

    /** @type {Object[]} */
    this.extendedEnvelopes = (data.extendedCogLimitations ?? []).map((env) => ({
      id: env._id,
      name: env.name,
      description: env.description ?? "",
      distanceUnit: env.distanceUnit,
      longitudinal: toDiagram(env.longitudinal),
      lateral: toDiagram(env.lateral),
    }))
  }

  /** @returns {boolean} True if the type has at least one extended envelope. */
  get hasExtendedEnvelopes() {
    return this.extendedEnvelopes.length > 0
  }

  /**
   * Axis limits to draw a diagram: its own limits, else the standard ones
   * (same unit only), else the bounds of its points.
   *
   * @param {Object} envelope
   * @param {"longitudinal"|"lateral"} direction
   * @returns {{xMinimum:number,xMaximum:number,yMinimum:number,yMaximum:number} | null}
   */
  getDiagramLimits(envelope, direction) {
    const diagram = envelope[direction]
    if (!diagram) return null
    if (diagram.diagramLimits) return diagram.diagramLimits

    const standardDiagram = this.standardEnvelope[direction]
    if (
      standardDiagram?.diagramLimits &&
      envelope.distanceUnit === this.standardEnvelope.distanceUnit
    ) {
      return standardDiagram.diagramLimits
    }

    const arms = diagram.points.map((p) => p.arm)
    const weights = diagram.points.map((p) => p.weight)
    return {
      xMinimum: Math.min(...arms),
      xMaximum: Math.max(...arms),
      yMinimum: Math.min(...weights),
      yMaximum: Math.max(...weights),
    }
  }

  /**
   * Checks a CG against one envelope. Units must already match, otherwise it throws.
   *
   * @param {Object} envelope - An envelope of this type (see getEnvelope).
   * @param {{weight:number, weightUnit:string, longitudinal:number, lateral?:number, distanceUnit:string}} cog
   * @returns {{longitudinal:boolean, lateral:boolean|null, ok:boolean}}
   */
  checkCog(envelope, cog) {
    if (cog.weightUnit !== this.weightUnit) {
      throw new Error(
        `Weight unit mismatch: ${cog.weightUnit} vs ${this.weightUnit}`,
      )
    }
    if (cog.distanceUnit !== envelope.distanceUnit) {
      throw new Error(
        `Distance unit mismatch: ${cog.distanceUnit} vs ${envelope.distanceUnit}`,
      )
    }
    if (envelope.lateral && cog.lateral == null) {
      throw new Error("Lateral CG is required for this envelope")
    }

    const longitudinal = isPointInPolygon(
      { weight: cog.weight, arm: cog.longitudinal },
      envelope.longitudinal.points,
    )
    const lateral = envelope.lateral
      ? isPointInPolygon(
          { weight: cog.weight, arm: cog.lateral },
          envelope.lateral.points,
        )
      : null

    return { longitudinal, lateral, ok: longitudinal && lateral !== false }
  }
}
