// 🏪 Redux store
import { createSlice } from "@reduxjs/toolkit"

/**
 * Initial state of the settings slice.
 */
const initialState = {
  // Currently selected aircraft
  selectedAircraftRegistration: null,
  selectedAircraftConfiguration: null,
}

/**
 * Redux slice for UI settings.
 */
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    /**
     * Set the selected aircraft.
     * @param {{ registration: string, configuration: string }} action.payload
     */
    setSelectedAircraftRegistration: (state, action) => {
      state.selectedAircraftRegistration = action.payload
    },
  },
})

// Export actions for dispatch
export const { setSelectedAircraftRegistration } = settingsSlice.actions

export default settingsSlice.reducer
