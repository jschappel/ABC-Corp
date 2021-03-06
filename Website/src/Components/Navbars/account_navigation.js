import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ABCLogo from '../../Images/ABCLogo2.png'

class Navigation extends Component {

    constructor(){
        super()
    
        /** State variables: 
         * - menu controls the navbar when the screen size is below  bootstrap-sm attribute.
         */
        this.state = {
          menu: false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
    }

    /**
   * Handles the Bootstrap navbars hide and show effects for the collapse navbar (When the screen ). 
   * @param  {Javascript Event} event the event associated with the listener
   * @return none
   */
    toggleMenu(event){
        const name = event.currentTarget.name
        this.setState({
        [name]: !this.state[name]
        })
    }



    render() {
        const show = (this.state.menu) ? "show" : ""
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-abc-blue">
               <img src={ABCLogo} width="80" height="40" alt=""/>
                <button className="navbar-toggler" type="button" name="menu" onClick={this.toggleMenu} data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" name="menu" onClick={this.toggleMenu}></span>
                </button>
                <div className={"collapse navbar-collapse " + show} id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className='nav-link text-abc-dark-blue' to='/' exact>Account Settings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link text-abc-dark-blue' to='/' exact>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }  
}

export default Navigation