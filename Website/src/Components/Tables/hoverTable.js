import React, { Component } from 'react'
import CheckedRow from './TableRows/checkedRow'
class HoverTable extends Component {



    render() {
        console.log(this.props.data)
        return(
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col" className='text-center'>First Name</th>
                        <th scope="col" className='text-center'>Last Name</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Office</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       this.props.data.map( (obj, i) => {
                           return (<CheckedRow key={i} data={obj} />)
                       })
                   }
                </tbody>
            </table>
        )
    }
}

export default HoverTable