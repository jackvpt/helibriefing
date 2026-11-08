/**
 * Represents a configuration with its details.
 */
export default class ConfigurationModel {
  /**
   * @param {Object} data - The configuration document returned by the API.
   * @param {string} [data._id] - The configuration id (undefined for a new one).
   * @param {string} data.name - The configuration name.
   * @param {string} data.ownedAircraft - The configuration owned aircrafts.
   */
  constructor(data = {}) {
    /** @type {string | undefined} */
    this.id = data._id

    /** @type {string} */
    this.aircraftType = data.aircraftType

    /** @type {string} */
    this.name = data.name

    /**  @type {string} */
    this.description = data.description

    /** @type {Array} */
    this.elements = data.elements || []

    /** @type {string | null} */
    this.avatarUrl = data.avatarUrl || null
  }

  get avatarSrc() {
    return this.avatarUrl
      ? `${import.meta.env.VITE_API_URL}${this.avatarUrl}`
      : null
  }
}
