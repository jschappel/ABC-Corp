import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './Components/Views/home'
import Login from './Components/Views/login'
import Employee from './Components/Views/employee'
import NotFound from './Components/Views/404Page'
import Inventory from './Components/Views/inventory'


class App extends Component {

  constructor(){
    super()

    /** State Variables
     * - loggedIn: determines if the user is logged in: originally set to false and is set to true on a successful login.
     * - userId: the employee id of the user that is logged in. Initially set to null and is updated upon a successful login.
     * - token: the jwt token supplied from the graphql API for validation.
     * - roles: the roles(permissions) that the logged in user has
     */
    this.state = {
      loggedIn: false,
      userId: null,
      token: null,
      roles: null,
    }
    this.loginHandler = this.loginHandler.bind(this)
  }

  /**
   * loginHandler: allows a child component to change the state of its parent
   * @param {String} userId The MySQL id of the logged in  user
   * @param {String} token The JWT token of the logged in user to be used for validation
   * @param {Object} roles Object containing the roles of the user
   */
  loginHandler(userId, token, roles) {
    this.setState({
      loggedIn: !this.state.loggedIn,
      userId,
      token,
      roles,
    })
  }

  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' render={(props) => <Login {...props} handler={this.loginHandler}/>} />
            <ProtectedRoute exact path='/home' component={Home} state={this.state}/>
            <ProtectedRoute exact path='/employee' component={Employee} state={this.state}/>
            <ProtectedRoute exact path='/inventory' component={Inventory} state={this.state}/>
            <ProtectedRoute exact path='/reservation' component={Inventory} state={this.state}/>
            <ProtectedRoute exact path='/lease' component={Inventory} state={this.state}/>
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
