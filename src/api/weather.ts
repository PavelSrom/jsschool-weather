import axios from "axios"
import { API_CONFIG } from "./config"
import { CitySearchDTO } from "./types"

export const getCity = (_: string, query: string): Promise<CitySearchDTO[]> =>
  axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?q=${query}&apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)
