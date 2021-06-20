import React , {useState} from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { Notification } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import axios from 'axios'

const loginUser = {
    email:"",
    password:""
}

const tmpNewUser = {
    username:"",
    name:"",
    email:"",
    password:"",
    createdAt: ""
}

const notify = (msg) => {
    Notification.open({
      title: 'Notification',
      description: <p width={320} rows={3} >{msg}</p>
    });
  }

 const AuthView = () => {
    const [user, setUser] = useState(() => loginUser);
    const [newUser, setNewUser] = useState(() => tmpNewUser);
    const [isLogging, setIsLogging]= useState(() => true)
    const history = useHistory()

    const login = () => {
        axios.post(`/api/users/login`, {...user}).then(res => {
            if(res.status === 200)
            {
                localStorage.setItem("User", JSON.stringify(res.data))
                notify("Login successful.")
                history.push("/")
                
            }
        }).catch(err => {
            notify(`${err.response.status} error occured.`)
        })
    }

    const signUp = () => {
        setNewUser({...newUser, createdAt: new Date()})
        console.log(newUser)
        axios.post(`/api/users`, newUser).then(res => {
            notify("Signed up Successfully")
            setIsLogging(true)
        }).catch(err => {
            notify(`${err.response.status} error occured`)
        })
    }

    return (
        <div className="container mt-5 w-50" style={{backgroundColor:"lightGray"}}>
            {isLogging? (<div>
            <h2 className="text-center"> Login!</h2>
        <div>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">Email:</label>
            <input  type="text" className="form-control" placeholder="Email" id="Email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input  type="password" className="form-control" placeholder="Password" id="Password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
        </div>
        
        <button onClick={() => login()} className="btn btn-dark w-100 mx-auto" style={{margin:"20px"}}>Login</button>
        </div>
        <button onClick={() => setIsLogging(!isLogging)}>Not a user? Register</button>
        </div>): 
        (<div>
            <h2 className="text-center">SignUp!</h2>
        <div>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">Username:</label>
            <input  type="text" className="form-control" placeholder="Username" id="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">Name:</label>
            <input  type="text" className="form-control" placeholder="Name" id="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">Email:</label>
            <input  type="text" className="form-control" placeholder="Email" id="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input  type="password" className="form-control" placeholder="Password" id="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
        </div>
        
        <button onClick={() => signUp()} className="btn btn-dark w-100 mx-auto" style={{margin:"20px"}}>SignUp</button>
        </div>
        <button onClick={() => setIsLogging(!isLogging)}>Already have an account? Login</button>
        </div>)}
        </div>
    )
}
export default AuthView;