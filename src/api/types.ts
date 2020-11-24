// only the stuff I need

export type CitySearchDTO = {
  Key: string
  EnglishName: string
  Country: {
    EnglishName: string
  }
  Region: {
    EnglishName: string
  }
}

export type Forecast = {
  Date: string
  Day: {
    IconPhrase: string
  }
  Night: {
    IconPhrase: string
  }
  Temperature: {
    Minimum: {
      Value: number
    }
    Maximum: {
      Value: number
    }
  }
}

export type CurrentConditionsDTO = [
  {
    Temperature: {
      Metric: {
        Value: number
      }
    }
    WeatherText: string
    IsDayTime: boolean
  }
]

export type TodayForecastDTO = {
  Headline: {
    Text: string
  }
  DailyForecasts: [Forecast]
}

export type FutureForecastDTO = {
  Headline: {
    Text: string
  }
  DailyForecasts: Forecast[]
}
