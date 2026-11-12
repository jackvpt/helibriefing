/**
 * Represents an configuration element with its details.
 */
export default class ConfigurationElementModel {
  /**
   * @param {Object} data - The configuration element document returned by the API.
   * @param {string} [data._id] - The configuration element id (undefined for a new one).
   */
  constructor(data = {}) {
    /** @type {string | undefined} */
    this.id = data._id

    /** @type {string} */
    this.name = data.name

    /** @type {string} */
    this.displayCode = data.displayCode

    /** @type {string} */
    this.elementType = data.elementType

    /** @type {string} */
    this.function = data.function

    /** @type {Number} */
    this.orientation = data.orientation

    /** @type {Object} */
    this.arm = data.arm

    /** @type {number|null} */
    this.weight = data.weight || 0
  }

  toPayload() {
    return {
      name: this.name,
      displayCode: this.displayCode,
      elementType: this.elementType,
      function: this.function,
      orientation: this.orientation,
      arm: this.arm,
      weight: this.weight
    }
  }
}
