import React,{useState, useEffect}from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Commits() {
    const user = JSON.parse(localStorage.getItem("User"));
    const history = useHistory();
    if(!user) history.push("/auth");
    let { id } = useParams();
    const repo = id;
    console.log(repo)
    const [commits, setCommits] = useState(()=>[]);
    useEffect(() => {
        getCommits();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCommits = ()=>{
        console.log({username:user.userName, repo: repo});
         axios.post("/api/commits",{ username:user.userName, repo: repo })
        //  axios("/api/commits", {username: user.userName, repo: repo})
         .then((res)=>{
                 console.log(res.data.commits);
                 setCommits(res.data.commits); // set the commits from api
                 
         }).catch(err=>{
             console.log("err:", err);
         });
    };

    const allCommits = commits.map((element, indx)=>{
        return <li className="list-group-item" id={indx}>
            <div>
            {element.autherName}
            </div>            <div>
            {element.message}
            </div>            <div>
            {element.firstParentSha}
            </div>            <div>
            {element.time}
            </div>
            </li>
    })


    return (
        <div>
            {allCommits}
        </div>
    )
}
