import React, { Component } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'
import TestTable from '../Tables/employes'
import ControlBar from '../Toolbars/controlBar'


class Employee extends Component {

    constructor(props){
        super(props)

        /** State variables
         * 
         */
        this.state = {
            tableData: null,
            isLoading: true,
        }

        this.userId = this.props.rest
    }

    componentDidMount() {
        fetch('/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })
        .then( response => response.json())
        .then( async ({ data }) => {
            // Flatten the incoming data
            const newData = await data.activeEmployees.map((obj) =>{
                return this.flattenObject(obj)
            })
            this.setState({
                tableData: newData,
                isLoading: false
            })
        })
        .catch(error => {
            this.setState({isLoading: false})
            console.log(error)
        })
    }

    /** FlattenObject: Flattens a multidimensional object
     * EX: flattenObject({ a: 1, b: { c: 2 } })
     * Returns: { a: 1, c: 2}
     * @param {Object} obj the object to flatten
     * @return {Object} The flattened object
     */
    flattenObject = (obj) => {
        const flattened = {}
      
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(flattened, this.flattenObject(obj[key]))
          } else {
            flattened[key] = obj[key]
          }
        })
        return flattened
    }

    /**
     * TODO: Comment this function!!!
     */
    renderTable() {
        if(this.state.isLoading === true) {
            return(<h4 className="text-muted">Loading data</h4>)
        }
        else if (this.state.tableData !== null) {
            return(<TestTable data={this.state.tableData} roles={this.props.rest.roles} />)
        }
        else {
            return(<h4 className="text-muted">Oh no! No data was found.</h4>)
        }
    }

    render(){
        return (
            <div>
                <Navigation />
                <div className="view-container">
                    <div className='container-fluid' id='home-container'>
                        <div className='flex-row pt-1'>
                            <ViewNavigation roles={this.props.rest.roles} />
                        </div>
                        <div className='flex-row mt-3'>
                            <ControlBar permissions={this.props.rest.roles} />
                        </div>
                        <div className='row justify-content-center mt-3'>
                            {this.renderTable()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }  
}

const query = `
query {
    activeEmployees {
        id
        first_name
        last_name
        phone_number
        email
        office {
            office
        }
    }
}
`

export default Employee


