// 🔄 React Query
import { useQuery, keepPreviousData } from "@tanstack/react-query"

// 🔌 API calls
import { getAllConfigurations } from "../api/configurations.api"

// 🧬 Models
import ConfigurationModel from "../models/ConfigurationModel"

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
 * Shared query function for every "company" query.
 * The API layer returns raw data; model conversion lives here so that
 * all consumers receive domain objects (AircraftTypeModel instances).
 */
const fetchConfigurations = async () => {
  const configurations = await getAllConfigurations()

  return configurations.map(
    (configuration) => new ConfigurationModel(configuration),
  )
}

// ----------------------------
// Get all configurations
// ----------------------------
export const useGetAllConfigurations = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["configurations"],
    queryFn: fetchConfigurations,
    enabled,

    ...DEFAULT_QUERY_OPTIONS,
  })
}

export const useGetConfigurationsByAircraftType = (
  aircraftType,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: ["configurations", aircraftType],
    queryFn: () =>
      getAllConfigurations().then(configurations =>
        configurations
          .map(configuration => new ConfigurationModel(configuration))
          .filter(configuration => configuration.aircraftType === aircraftType)
      ),
    enabled: enabled && !!aircraftType,
    ...DEFAULT_QUERY_OPTIONS,
  })
}
