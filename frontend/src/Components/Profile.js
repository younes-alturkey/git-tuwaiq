import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Notification } from "rsuite"
import { Button, Image } from "react-bootstrap"
import axios from "axios"

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

const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("User"))
  const history = useHistory()
  if (!loggedUser) history.push("/auth")
  const [isEdit, setIsEdit] = useState(() => false)
  const [btnText, setBtnText] = useState(() => "EDIT")
  const [user, setUser] = useState({
    id: loggedUser && loggedUser.id,
    username: loggedUser && loggedUser.userName,
    name: loggedUser && loggedUser.name,
    email: loggedUser && loggedUser.email,
    password: loggedUser && loggedUser.password,
    img: loggedUser && loggedUser.imgurl,
    createdAt: loggedUser && loggedUser.createdAt,
  })

  const UpdateProfile = () => {
    axios
      .put(`/api/users/${user.id}`, user)
      .then((res) => {
        if (res.status === 204) {
          notify("Profile updated.")
          history.push("/")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleBtn = () => {
    if (!isEdit) {
      setBtnText((prev) => (prev = "SAVE"))
      setIsEdit((prev) => (prev = !prev))
    } else {
      setBtnText((prev) => (prev = "EDIT"))
      setIsEdit((prev) => (prev = !prev))
      UpdateProfile()
    }
  }

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
            src="https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-4.gif"
          />
          <br />
          <h4 style={{ color: "#6c757d", marginTop: 5 }}>
            @{user && user.username}
          </h4>

          <Button
            onClick={() => handleBtn()}
            style={{ width: 200, marginTop: 10 }}
            variant="dark"
          >
            {" "}
            {btnText}{" "}
          </Button>
        </center>
      </div>
      <div className="col-8 offset-md-1 mt-5 w-50">
        <h2>Profile</h2>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              User Name:
            </label>
            <input
              disabled
              id="username"
              type="text"
              className="form-control"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              disabled={!isEdit}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              disabled={!isEdit}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              disabled={!isEdit}
              id="password"
              type="password"
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="joindate" className="form-label">
              Join Date:
            </label>
            <input
              id="joinedDate"
              disabled
              type="text"
              className="form-control"
              value={user && user.createdAt}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
