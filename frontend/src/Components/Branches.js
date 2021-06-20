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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getBranches =()=>{
       axios.post("/api/Branches",{ username: user && user.userName, repo: repo }).then((res)=>{
               setBranches(res.data.branches);
       }).catch(err=>{
           console.log("err:", err);
       })
  };
  const allBranches = branches.map((el)=>{
    return <li>{el}</li>
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
