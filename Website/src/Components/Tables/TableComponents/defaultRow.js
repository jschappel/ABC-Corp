import React, { Component } from 'react'

class CheckedRow extends Component {

    /**
     * rowCreate: Creates a row cell with the given data.
     * @param {Object} rowObject an object containing the data to be displayed in the row cell
     * @returns {<td>} containing the row objects value
     * @returns {Array of <td>} The array contains <td>'s with the input data properly formatted.
     */
    rowCreate(dataObject) {
        return Object.keys(dataObject).map( (key, i) => {
            if(key !== 'id'){
                return ( <td key={i} className='text-center'>{dataObject[key]}</td> )
            }
            return null
        })
    }

    render() {
        return(
            <tr>
                {
                    this.rowCreate(this.props.data)
                }
            </tr>
        )
    }
}

export default CheckedRow