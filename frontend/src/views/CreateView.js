import React,{useState }from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function CreateView() {
    const user = JSON.parse(localStorage.getItem("User"))
    const history = useHistory()
    if(!user) history.push("/auth")
    const [repo, setRepo] = useState(()=>"")


    const PostRepo =()=>{
        console.log("---"+repo+"-------");
         axios.post("/api/repos/init/"+repo).then((res)=>{
                 console.log(res.data);
         }).catch(err=>{
             console.log("err:", err);
         })
    };


    const getRepoName =(e)=>{
        console.log(e.target.value);
        setRepo(e.target.value)
    };
  

    return (
        <div className="container mt-5 w-50" style={{backgroundColor:"lightGray"}}>
            <h2 className="text-center"> Create new repo!</h2>
        <div>
        <div class="mb-3">
            <label for="text" class="form-label">User:</label>
            <input onChange={(e) => getRepoName(e)} type="text" class="form-control"  aria-describedby="emailHelp" placeholder="repo name" id="PostRepoName"/>
            <div id="emailHelp" class="form-text">The name must be an unieqe name.</div>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
        <label class="form-check-label" for="flexRadioDefault1">
           Public
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
        <label class="form-check-label" for="flexRadioDefault2">
            Private
        </label>
        </div>
        <button onClick={() => PostRepo()} class="btn btn-dark w-100 mx-auto" style={{margin:"20px"}}>Submit</button>
        </div>
        </div>
    )
}
