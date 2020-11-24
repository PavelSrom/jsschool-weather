import React, { useState, useEffect } from "react"
import { Container } from "@material-ui/core"
import { useDevice } from "./hooks/use-device"
import { NonMobileDetected } from "./components/non-mobile"
import { GetWeather } from "./components/get-weather"
import { SearchCities } from "./components/search-cities"
import { CitySearchDTO } from "./api/types"

type Mode = "pick-city" | "get-weather"

/**
 * PRO TIP: try to load data for a city (e.g. Copenhagen), then enter
 * a different city (e.g. Paris), then enter back the first city - you
 * won't see the spinners in action - that's the power of cache ;)
 */

export const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("pick-city")
  const [chosenCityKey, setChosenCityKey] = useState<string>("")
  const [chosenCityName, setChosenCityName] = useState<string>("")
  const { width } = useDevice()

  // load stuff from LS on mount
  useEffect(() => {
    const cityKey = localStorage.getItem("cityKey")
    const cityName = localStorage.getItem("cityName")

    if (cityKey) setChosenCityKey(cityKey)
    if (cityName) {
      setChosenCityName(cityName)
      setMode("get-weather")
    }
  }, [])

  const handleCityClick = (city: CitySearchDTO): void => {
    localStorage.setItem("cityKey", city.Key)
    localStorage.setItem("cityName", city.EnglishName)

    setChosenCityKey(city.Key)
    setChosenCityName(city.EnglishName)
    setMode("get-weather")
  }

  if (width > 600) return <NonMobileDetected />

  return (
    <Container maxWidth="xs" style={{ padding: 16 }}>
      {mode === "pick-city" ? (
        <SearchCities handleCityClick={handleCityClick} />
      ) : (
        <GetWeather
          chosenCityKey={chosenCityKey}
          chosenCityName={chosenCityName}
          goBack={() => setMode("pick-city")}
        />
      )}
    </Container>
  )
}
