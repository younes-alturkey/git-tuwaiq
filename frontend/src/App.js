import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import ErrorView from './views/ErrorView'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route component={ErrorView} />
      </Switch>
    </Router>
  )
}
