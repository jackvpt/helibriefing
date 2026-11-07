/**
 * Represents an aircraft with its details.
 */
export default class AircraftModel {
  /**
   * @param {Object} data - The aircraft document returned by the API.
   * @param {string} [data._id] - The aircraft id (undefined for a new one).
   * @param {string} data.registration - The aircraft registration.
   * @param {string} data.aircraftType - The aircraft type.
   * @param {string | null} [data.avatarUrl] - Relative path of the aircraft picture (e.g. /uploads/aircrafts/F-GABC.webp).
   */
  constructor(data = {}) {
    /** @type {string | undefined} */
    this.id = data._id

    /** @type {string} */
    this.registration = data.registration

    /** @type {string} */
    this.aircraftType = data.aircraftType

    /** @type {string | null} */
    this.avatarUrl = data.avatarUrl || null

    /** @type {{unit: "kg" | "lbs", weight: number | null}} */
    this.emptyEquippedWeight = {
      unit: data.emptyEquippedWeight?.unit ?? "kg",
      weight: data.emptyEquippedWeight?.weight ?? null,
    }

    /** @type {{unit: "millimeters" | "centimeters" | "meters", longitudinal: number | null, lateral: number | null}} */
    this.emptyEquippedCog = {
      unit: data.emptyEquippedCog?.unit ?? "meters",
      longitudinal: data.emptyEquippedCog?.longitudinal ?? null,
      lateral: data.emptyEquippedCog?.lateral ?? null,
    }

    /** @type {{id: string | undefined, name: string[]}[]} */
    this.acceptedConfigurations = (data.acceptedConfigurations ?? []).map(
      ({ _id, name }) => ({ id: _id, name: name ?? [] }),
    )
  }

  get avatarSrc() {
    return this.avatarUrl
      ? `${import.meta.env.VITE_API_URL}${this.avatarUrl}`
      : null
  }
}
