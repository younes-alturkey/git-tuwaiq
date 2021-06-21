import React from "react"
import { useHistory } from "react-router-dom"

export default function Commits({ commits }) {
  const user = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!user) history.push("/auth")

  const allCommits =
    commits &&
    commits.map((element, indx) => {
      return (
        <li className="list-group-item" key={indx}>
          <div>{element.autherName}</div> <div>{element.message}</div>{" "}
          <div>{element.firstParentSha}</div> <div>{element.time}</div>
        </li>
      )
    })

  return <div>{allCommits}</div>
}
