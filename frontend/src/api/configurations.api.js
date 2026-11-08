// 📡 HTTP client
import axios from "axios"

// 🔗 Config
import { COMMON_API_URL } from "./common_api_url"

const BASE_URL = `${COMMON_API_URL}/configurations`

// Create an Axios instance for easier configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/**
 * Gets all configurations from the API.
 * @returns {Promise<Object[]>} raw configurations objects
 */
export const getAllConfigurations = async () => {
  try {
    const { data } = await api.get()

    return data
  } catch (error) {
    console.error("Error fetching all configurations:", error.message)
    throw error
  }
}








