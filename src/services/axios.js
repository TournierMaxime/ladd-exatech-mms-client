import axios from "axios"
import { EXPO_LADD_EXATECH_MMS_API } from "@env"

export default axios.create({
  baseURL: EXPO_LADD_EXATECH_MMS_API,
  withCredentials: true,
})
