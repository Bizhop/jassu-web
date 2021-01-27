import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './shared/Header'
import DashContainer from './dash/DashContainer'
import PokerContainer from './poker/PokerContainer'
import KirvesContainer from './kirves/KirvesContainer'

const NotFound = () => (
  <div className="container">
    <div className="jumbotron">
      <h1>Page not Found 404!</h1>
    </div>
  </div>
)

const Routes = () => (
  <div className="container pt-5">
    <Switch>
      <Route exact path="/" component={DashContainer} />
      <Route exact path="/poker" component={PokerContainer} />
      <Route exact path="/kirves" component={KirvesContainer} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

const App = () => (
  <div className="app">
    <Header />
    <Routes />
  </div>
)

export default App
