import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class employeeToolBar extends Component {

    constructor() {
        super()

        //FontAwesome Icons
        this.checkIcon = <FontAwesomeIcon icon={'user-plus'} />
        this.trashIcon = <FontAwesomeIcon icon={'trash-alt'} />
    }

    render() {
        const fakeLink = '#'
        return(
            <div className = 'row'>
                <form className='form-inline'>
                    <div className='form-group mx-sm-3 mb-2'>
                    <input type="search" className="form-control" placeholder="Search"/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Search</button>
                    <a className='mt-auto mb-2 ml-1' href={fakeLink} style={{fontSize:"10px"}}>Adv. Search</a>
                </form>
                <div className='ml-auto mr-3'>
                <button type="submit" className="btn btn-primary mx-sm-3 mb-2">Create
                    <span className="ml-1" aria-hidden="true">{this.checkIcon}</span>
                </button>
                <button type="submit" className="btn btn-primary mb-2">Delete
                    <span className="ml-1" aria-hidden="true">{this.trashIcon}</span>
                </button>
                </div>
            </div>
        )
    }
}

export default employeeToolBar