import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"

axios.defaults.baseURL = "https://gittuwaiq.younes.expert"
axios.defaults.headers.post["Content-Type"] = "application/json"

ReactDOM.render(<App />, document.getElementById("root"))
