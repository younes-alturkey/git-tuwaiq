import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Image, Row } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import Cards from "../Components/Cards"

export default function HomeView() {
  const user = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!user) history.push("/auth")
  const [arr, setaArr] = useState(() => ["Fetching your repos..."])
  useEffect(() => {
    const fetchUsers = () => {
      return axios(`/api/users/repos?username=${user && user.userName}`).then(
        (response) => setaArr(response.data)
      )
    }
    setTimeout(() => {
      fetchUsers()
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="row">
      <div className="col-3">
        <center>
          <Image
            style={{
              border: "0.5px solid",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "100%",
              boxShadow: "3px 4px 7px #00000052",
            }}
            width="170"
            height="160"
            src="https://usagif.com/wp-content/uploads/2021/4fh5wi/pepefrg-4.gif"
          />
          <br />
          <h4 style={{ color: "#6c757d", marginTop: 5 }}>
            @{user && user.userName}
          </h4>

          <Button
            onClick={() => history.push("/profile")}
            style={{ width: 200, marginTop: 10 }}
            variant="dark"
          >
            {user && user.name}
          </Button>
        </center>
      </div>
      <div className="col-8 offset-md-1 mt-5 w-50">
        <Row xs={1} md={2} className="g-4">
          {arr.map((repo, i) => {
            const repoPath = repo.split("/")
            const repoName = repoPath[repoPath.length - 1]

            return <Cards key={i} all={repoName} />
          })}
        </Row>
      </div>
    </div>
  )
}
