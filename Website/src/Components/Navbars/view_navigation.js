import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import '../../CSS/Components/navbar_view.css'

class viewNavigation extends Component {
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
                </ul>
            </div>
        )
    }
}

export default viewNavigation
