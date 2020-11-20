import React from "react"
import { useQuery } from "react-query"
import { getCity } from "./api/weather"

export const App: React.FC = () => {
  const { data } = useQuery(["citySearch", "copenhagen"], getCity)
  console.log(data)

  return (
    <div>
      <p>Hello there</p>
    </div>
  )
}
