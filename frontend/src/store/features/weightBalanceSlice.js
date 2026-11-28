// 🏪 Redux store
import { createSlice } from "@reduxjs/toolkit"

/**
 * @typedef {Object} Arm
 * @property {number} x - Longitudinal arm.
 * @property {number} y - Lateral arm.
 */

/**
 * @typedef {Object} Moment
 * @property {number} longitudinal - Longitudinal moment (arm.x * weight).
 * @property {number} lateral - Lateral moment (arm.y * weight).
 */

/**
 * @typedef {Object} Aircraft
 * @property {number} weight - Empty weight of the aircraft.
 * @property {Arm} arm - Aircraft arms.
 * @property {Moment} moment - Aircraft moments.
 */

/**
 * Initial state of the weight & balance slice.
 * Totals are not stored: they are derived with selectors.
 */
const initialState = {
  /** @type {Aircraft | null} */
  aircraft: { weight: 0, moments: { longitudinal: 0, lateral: 0 } },

  /** @type {number} */
  configurationWeight: 0,

  /** @type {number} */
  emptyEquippedWeight: 0,

  /** @type {Array<Object>} Plain objects (see ConfigurationElementModel.toPayload). */
  configurationElements: [],

  /** @type {number} */
  configurationElementsWeight: 0,

  /** @type {number} */
  zeroFuelWeight: 0,

  /** @type {Object} Fuel weights for takeoff and landing. */
  fuel: {
    takeoffGroups: [],
    takeoffTotal: 0,
    landingGroups: [],
    landingTotal: 0,
  },

  /** @type {number} */
  takeoffWeight: 0,

  /** @type {number} */
  landingWeight: 0,

  totalWeights: 0,
  totalMoments: {
    longitudinal: 0,
    lateral: 0,
  },
}

/**
 * Computes a moment from an arm and a weight.
 * @param {Arm | undefined} arm
 * @param {number} weight
 * @returns {Moment}
 */
const computeMoment = (arm, weight) => ({
  longitudinal: (arm?.longitudinal || 0) * weight,
  lateral: (arm?.lateral || 0) * weight,
})

const weightBalanceSlice = createSlice({
  name: "weightBalance",
  initialState,
  reducers: {
    /** Resets the aircraft. */
    resetAircraft: (state) => {
      state.aircraft = { weight: 0, moments: { longitudinal: 0, lateral: 0 } }
      recomputeTotals(state)
    },

    /** @param {{ weight: number, arm: Arm }} action.payload */
    setAircraft: (state, action) => {
      const { weight, arm } = action.payload
      state.aircraft.weight = weight
      state.aircraft.moments = computeMoment(arm, weight)
      recomputeTotals(state)
    },

    /** Resets the configuration elements to an empty array. */
    resetConfigurationElements: (state) => {
      state.configurationElements = []
      recomputeTotals(state)
    },

    /** Set the configuration weight. */
    setConfigurationWeight: (state, action) => {
      state.configurationWeight = action.payload
      recomputeTotals(state)
    },

    /** @param {Array<Object>} action.payload - Plain objects, not class instances. */
    setConfigurationElements: (state, action) => {
      state.configurationElements = action.payload
      recomputeTotals(state)
    },

    /** @param {{ displayCode: string, weight: number|null }} action.payload */
    updateConfigurationElementWeight: (state, action) => {
      const { displayCode, weight } = action.payload
      const element = state.configurationElements.find(
        (el) => el.displayCode === displayCode,
      )
      if (element) {
        // Normalize null / invalid values to 0
        const w = Number(weight) || 0
        element.weight = w
        element.moment = computeMoment(element.arm, w)
      }
      recomputeTotals(state)
    },

    /** @param {Array<Object>} action.payload */
    setFuelGroups: (state, action) => {
      const fuelGroups = action.payload

      state.fuel.takeoffGroups = fuelGroups.map((group) => ({
        abbreviatedName: group.abbreviatedName,
        value: 0,
      }))
      state.fuel.landingGroups = fuelGroups.map((group) => ({
        abbreviatedName: group.abbreviatedName,
        value: 0,
      }))
    },

    /** @param {{ phase: string, group: Object, value: number }} action.payload */
    updateFuelGroups: (state, action) => {
      const { phase, group, value } = action.payload

      const groupsKey = phase === "takeoff" ? "takeoffGroups" : "landingGroups"
      const totalKey = phase === "takeoff" ? "takeoffTotal" : "landingTotal"

      const target = state.fuel[groupsKey].find(
        (g) => g.abbreviatedName === group,
      )
      if (!target) return

      target.value = Number(value) || 0

      state.fuel[totalKey] = state.fuel[groupsKey].reduce(
        (sum, g) => sum + (g.value || 0),
        0,
      )

      recomputeTotals(state)
    },
  },
})

/**
 * Recomputes totalWeight and totalMoment from aircraft + elements.
 * Must be called in every reducer that modifies one of them.
 * @param {Object} state - Immer draft of the slice.
 */
const recomputeTotals = (state) => {
  const { aircraft, configurationWeight, configurationElements } = state

  state.emptyEquippedWeight = aircraft?.weight + configurationWeight

  state.configurationElementsWeight = configurationElements.reduce(
    (sum, element) => sum + (Number(element.weight) || 0),
    0,
  )

  state.zeroFuelWeight =
    state.emptyEquippedWeight + state.configurationElementsWeight

  state.takeoffWeight = state.zeroFuelWeight + state.fuel.takeoffTotal
  
  state.landingWeight = state.zeroFuelWeight + state.fuel.landingTotal

  state.totalMoments = configurationElements.reduce(
    (sum, element) => ({
      longitudinal: sum.longitudinal + (element.moment?.longitudinal || 0),
      lateral: sum.lateral + (element.moment?.lateral || 0),
    }),
    {
      // Start from the aircraft moment so it is counted only once
      longitudinal: aircraft?.moment?.longitudinal || 0,
      lateral: aircraft?.moment?.lateral || 0,
    },
  )
}

// Export actions for dispatch
export const {
  resetAircraft,
  setAircraft,
  resetConfigurationElements,
  setConfigurationWeight,
  setConfigurationElements,
  updateConfigurationElementWeight,
  setFuelGroups,
  updateFuelGroups,
} = weightBalanceSlice.actions

export default weightBalanceSlice.reducer
