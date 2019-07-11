import React, { Component } from 'react'
import DefaultRow from './TableComponents/defaultRow'
import SortHeader from './TableComponents/sortedTableHeader'

class EquipmentTable extends Component{

    /**
     * sortTable: Sorts a table (ASC or DESC) by a specified column.
     * @param {String} id The object id to sort by
     * @param {Boolean} boolean true if sort ASC, false if sort DESC
     * @returns {Array} an array containing the sorted Objects by the specified id.
     */
    sortTable(id, boolean){
        console.log(`sorting table by ${id} ${boolean ? 'ASC' : 'DESC'}`)
    }

    render() {
        console.log(this.props.data)
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