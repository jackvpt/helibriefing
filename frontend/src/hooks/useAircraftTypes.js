// 🔄 React Query
import { useQuery, keepPreviousData } from "@tanstack/react-query"

// 🔌 API calls
import { getAllAircraftTypes } from "../api/aircrafttypes.api"

// 🧬 Models
import AircraftTypeModel from "../models/AircraftTypeModel"

// ⏱️ Query cache config
const STALE_TIME = 10 * 60 * 1000 // Time before data is considered stale (no longer fresh)
const REFETCH_INTERVAL = 10 * 60 * 1000 // Time between automatic refetches (while the query is active)

const DEFAULT_QUERY_OPTIONS = {
  staleTime: STALE_TIME,
  refetchInterval: REFETCH_INTERVAL,

  // v5 replacement for `keepPreviousData: true`: keeps showing the
  // last successful data while a refetch is in flight, instead of
  // flashing a loading state.
  placeholderData: keepPreviousData,
}

/**
 * Shared query function for every "aircraftType" query.
 * The API layer returns raw data; model conversion lives here so that
 * all consumers receive domain objects (AircraftTypeModel instances).
 */
const fetchAircraftTypes = async () => {
  const aircraftTypes = await getAllAircraftTypes()

  return aircraftTypes.map(
    (aircraftType) => new AircraftTypeModel(aircraftType),
  )
}

// ----------------------------
// Get all aircraft types
// ----------------------------
export const useGetAllAircraftTypes = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["aircraftTypes"],
    queryFn: fetchAircraftTypes,
    enabled,

    ...DEFAULT_QUERY_OPTIONS,
  })
}
