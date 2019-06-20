import React, { Component } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'
import TestTable from '../Tables/hoverTable'


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
        .then( ({ data }) => {
            this.setState({
                tableData: data.employees,
                isLoading: false
            })
        })
        .catch(error => console.log(error))
    }

    /**
     * TODO: Comment this function!!!
     */
    renderTable() {
        if(this.state.isLoading === true) {
            return(<h4 className="text-muted">Loading data</h4>)
        }
        else if (this.state.tableData !== null) {
            return(<TestTable data={this.state.tableData} />)
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
                        <div className='flex-row'>
                            <ViewNavigation />
                        </div>
                        <div className='row justify-content-center'>
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
        employees {
            id
            first_name
            last_name
            email
            office {
                office
            }
        }
    }
`

export default Employee


