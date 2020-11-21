import React, { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import {
  makeStyles,
  Theme,
  Typography,
  Paper,
  InputBase,
  Container,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@material-ui/core"
import Search from "@material-ui/icons/Search"
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied"
import { useQuery } from "react-query"
import { getCity } from "./api/weather"
import { CitySearchDTO } from "./api/types"
import { useDevice } from "./hooks/use-device"
import { NonMobileDetected } from "./components/non-mobile"

const useStyles = makeStyles<Theme>((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  list: {
    marginTop: theme.spacing(4),
  },
  noResultsBox: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emoji: {
    width: 80,
    height: 80,
  },
}))

type Mode = "pick-city" | "get-weather"

export const App: React.FC = () => {
  const classes = useStyles()
  const [mode, setMode] = useState<Mode>("pick-city")
  const [query, setQuery] = useState<string>("")
  const [debouncedQuery] = useDebounce(query, 1000)
  const [loading, setLoading] = useState<boolean>(false)
  const [chosenCity, setChosenCity] = useState<CitySearchDTO>()

  const { width } = useDevice()

  const { data } = useQuery(["citySearch", debouncedQuery], getCity, {
    enabled: !!debouncedQuery,
    onSuccess: () => setLoading(false),
  })

  // hide the list and set a spinner on valid query search
  useEffect(() => {
    setLoading(!!query)
  }, [query])

  // load city query from LS on mount
  useEffect(() => {
    const cityQuery = localStorage.getItem("cityQuery")?.trim()
    if (cityQuery) setQuery(cityQuery)
  }, [])

  // save query to LS on each debounced change
  useEffect(() => {
    localStorage.setItem("cityQuery", debouncedQuery)
  }, [debouncedQuery])

  if (width > 600) return <NonMobileDetected />

  return (
    <Container maxWidth="xs" style={{ padding: 16 }}>
      {mode === "pick-city" ? (
        <>
          <Paper className={classes.paper}>
            <InputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={classes.input}
              placeholder="Seach a city"
            />
            <Search />
          </Paper>

          {loading && <LinearProgress />}

          {!loading && data && !!query && (
            <>
              {data.length > 0 ? (
                <List component={Paper} className={classes.list}>
                  {data.map((city, index) => (
                    <ListItem
                      key={city.Key}
                      button
                      divider={index !== data.length - 1}
                      onClick={() => {
                        setChosenCity(city)
                        setMode("get-weather")
                      }}
                    >
                      <ListItemText
                        primary={city.EnglishName}
                        secondary={`${city.Country.EnglishName}, ${city.Region.EnglishName}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <div className={classes.noResultsBox}>
                  <SentimentDissatisfied className={classes.emoji} />
                  <Typography>No cities match this search</Typography>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {chosenCity?.EnglishName}
        </Typography>
      )}
    </Container>
  )
}
