/**
 * Represents a company with its details.
 */
export default class CompanyModel {
  /**
   * @param {Object} data - The company document returned by the API.
   * @param {string} [data._id] - The company id (undefined for a new one).
   * @param {string} data.name - The company name.
   * @param {string} data.ownedAircraft - The company owned aircrafts.
   */
  constructor(data = {}) {
    /** @type {string | undefined} */
    this.id = data._id

    /** @type {string} */
    this.name = data.name

    /** @type {{id: string | undefined, registration: string, type: string}[]} */
    this.ownedAircraft = (data.ownedAircraft ?? []).map(
      ({ _id, registration, type }) => ({ id: _id, registration, type }),
    )
  }
}
