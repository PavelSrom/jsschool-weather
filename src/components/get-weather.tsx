import React from "react"
import { useQuery } from "react-query"
import {
  makeStyles,
  Theme,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core"
import { CitySearchDTO } from "../api/types"
import {
  getCurrentConditions,
  get1DayForecast,
  get5DayForecast,
} from "../api/weather"
import { ForecastItem } from "./forecast-item"

const useStyles = makeStyles<Theme>((theme) => ({
  spinner: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    minHeight: theme.spacing(16),
  },
}))

const CenteredSpinner: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.spinner}>
      <CircularProgress style={{ margin: "auto" }} />
    </div>
  )
}

type Props = {
  chosenCity: CitySearchDTO
}

export const GetWeather: React.FC<Props> = ({ chosenCity }) => {
  const classes = useStyles()

  const { status: currConditionStatus, data: currConditions } = useQuery(
    ["currentConditions", chosenCity.Key],
    getCurrentConditions
  )

  const { status: todayStatus, data: todayForecast } = useQuery(
    ["1DayForecast", chosenCity.Key],
    get1DayForecast
  )

  const { status: futureStatus, data: futureForecast } = useQuery(
    ["5DayForecast", chosenCity.Key],
    get5DayForecast
  )

  return (
    <>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        {chosenCity?.EnglishName}
      </Typography>

      {/* current conditions */}
      <Paper className={classes.paper}>
        {currConditionStatus === "loading" ? (
          <CenteredSpinner />
        ) : (
          <div style={{ textAlign: "center" }}>
            <Typography variant="h3">
              {`${currConditions![0].Temperature.Metric.Value} °C`}
            </Typography>
            <Typography>
              {currConditions![0].IsDayTime ? "Daytime" : "Nighttime"}
            </Typography>
            <Typography variant="body2">
              {currConditions![0].WeatherText}
            </Typography>
          </div>
        )}
      </Paper>

      {/* today forecast */}
      <Paper className={classes.paper}>
        {todayStatus === "loading" ? (
          <CenteredSpinner />
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5">Today's forecast</Typography>
              <Typography>{todayForecast!.Headline.Text}</Typography>
            </div>

            <ForecastItem forecast={todayForecast!.DailyForecasts[0]} />
          </>
        )}
      </Paper>

      {/* 5 day forecast */}
      <Paper className={classes.paper}>
        {futureStatus === "loading" ? (
          <CenteredSpinner />
        ) : (
          <>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h5">Future forecast</Typography>
            </div>

            {futureForecast?.DailyForecasts.map((forecast) => (
              <ForecastItem key={forecast.Date} forecast={forecast} />
            ))}
          </>
        )}
      </Paper>
    </>
  )
}
