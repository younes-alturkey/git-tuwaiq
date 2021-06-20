import * as React from 'react' 
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const {useEffect , useState} = React 



const ExploreView = ()=> {


    // Auth Check
    const user = JSON.parse(localStorage.getItem("User"))
    const history = useHistory()
    if(!user) history.push("/auth")

    // State 

    const [Repos , setRepos] = useState([])
    const [Users , setUsers] = useState([])
  // Fetch data 
   useEffect( ()=> {
     
       axios.get('/api/Explore').then((res)=>{console.log(res.data);setRepos(res.data);}).catch((res)=>console.error(res))
       axios.get('/api/Users').then((res)=>{console.log(res.data);setUsers(res.data);}).catch((res)=>console.error(res))
   }, [])
    
    return (
  
        <div style={{display:"grid", gridTemplateColumns:"10% 80% 10%" ,height:"100%" , width:"100%"}}>
            <div> </div> {/* place holder */}
            <div style={{height:"100%", textAlign:"center" }}> <h1 style={{margin:"1em"}}> Explore</h1>
            <h4> Explore All Repos Created by All the Users </h4>
            <div style= {{height:"100%" ,display:"flex" , flexDirection:"Column"}}>
            { Repos.length !== 0 && Repos.map(e=> {
                       return     <div  style= {{backgroundColor:"lightGray" , margin:"1em" , display:"grid" , boxShadow:"2px 3px 4px 3px #00000054" }}> 
                                                                             
                            <div style={{display:"flex" , flexDirection:"Column" , alignItems:"center" }} >
                            <h6 style={{ margin:"auto" , color: "#000" ,padding:"0.5em"}}> [ REPO NAME ] </h6>
                            <h4 style={{ textAlign:"center", color: "#6c757d" ,padding:"0.5em"}} > {e.name} </h4>  
                            <h6 style={{ margin:"auto" , color: "#000" ,padding:"0.5em"}}> [ CREATED BY ]  </h6>
                            <h4 style={{ textAlign:"center", color: "#6c757d" ,padding:"0.5em"}} > {Users.length !== 0 && Users.filter(m=>m.id === e.userId).name} </h4> 
                            </div>  {/* Card Container */}
                            </div> 

            })
               
            }
            </div> 
            </div>  {/* Main Container */}
            <div> </div>  {/* place holder */}
        </div>
    
    ) 

}

export default ExploreView 