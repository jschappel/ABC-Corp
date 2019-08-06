import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class sortedTableHeader extends Component {

    constructor(props){
        super(props)

        /** State Variables
         * - asc: determines to sort be asc or descending order
         */
        this.state = {
            asc: true
        }

        //FontAwesome Icons
        this.bothArrow = <FontAwesomeIcon icon={'sort'} />

        // binding function below
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * handleClick: Handles the onClick functionality for a sortedTableRow. Once the data is sorted it is
     *      sent to the parent component via a handler.
     */
    handleClick(){
        this.setState({ asc: !this.state.asc})
        const newData = this.props.data.sort(this.compareObjects(this.props.name, !this.state.asc ? 'acs' : 'desc'))
        this.props.handler(newData)
    }

    /**
     * compareObjects: Compares objects by a specified key for sorting.
     * @param {Sting} key the Object key to sort by
     * @param {Sting} order 'acs' to sort by ascending, 'desc' to sort by descending
     * @returns{Integer} -1 if second element goes before first, 1 if first element goes before second, 0
     *      if both elements are the same.
     */
    compareObjects(
        key, order) {
        return function(a, b) {
            // Both objects do not have the same key so exit
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0
            // see if they are strings, if so then convert to uppercase for comparison
            const newA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
            const newB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

            // compare the values
            let comparison = 0
            if (newA > newB) comparison = 1
            else if( newA < newB) comparison = -1

            return(order === 'desc' ? (comparison * -1) : comparison)
        }
    }

    render() {
        return(
            <th scope='col' className={this.props.className}>
            <i className='mr-1' style={{cursor:'pointer'}} onClick={() => this.handleClick()}>{this.bothArrow}</i>
            {this.props.title}</th>
        )
    }
}

export default sortedTableHeader