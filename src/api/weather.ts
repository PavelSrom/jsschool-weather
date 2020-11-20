import axios from "axios"
import { API_CONFIG } from "./config"

export const getCity = (_: string, query: string): Promise<any> =>
  axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?q=${query}&apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)
