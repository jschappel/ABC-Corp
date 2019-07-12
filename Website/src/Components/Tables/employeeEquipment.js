import React, { Component } from 'react'
import DefaultRow from './TableComponents/defaultRow'
import SortHeader from './TableComponents/sortedTableHeader'

class EquipmentTable extends Component{

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data.sort(this.compare('model', 'acs'))
        }

        this.sortTable = this.sortTable.bind(this)
    }

    /**
     * sortTable: Sorts a table (ASC or DESC) by a specified column.
     * @param {String} id The object id to sort by
     * @param {Boolean} boolean true if sort ASC, false if sort DESC
     * @returns {Array} an array containing the sorted Objects by the specified id.
     */
    async sortTable(compareKey, boolean){
        const result = await this.state.data.sort(this.compare(compareKey, boolean ? 'asc' : 'desc'))
        this.setState({
            data: result
        })
    }

    /**
     * compare: Compares objects by a specified key for sorting.
     * @param {Sting} key the Object key to sort by
     * @param {Sting} order 'acs' to sort by ascending, 'desc' to sort by descending
     * @returns{Integer} -1 if second element goes before first, 1 if first element goes before second, 0
     *      if both elements are the same.
     */
    compare(key, order) {
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
            <div className="container mt-3">
                <h5>Lent Equipment</h5>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <SortHeader className='text-center arrow-up' name='model' onClick={this.sortTable} title='Item Name'/>
                        <SortHeader className='text-center arrow-up' name='category' onClick={this.sortTable} title='Category'/>
                        <SortHeader className='text-center arrow-up' name='serial_number' onClick={this.sortTable} title='Serial Number'/>
                        <SortHeader className='text-center arrow-up' name='leased' onClick={this.sortTable} title='Status'/>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map( item => {
                            return (<DefaultRow key={item.id} data={item} />)
                        })
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

export default EquipmentTable