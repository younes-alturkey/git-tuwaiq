import { GoGitBranch } from "react-icons/go";
import axios from 'axios';
import React,{useState,useEffect}from 'react';
import { useHistory,useParams } from 'react-router-dom'

export default function Branches(props) {
    const user = JSON.parse(localStorage.getItem("User"))
    const history = useHistory()
    if(!user) history.push("/auth")
    let { id } = useParams();
    const repo = id;
  const [branches, setBranches] = useState(()=>[]);
  useEffect(() => {
    getBranches();
  }, [])
  const getBranches =()=>{
    const username = user && user.userName
       axios.post("/api/Branches",{ username:user.userName, repo: repo }).then((res)=>{
               console.log(res.data.branches);
               setBranches(res.data.branches);
       }).catch(err=>{
           console.log("err:", err);
       })
  };
  const allBranches = branches.map((el)=>{
    return <li><a class="dropdown-item" href="#">{el}</a></li>
  });

    return (
        <div className="col-2 btn-group me-2">
<div class="dropdown">
  <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    Branches <GoGitBranch/>
      </button>
  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    {allBranches}
  </ul>
</div>
</div>
    )
}
