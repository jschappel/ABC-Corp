import React from 'react'

/**
 * WelcomeMessage: Stateless component that displays the first and last name of a user
 * @param {React Props} props Props containing 'firstName' and 'lastName'.
 */
const WelcomeMessage = (props) => {
    return(
        <h1 style={{color:'#282c34'}}>Welcome {props.firstName}</h1>
    )
}

/**
 * withWelcomeComponent: A HOC that checks if the component supplied is null
 * @param {Component} Component The Component to apply the function to
 */
const withWelcomeMessage = (Component) => (props) => {
    return props.firstName ? <Component {...props} />  : <h4>This account is not fully set up. Please contact IT for further details</h4>
}

export default withWelcomeMessage(WelcomeMessage)