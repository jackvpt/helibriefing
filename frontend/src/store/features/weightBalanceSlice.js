// 🏪 Redux store
import { createSlice } from "@reduxjs/toolkit"

/**
 * Initial state of the weight & balance slice.
 */
const initialState = {
  // Configuration elements
  configurationElements: [],
}

const weightBalanceSlice = createSlice({
  name: "weightBalance",
  initialState,
  reducers: {
    /** Resets the configuration elements to an empty array. */
    resetConfigurationElements: (state) => {
      state.configurationElements = []
    },

    /** @param {boolean} action.payload */
    setConfigurationElements: (state, action) => {
      state.configurationElements = action.payload
    },

    /** @param {{ displayCode: string, weight: number|null }} action.payload */
    updateConfigurationElementWeight: (state, action) => {
      const { displayCode, weight } = action.payload
      const element = state.configurationElements.find(
        (el) => el.displayCode === displayCode,
      )
      if (element) element.weight = weight
    },
  },
})

/** Sum of all the weights in the configuration. */
export const selectTotalWeight = (state) =>
  state.weightBalance.configurationElements.reduce(
    (sum, el) => sum + (Number(el.weight) || 0),
    0,
  )

// Export actions for dispatch
export const {
  resetConfigurationElements,
  setConfigurationElements,
  updateConfigurationElementWeight,
} = weightBalanceSlice.actions

export default weightBalanceSlice.reducer
