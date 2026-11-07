// 🏪 Redux store
import { createSlice } from "@reduxjs/toolkit"

/**
 * Initial state of the settings slice.
 */
const initialState = {
  // Currently selected aircraft
  selectedAircraft: { type: null, registration: null, configuration: null },
}

/**
 * Redux slice for UI settings.
 */
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    /**
     * Set the selected aircraft type.
     * @param {import("@reduxjs/toolkit").PayloadAction<string|null>} action
     */
    setSelectedAircraftType: (state, action) => {
      state.selectedAircraft.type = action.payload
      state.selectedAircraft.registration = null
      state.selectedAircraft.configuration = null
    },

    /**
     * Set the selected aircraft registration.
     * @param {import("@reduxjs/toolkit").PayloadAction<string|null>} action
     */
    setSelectedAircraftRegistration: (state, action) => {
      state.selectedAircraft.registration = action.payload
      state.selectedAircraft.configuration = null
    },

    /**
     * Set the selected aircraft configuration.
     * @param {import("@reduxjs/toolkit").PayloadAction<string|null>} action
     */
    setSelectedAircraftConfiguration: (state, action) => {
      state.selectedAircraft.configuration = action.payload
    },
  },
})

// Export actions for dispatch
export const {
  setSelectedAircraftType,
  setSelectedAircraftRegistration,
  setSelectedAircraftConfiguration,
} = settingsSlice.actions

export default settingsSlice.reducer
