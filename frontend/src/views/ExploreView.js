import * as React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { useEffect, useState } = React;

const ExploreView = () => {
  // Auth Check
  const user = JSON.parse(localStorage.getItem("User"));
  const history = useHistory();
  if (!user) history.push("/auth");

  // State

  const [Repos, setRepos] = useState([]);
  // Fetch data
  useEffect(() => {
    axios
      .get("/api/Explore")
      .then((res) => {
        setRepos(res.data);
      })
      .catch((res) => console.error(res));
  }, []);

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
        <h1> Explore</h1>
        <p> Explore All Repos Created by All the Users </p>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "Column" }}
        >
          {Repos.length !== 0 &&
            Repos.map((e, i) => {
              return (
                <div
                  key={i}
                  style={{
                    margin: "1em",
                    display: "grid",
                    boxShadow: "2px 3px 4px 3px #00000054",
                  }}
                  className="bg-dark"
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
                    <p style={{ color: "#fff", marginBottom: 10 }}>
                      {e.createdAt}
                    </p>
                  </div>{" "}
                  {/* Card Container */}
                </div>
              );
            })}
        </div>
      </div>{" "}
      {/* Main Container */}
      <div> </div> {/* place holder */}
    </div>
  );
};

export default ExploreView;
