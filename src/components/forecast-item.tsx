import React from "react"
import { format } from "date-fns"
import { makeStyles, Theme, Divider, Typography } from "@material-ui/core"
import WbSunny from "@material-ui/icons/WbSunny"
import Brightness3 from "@material-ui/icons/Brightness3"
import { Forecast } from "../api/types"

const useStyles = makeStyles<Theme>((theme) => ({
  dayPeriods: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}))

const convertToCelsius = (tempInFahrenheit: number): string =>
  ((tempInFahrenheit - 32) * (5 / 9)).toFixed(1)

type Props = {
  forecast: Forecast
}

// let's have some fun with destructuring, shall we? :)
export const ForecastItem: React.FC<Props> = ({
  forecast: {
    Date: date,
    Day: { IconPhrase: dayIconPhrase },
    Night: { IconPhrase: nightIconPhrase },
    Temperature: {
      Maximum: { Value: maxTemp },
      Minimum: { Value: minTemp },
    },
  },
}) => {
  const classes = useStyles()

  return (
    <div style={{ padding: 8 }}>
      <Divider />
      <Typography style={{ fontWeight: "bold" }}>
        {format(new Date(date), "dd.MM")}
      </Typography>

      <div className={classes.dayPeriods}>
        <div className={classes.row}>
          <WbSunny className={classes.icon} />
          <Typography variant="body2">{dayIconPhrase}</Typography>
        </div>
        <div className={classes.row}>
          <Brightness3 className={classes.icon} />
          <Typography variant="body2">{nightIconPhrase}</Typography>
        </div>
      </div>

      <Typography variant="body2">
        Minimum: {convertToCelsius(minTemp)} degrees
      </Typography>
      <Typography variant="body2">
        Maximum: {convertToCelsius(maxTemp)} degrees
      </Typography>
    </div>
  )
}
