import React from "react"
import { Typography } from "@material-ui/core"
import { CitySearchDTO } from "../api/types"

type Props = {
  chosenCity: CitySearchDTO
}

export const GetWeather: React.FC<Props> = ({ chosenCity }) => {
  return (
    <Typography variant="h4" style={{ textAlign: "center" }}>
      {chosenCity?.EnglishName}
    </Typography>
  )
}
