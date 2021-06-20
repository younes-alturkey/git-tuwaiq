import React, { useState, useEffect } from "react";
import { Button, Image , Row} from "react-bootstrap";
import axios from 'axios';
import Cards from "../Components/Cards";
import { useHistory } from 'react-router-dom'

export default function HomeView() {
  const user = JSON.parse(localStorage.getItem("User"))
    const history = useHistory()
    if(!user) history.push("/auth")
  const [arr, setaArr] = useState(()=>["jjjjjj"])
  
  useEffect(() => {
    axios.post('/api/users/repos', {username: user && user.userName}).then(response => {
    setaArr(prev=>prev = response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  let all = arr.map((elem) => {
    const repoPath = elem.split("\\")
    const repoName = repoPath[repoPath.length - 1]

      return <Cards all={repoName} />
  })
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
            src="https://i0.wp.com/novocom.top/image/bWVkabm9yLWExLnRlbm9yLmNvbQ==/images/c8c0e6588c416703742a082de8d5db1a/tenor.gif"
          />
          <br />
          <h4 style={{ color: "#6c757d" }}>Riyadh</h4>

          <Button
            //onClick={() => handleBtn()}
            style={{ width: 200 }}
            variant="dark"
          >
            {" "}
            {}{" "}
          </Button>
        </center>
      </div>
      <div className="col-8 offset-md-1 mt-5 w-50">
      <Row xs={1} md={2} className="g-4">
          {all}
          </Row>
        </div>
    </div>
  )
}
