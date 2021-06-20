import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import ErrorView from './views/ErrorView'
import CreateView from './views/CreateView'
import NavBar from './Components/NavBar'
import Repo from './Components/Repo'
import Profile from './Components/Profile'

export default function App() {
  return (  
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route path="/create" component={CreateView} exact />
        <Route path="/Repo" component={Repo} exact />
        <Route path="/Profile" component={Profile} exact />
        <Route component={ErrorView} />
      </Switch>
    </Router>
  )
}
