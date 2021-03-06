import axios from "axios"
import { API_CONFIG } from "./config"
import {
  CitySearchDTO,
  CurrentConditionsDTO,
  FutureForecastDTO,
  TodayForecastDTO,
} from "./types"

export const getCity = (_: string, query: string): Promise<CitySearchDTO[]> =>
  axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?q=${query}&apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)

export const getCurrentConditions = (
  _: string,
  locationKey: string
): Promise<CurrentConditionsDTO> =>
  axios
    .get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)

export const get1DayForecast = (
  _: string,
  locationKey: string
): Promise<TodayForecastDTO> =>
  axios
    .get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)

export const get5DayForecast = (
  _: string,
  locationKey: string
): Promise<FutureForecastDTO> =>
  axios
    .get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_CONFIG.KEY}`
    )
    .then(({ data }) => data)
