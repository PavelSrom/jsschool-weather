import React, { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { useDebounce } from "use-debounce"
import Search from "@material-ui/icons/Search"
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied"
import {
  makeStyles,
  Theme,
  Paper,
  InputBase,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Typography,
} from "@material-ui/core"
import { getCity } from "../api/weather"
import { CitySearchDTO } from "../api/types"

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

type Props = {
  handleCityClick: (city: CitySearchDTO) => void
}

export const SearchCities: React.FC<Props> = ({ handleCityClick }) => {
  const classes = useStyles()
  const [query, setQuery] = useState<string>("")
  const [debouncedQuery] = useDebounce(query, 1000)
  const [loading, setLoading] = useState<boolean>(false)

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

  return (
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
                  onClick={() => handleCityClick(city)}
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
  )
}
