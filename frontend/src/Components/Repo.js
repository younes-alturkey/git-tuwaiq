import React from 'react'

export default function Repo() {
    return (
        <div className="mt-5">
            <div className="row justify-content-between mx-auto">
                <div className="col-4">
                    <p>UserName / RepoName</p>
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
                        <button type="button" className="btn btn-dark">Fork</button>
                        <button type="button" className="btn btn-dark">0</button>
                    </div>
                </div>
            </div>
            <div className="row container m-auto mt-5 col-10">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary"> User name last commit details blah blah</li>
                    <li className="list-group-item">Mansovic.exe</li>
                    <li className="list-group-item">Younes.exe</li>
                    <li className="list-group-item">Abdulmajeed.exe</li>
                </ul>
            </div>
        </div>
    )
}
