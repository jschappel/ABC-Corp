import React from 'react'
import Navigation from '../Navbars/view_navigation'

const withAuthorization = (Component) => (props) => {
    console.log(props.roles)
    return(<Component {...props} />)
}

const x = withAuthorization(<Navigation />)

export default x