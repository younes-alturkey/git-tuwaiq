import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Notification } from "rsuite"
import "rsuite/dist/styles/rsuite-default.css"

const notify = (msg) => {
  Notification.open({
    title: "Notification",
    description: (
      <p width={320} rows={3}>
        {msg}
      </p>
    ),
  })
}

const ForkView = () => {
  const loggedUser = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!loggedUser) history.push("/auth")
  const [textClone, setTextClone] = useState(() => null)

  const postClone = () => {
    axios
      .post(
        `/api/clone?Url=${textClone}&username=${
          loggedUser && loggedUser.userName
        }`
      )
      .catch((err) => {
        notify(`${err.response.status} error occured.`)
      })
    notify(`The repo has been forked.`)
    history.push("/")
  }

  return (
    <div>
      <div
        className="container mt-5 w-50"
        style={{ backgroundColor: "lightGray" }}
      >
        <h2 className="text-center mb-3"> Fork a remote repository</h2>
        <div>
          <input
            onChange={(e) => setTextClone((prev) => (prev = e.target.value))}
            type="text"
            className="form-control"
            placeholder="https://github.com/torvalds/linux.git"
            id="PostCloneName"
          />
          <div id="emailHelp" className="form-text mb-3">
            The url must be a valid git repository.
          </div>
          <button
            onClick={() => postClone()}
            className="btn w-100 mx-auto"
            style={{ margin: "20px", backgroundColor: "green", color: "white" }}
          >
            Fork
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForkView
