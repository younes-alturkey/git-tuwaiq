import { GoGitBranch } from "react-icons/go"
import React from "react"
import { useHistory } from "react-router-dom"

export default function Branches({ branches }) {
  const user = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!user) history.push("/auth")

  const allBranches = branches.map((el, i) => {
    return (
      <li style={{ cursor: "pointer" }} key={i}>
        {el}
      </li>
    )
  })

  return (
    <div className="col-2 btn-group me-2">
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Branches <GoGitBranch />
        </button>
        <ul className="dropdown-menu dropdown-menu-dark text-center">
          {allBranches}
        </ul>
      </div>
    </div>
  )
}
