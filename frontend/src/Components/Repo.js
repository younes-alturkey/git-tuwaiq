import React, { useState, useEffect } from "react"
import { BiGitRepoForked } from "react-icons/bi"
import { GoDesktopDownload } from "react-icons/go"
import Branches from "./Branches"
import Commits from "./Commits"
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"

export default function Repo() {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem("User"))
  if (!user) history.push("/auth")
  const { id } = useParams()
  const repo = id

  const [commits, setCommits] = useState(() => [])
  const [branches, setBranches] = useState(() => [])

  const config = {
    "Content-Type": "application/x-www-form-urlencoded",
    responseType: "blob",
  }

  const download = () => {
    axios
      .post(`/api/download`, { username: user.userName, repo: repo }, config)
      .then((res) => {
        var zipName = `${repo}.zip`
        let blob = new Blob([res.data], { type: "application/zip" })
        let elink = document.createElement("a")
        elink.style.display = "none"
        elink.href = window.URL.createObjectURL(blob)
        elink.download = zipName
        elink.click()
        elink.remove()
      })
  }

  useEffect(() => {
    const getCommits = () => {
      axios
        .post("/api/commits", { username: user.userName, repo: repo })
        .then((res) => {
          setCommits(res.data.commits)
        })
        .catch((err) => {
          console.log("err:", err)
        })
    }

    const getBranches = () => {
      axios
        .post("/api/Branches", { username: user && user.userName, repo: repo })
        .then((res) => {
          setBranches(res.data.branches)
        })
        .catch((err) => {
          console.log("err:", err)
        })
    }

    getCommits()
    getBranches()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="mt-5">
      <div className="row justify-content-between mx-auto">
        <div className="col-4">
          <p>
            {user && user.userName} / {repo && repo}
          </p>
        </div>
        <div className="col-4 btn-toolbar" role="toolbar">
          <div className="btn-group me-2" role="group">
            <button type="button" className="btn btn-dark">
              Watch
            </button>
            <button type="button" className="btn btn-dark">
              2
            </button>
          </div>
          <div className="btn-group me-2" role="group">
            <button type="button" className="btn btn-dark">
              Star
            </button>
            <button type="button" className="btn btn-dark">
              0
            </button>
          </div>
          <div className="btn-group me-2" role="group">
            <button type="button" className="btn btn-dark">
              Fork <BiGitRepoForked style={{ color: "white" }} />
            </button>
            <button type="button" className="btn btn-dark">
              3
            </button>
          </div>
        </div>
      </div>
      <div className="row container m-auto mt-5 col-10">
        {/* Clone & branches */}
        <div className="row justify-content-between mb-3 mx-auto">
          <Branches branches={branches} />
          <div className="col-2 btn-group me-2" role="group">
            <button
              onClick={() => download()}
              type="button"
              className="btn btn-success"
            >
              Code <GoDesktopDownload style={{ color: "white" }} />
            </button>
          </div>
        </div>
        <ul className="list-group">
          <li className="list-group-item list-group-item-secondary">
            <strong style={{ marginRight: 5 }}>{user && user.name}</strong>
            <span>{commits.length >= 1 && commits[0].message}</span>
          </li>
          <Commits commits={commits} />
        </ul>
      </div>
    </div>
  )
}
