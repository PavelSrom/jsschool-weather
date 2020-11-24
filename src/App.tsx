import React, { useState } from "react"
import { Container } from "@material-ui/core"
import { CitySearchDTO } from "./api/types"
import { useDevice } from "./hooks/use-device"
import { NonMobileDetected } from "./components/non-mobile"
import { GetWeather } from "./components/get-weather"
import { SearchCities } from "./components/search-cities"

type Mode = "pick-city" | "get-weather"

export const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("pick-city")
  const [chosenCity, setChosenCity] = useState<CitySearchDTO>()
  const { width } = useDevice()

  const handleCityClick = (city: CitySearchDTO): void => {
    setChosenCity(city)
    setMode("get-weather")
  }

  if (width > 600) return <NonMobileDetected />

  return (
    <Container maxWidth="xs" style={{ padding: 16 }}>
      {mode === "pick-city" ? (
        <SearchCities handleCityClick={handleCityClick} />
      ) : (
        <GetWeather chosenCity={chosenCity!} />
      )}
    </Container>
  )
}
