import React from "react"
import ReactDOM from "react-dom"
import { ReactQueryConfigProvider } from "react-query"
import "./index.css"
import { App } from "./App"

const app = (
  <React.StrictMode>
    <ReactQueryConfigProvider
      config={{ queries: { refetchOnWindowFocus: false } }}
    >
      <App />
    </ReactQueryConfigProvider>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById("root"))
