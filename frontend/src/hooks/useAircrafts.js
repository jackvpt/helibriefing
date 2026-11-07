// 🔄 React Query
import { useQuery, keepPreviousData } from "@tanstack/react-query"

// 🔌 API calls
import { getAllAircrafts } from "../api/aircrafts.api"

// 🧬 Models
import AircraftModel from "../models/AircraftModel"

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
 * Shared query function for every "aircraft" query.
 * The API layer returns raw data; model conversion lives here so that
 * all consumers receive domain objects (AircraftModel instances).
 */
const fetchAircrafts = async () => {
  const aircrafts = await getAllAircrafts()

  return aircrafts.map(
    (aircraft) => new AircraftModel(aircraft),
  )
}

// ----------------------------
// Get all aircrafts
// ----------------------------
export const useGetAllAircrafts = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["aircrafts"],
    queryFn: fetchAircrafts,
    enabled,

    ...DEFAULT_QUERY_OPTIONS,
  })
}
