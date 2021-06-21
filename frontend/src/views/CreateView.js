import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
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

export default function CreateView() {
  const user = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!user) history.push("/auth")
  const [repo, setRepo] = useState(() => "")
  const [checked, setChecked] = useState(() => false)
  const PostRepo = () => {
    axios
      .post(`/api/init?username=${user && user.userName}&repo=${repo}`)
      .catch((err) => notify(`${err.response.status} has occured.`))

    history.push("/")
    notify(`${repo}.git has been created.`)
  }

  const getRepoName = (e) => {
    console.log(e.target.value)
    setRepo(e.target.value)
  }

  return (
    <div
      className="container mt-5 w-50"
      style={{ backgroundColor: "lightGray" }}
    >
      <h2 className="text-center"> Create new repository</h2>
      <div>
        <input
          onChange={(e) => getRepoName(e)}
          type="text"
          className="form-control mt-3"
          aria-describedby="emailHelp"
          placeholder="MyNewAwesomeProject"
          id="PostRepoName"
        />
        <div id="emailHelp" className="form-text mb-3">
          The name must be unique.
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked={!checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="form-check-label">Public</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="form-check-label">Private</label>
        </div>
        <button
          onClick={() => PostRepo()}
          className="btn w-100 mx-auto"
          style={{ margin: "20px", backgroundColor: "green", color: "white" }}
        >
          Create
        </button>
      </div>
    </div>
  )
}
