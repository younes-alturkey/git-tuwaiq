import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import axios from "axios";

const emptyUser = {
  id: 3,
  username: "",
  name: "",
  email: "",
  password: "",
  createdAt: "",
};
const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("User"));
  const history = useHistory();
  if (!loggedUser) history.push("/auth");
  console.log(loggedUser);
  const [isEdit, setIsEdit] = useState(() => false);
  const [btnText, setBtnText] = useState(() => "EDIT");
  const [user, setUser] = useState({
    id: loggedUser && loggedUser.id,
    username: loggedUser && loggedUser.userName,
    name: loggedUser && loggedUser.name,
    email: loggedUser && loggedUser.email,
    password: loggedUser && loggedUser.password,
    img: loggedUser && loggedUser.imgurl,
    createdAt: loggedUser && loggedUser.createdAt,
  });

  const UpdateProfile = () => {
    axios
      .put(`/api/users/${user.id}`, user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBtn = () => {
    if (!isEdit) {
      setBtnText((prev) => (prev = "SAVE"));
      setIsEdit((prev) => (prev = !prev));
    } else {
      setBtnText((prev) => (prev = "EDIT"));
      setIsEdit((prev) => (prev = !prev));
      UpdateProfile();
    }
  };

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
          <h4 style={{ color: "#6c757d" }}>Riyadh</h4>

          <Button
            onClick={() => handleBtn()}
            style={{ width: 200 }}
            variant="dark"
          >
            {" "}
            {btnText}{" "}
          </Button>
        </center>
      </div>
      {isEdit ? (
        <div className="col-8 offset-md-1 mt-5 w-50">
          <h2>Profile</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                User Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
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
              <input disabled type="text" className="form-control" />
            </div>
          </form>
        </div>
      ) : (
        <div className="col-8 offset-md-1 mt-5 w-50">
          <h2>Profile</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                User Name:
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                id="username"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input disabled type="text" className="form-control" id="name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                disabled
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input disabled type="password" className="form-control" />
            </div>
            <div className="col-md-12">
              <label htmlFor="joindate" className="form-label">
                Join Date:
              </label>
              <input disabled type="text" className="form-control" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

