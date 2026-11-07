// 📡 HTTP client
import axios from "axios"

// 🔗 Config
import { COMMON_API_URL } from "./common_api_url"

const BASE_URL = `${COMMON_API_URL}/aircraft`

// Create an Axios instance for easier configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Gets all aircraft  from the API.
 * @returns {Promise<Object[]>} raw aircraft objects
 */
export const getAllAircrafts = async () => {
  try {
    const { data } = await api.get()
    return data
  } catch (error) {
    console.error("Error fetching all aircrafts:", error.message)
    throw error
  }
}








