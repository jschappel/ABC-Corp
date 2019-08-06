import React from 'react'

/**
 * withAuthorization: A function that determines wether or not to render a component based on the necessary conditions given.
 * @param {Props: rules, reqArray} Component rules is an object and reqArray is an array of rules needed.
 * @returns {Component} The component is returned if the requirements are match otherwise nothing is returned
 */
export const withAuthorization = (Component) => (props) => {
    const roles = props.roles
    const reqArray = props.reqArray
    let valid = true

    for(const role in reqArray) {
        const r = reqArray[role]
        if(r in roles) {
            if(roles[r] !== true){
                valid = false
            }
        } else{
            valid = false
        } 
    }

    return(
        valid ? <Component {...props} /> : null)
}