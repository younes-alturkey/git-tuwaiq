import * as React from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"

const { useEffect, useState } = React

const IssueView = () => {
  // Auth Check
  const user = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!user) history.push("/auth")

  // State

  const [Repos, setRepos] = useState([])
  const [Issues, setIssues] = useState([])

  // Fetch data
  useEffect(() => {
    axios
      .get("/api/Explore")
      .then((res) => {
        setRepos(res.data)
      })
      .catch((res) => console.error(res))
    axios
      .get("/api/Issues")
      .then((res) => {
        setIssues(res.data)
      })
      .catch((res) => console.error(res))
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div> </div> {/* place holder */}
      <div style={{ height: "100%", textAlign: "center" }}>
        {" "}
        <h1> Issues </h1>
        <p> All Issues Issued in the Database </p>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "Column" }}
        >
          {Repos.length !== 0 &&
            Repos.map((e, i) => {
              return (
                <div
                  key={i}
                  className="bg-dark"
                  style={{
                    margin: "1em",
                    display: "grid",
                    boxShadow: "2px 3px 4px 3px #00000054",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "Column",
                      alignItems: "center",
                    }}
                  >
                    <h6
                      style={{
                        margin: "auto",
                        color: "#fff",
                        padding: "0.5em",
                      }}
                    >
                      {" "}
                      [ REPO NAME ]{" "}
                    </h6>
                    <h4
                      onClick={() => history.push("/repo/" + e.name)}
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        color: "#673AB7",
                        padding: "0.5em",
                      }}
                    >
                      {" "}
                      {e.name}{" "}
                    </h4>
                    <h6
                      style={{
                        margin: "auto",
                        color: "#fff",
                        padding: "0.5em",
                      }}
                    >
                      {" "}
                      [ Issues ]{" "}
                    </h6>
                    <div
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        padding: "0.5em",
                        fontSize: "1.3em",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <ol>
                        {Issues.filter((issue) => issue.repoId === e.id).map(
                          (foundissue, i) => (
                            <li key={i}>{foundissue.content}</li>
                          )
                        )}
                      </ol>{" "}
                    </div>
                  </div>{" "}
                  {/* Card Container */}
                </div>
              )
            })}
        </div>
      </div>{" "}
      {/* Main Container */}
      <div> </div> {/* place holder */}
    </div>
  )
}

export default IssueView
