// 🪝 Hooks
import { useGetAllAircraftTypes } from "./useAircraftTypes"
import { useGetAllCompanies } from "./useCompanies"

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

  return { companies, aircraftTypes }
}
