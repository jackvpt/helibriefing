/**
 * Represents a configuration element with its details.
 */
export default class ConfigurationElementModel {
  /**
   * @param {Object} [data] - The configuration element document returned by the API.
   * @param {string} [data._id] - The configuration element id (undefined for a new one).
   * @param {string} [data.name] - The element name.
   * @param {string} [data.displayCode] - The code displayed for the element.
   * @param {string} [data.elementType] - The element type.
   * @param {string} [data.function] - The element function.
   * @param {number} [data.orientation] - The element orientation.
   * @param {Arm} [data.arm] - The element arms.
   * @param {number} [data.weight] - The element weight (defaults to 0).
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

    /** @type {{x: number, y: number}} */
    this.arm = data.arm

    /** @type {number} */
    this.weight = data.weight || 0
  }

  /**
   * Moment computed from the arms and the weight.
   * Recalculated on every access, so it always matches the current values.
   * @returns {Moment}
   */ get moment() {
    return {
      longitudinal: (this.arm?.x || 0) * this.weight,
      lateral: (this.arm?.y || 0) * this.weight,
    }
  }

  /**
   * Builds the plain object sent to the API (the getter is not serialized automatically).
   * @returns {{
   *   name: string | undefined,
   *   displayCode: string | undefined,
   *   elementType: string | undefined,
   *   function: string | undefined,
   *   orientation: number | undefined,
   *   arm: Arm | undefined,
   *   weight: number,
   *   moment: Moment
   * }}
   */
  toPayload() {
    return {
      name: this.name,
      displayCode: this.displayCode,
      elementType: this.elementType,
      function: this.function,
      orientation: this.orientation,
      arm: this.arm,
      weight: this.weight,
      moment: this.moment,
    }
  }
}
