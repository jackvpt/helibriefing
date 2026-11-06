// 🔄 React Query
import { useQuery, keepPreviousData } from "@tanstack/react-query"

// 🔌 API calls
import { getAllCompanies } from "../api/companies.api"

// 🧬 Models
import CompanyModel from "../models/CompanyModel"

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
const fetchCompanies = async () => {
  const companies = await getAllCompanies()

  return companies.map(
    (company) => new CompanyModel(company),
  )
}

// ----------------------------
// Get all companies
// ----------------------------
export const useGetAllCompanies = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: fetchCompanies,
    enabled,

    ...DEFAULT_QUERY_OPTIONS,
  })
}
