import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './ViewComponents/home'
import Login from './ViewComponents/login'
import Employee from './ViewComponents/employee'
import NotFound from './ViewComponents/404Page'
import Inventory from './ViewComponents/inventory'


class App extends Component {

  constructor(){
    super()

    /** State Variables
     * - loggedIn: determins if the user is logged in: origionally set to false and is set to true on a sucessful login
     */
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/employee' component={Employee} />
            <Route path='/inventory' component={Inventory} />
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
