// 🪝 Hooks
import { useGetAllAircraftTypes } from "./useAircraftTypes"
import { useGetAllCompanies } from "./useCompanies"
import { useGetAllAircrafts } from "./useAircrafts"

/**
 * useAppData
 * ------------------------------------------------------------------
 * Centralizes every data fetch AppInitializer depends on.
 * `enabled` should reflect confirmed auth — none of these should
 * fire with an unconfirmed/invalid token.
 */
export const useAppData = ({ enabled = true } = {}) => {
  const companies = useGetAllCompanies({ enabled })
  const aircraftTypes = useGetAllAircraftTypes({ enabled })
  const aircrafts = useGetAllAircrafts({ enabled })

  return { companies, aircraftTypes, aircrafts }
}
