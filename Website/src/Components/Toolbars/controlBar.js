import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ControlBar extends Component {

    constructor() {
        super()

        //FontAwesome Icons
        this.checkIcon = <FontAwesomeIcon icon={'user-plus'} />
        this.trashIcon = <FontAwesomeIcon icon={'trash-alt'} />
    }

    renderButtons(per) {
        if(per.create && per.delete) {
            return(
                <Fragment>
                    <button type="submit" className="btn btn-success mx-sm-3 mb-2">Create
                        <span className="ml-1" aria-hidden="true">{this.checkIcon}</span>
                    </button>
                    <button type="submit" className="btn btn-danger mb-2">Delete
                        <span className="ml-1" aria-hidden="true">{this.trashIcon}</span>
                    </button>
                </Fragment>
            )
        }
        else if (per.create && per.delete === false) {
            return(
                <button type="submit" className="btn btn-success mx-sm-3 mb-2">Create
                    <span className="ml-1" aria-hidden="true">{this.checkIcon}</span>
                </button>
            )
        }
        else if(per.create === false && per.delete) {
            return(
                <button type="submit" className="btn btn-danger mb-2">Delete
                    <span className="ml-1" aria-hidden="true">{this.trashIcon}</span>
                </button>
            )
        } else {
            return null
        }
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
                    <a className='mt-auto mb-2 ml-2' href={fakeLink} style={{fontSize:"10px"}}>Adv. Search</a>
                </form>
                <div className='ml-auto mr-3'>
                    {this.renderButtons(this.props.permissions)}
                </div>
            </div>
        )
    }
}

export default ControlBar