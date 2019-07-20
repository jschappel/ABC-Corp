import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import '../../CSS/Components/navbar_view.css'

class viewNavigation extends Component {

    /**
     * protectedRoute: Creates a route that can only be accessed if the account has the proper permissions.
     * @param {Boolean} create true if account has create privileges
     * @param {Boolean} read true if account has read privileges
     * @param {Boolean} update true if account has read privileges
     * @param {Boolean} del true if account has delete privileges
     * @param {String} path The path to redirect the user to
     * @param {String} linkName The name of listItem to appear on the screen
     */
    protectedRoute(create, read, update, del, path, linkName) {
        // check if the props supplied fit the
        const roles = this.props.roles
        if(roles.create === create && roles.read === read && roles.update === update && roles.delete === del) {
            return(
                <li className="nav-item">
                    <NavLink className='nav-link' to={path}>{linkName}</NavLink>
                </li>
            )
        } else {
            return null
        }
    }

    render() {

        return(
            <div>
                <ul className="nav nav-pills" id='view_navigation'>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/home'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/inventory'>Inventory</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/employee'>Employees</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/reservation'>Reservations</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/lease'>Leases</NavLink>
                    </li>
                    {
                        this.protectedRoute(true, true, true, true, '/lease', 'Recent Activity')
                    }
                </ul>
            </div>
        )
    }
}


export default viewNavigation
