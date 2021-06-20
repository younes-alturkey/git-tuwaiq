import React from 'react'
import { BiGitRepoForked } from "react-icons/bi";
import { GoDesktopDownload } from "react-icons/go";
import Branches from "./Branches";
import Commits from "./Commits";
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Repo() {
    const user = JSON.parse(localStorage.getItem("User"))
    const history = useHistory()
    if(!user) history.push("/auth")

    let { id } = useParams();
    const repo = id;

    const download = () => {
        axios.post('/api/download', { username: user.userName, repo: repo })
        .then(res => console.log(res.data))
    }
    return (
        <div className="mt-5">
            <div className="row justify-content-between mx-auto">
                <div className="col-4">
                    <p>{user && user.userName} / {repo && repo}</p>
                </div>
                <div className="col-4 btn-toolbar" role="toolbar">
                    <div className="btn-group me-2" role="group">
                        <button type="button" className="btn btn-dark">Watch</button>
                        <button type="button" className="btn btn-dark">2</button>
                    </div>
                    <div className="btn-group me-2" role="group">
                        <button type="button" className="btn btn-dark">Star</button>
                        <button type="button" className="btn btn-dark">0</button>
                    </div>
                    <div className="btn-group me-2" role="group">
                        <button type="button" className="btn btn-dark">Fork <BiGitRepoForked style={{color:"white"}}/></button>
                        <button type="button" className="btn btn-dark">3</button>
                    </div>
                </div>
            </div>
            <div className="row container m-auto mt-5 col-10">
                    {/* Clone & branches */}
                <div className="row justify-content-between mb-3 mx-auto">
                     <Branches/>
                     <div className="col-2 btn-group me-2" role="group"> 
                        <button type="button" className="btn btn-success">Code <GoDesktopDownload style={{color:"white"}}/></button>
                     </div> 
                </div>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary"> User name last commit details blah blah</li>
                    <Commits/>
                </ul>
            </div>
        </div>
    )
}
