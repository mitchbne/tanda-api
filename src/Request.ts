import axios from "axios"
import { SupportedUploadType } from "./types"
import Logger from "./utils/Logger"

require("dotenv").config()

const AUTH_TOKEN = process.env.AUTH_TOKEN || ""

// Setup default API connection configuration
axios.defaults.baseURL = "https://my.tanda.co/api/v2/"
axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`
axios.defaults.headers.post["Content-Type"] = "application/json"

const API_ENDPOINTS: Record<SupportedUploadType, string> = { [SupportedUploadType.storestats]: "storestats/for_datastream" }

export default {
  API_ENDPOINTS,
  POST: (endpoint: string, data: any) => axios.post(endpoint, data),
  GET: () => { Logger.error("GET requests are not currently supported by this API tool") },
  PUT: () => { Logger.error("PUT requests are not currently supported by this API tool") },
  DELETE: () => { Logger.error("DELETE requests are not currently supported by this API tool") },
}
