import React, { Component } from 'react'

class CheckedRow extends Component {

    constructor(props) {
        super(props)

        /** State Variables
         * active: Determines if a table row should show the table-active effect. 
         */
        this.state = {
            active: false
        }

        // Bind functions below
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * handleClick: Handles the onClick for a tableRow. Will set the rows active state to the opposite
     * of what it currently is.
     */
    handleClick() {
        this.setState({active: !this.state.active})
    }

    /**
     * rowCreate: Creates a row cell with the given object.
     * @param {Object} rowObject an object containing the data to be displayed in the row cell
     * @returns {<td>} containing the row objects value
     */
    rowCreate(rowObject) {
        return Object.keys(rowObject).map( key => {
            if(key === 'id') return null
            if(rowObject[key] instanceof Object) {
                return Object.keys(rowObject[key]).map( innerKey => {
                    return(<td key={innerKey} className='text-center'>{rowObject[key][innerKey]}</td>)
                })
            }
            else {
                return(<td key={key} className='text-center'>{rowObject[key]}</td>)
            }
        })
    }


    render() {
        return(
            <tr className={this.state.active ? "table-active" : ""} id={this.props.data.id} onClick={ (event) => this.props.onClick(event) }>
                <td>
                    <input className="position-static" type="checkbox"/>
                </td>
                {
                    this.rowCreate(this.props.data)
                }
            </tr>
        )
    }
}

export default CheckedRow