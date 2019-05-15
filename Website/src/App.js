import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './ViewComponents/home'
import Login from './ViewComponents/login'
import Employee from './ViewComponents/employee'
import NotFound from './ViewComponents/404Page'
import Inventory from './ViewComponents/inventory'


class App extends Component {

  constructor(){
    super()

    /** State Variables
     * - loggedIn: determines if the user is logged in: originally set to false and is set to true on a successful login.
     * - userId: the employee id of the user that is logged in. Initially set to null and is updated upon a successful login.
     */
    this.state = {
      loggedIn: true,
      userId: null
    }
  }

  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <ProtectedRoute path='/home' component={Home} state={this.state}/>
            <ProtectedRoute path='/employee' component={Employee} state={this.state}/>
            <ProtectedRoute path='/inventory' component={Inventory} state={this.state}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App;


/**
 * Protected Route is a React-Router route that requires a user to login before they are able to proceed.
 * If the users tries to access a Protected Route before they log in they will be redirected to the Login Page.
 * @param {Component} Component A react component that the route will redirect the user to if they are logged in.
 * @param {...rest} rest Additional props that you wish to pass to the component
 */
 const ProtectedRoute = ({ component: Component, ...rest }) => {
  return(
      <Route
          {...rest}
          render={props => {
              if(rest.state.loggedIn){
                  return <Component {...props} rest={rest.state}/>
              }
              else {
                  return(<Redirect to={{pathname: '/'}} />
                  )
              }
          }}
      />
  )
}
