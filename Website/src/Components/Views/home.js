import React, { Component, Fragment } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'
import '../../CSS/container.css'
import Loading from '../Utils/loading'
import Equipment from '../Tables/employeeEquipment'


class Home extends Component {

    constructor(props){
        super(props)
        
        /** State Variables
         * - isLoading: boolean value to determine if the view is loading. Initially set to true
         * - firstName: logged in users first name.
         * - equipmentArray: An array containing the logged in users equipment data that will be displayed in
         *      the equipment table
         */
        this.state = {
            isLoading: true,
            firstName: null,
            equipmentArray: [],

        }

        this.userInfo = this.props.rest
    }
    

    /**
     * Fetches the data for the homepage from the database.
     */
    componentDidMount() {
        fetch('/graphql', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.userInfo.token
            },
            body: userQuery
        })
        .then( response => response.json())
        .then( ({data}) => {
            const employee = data.me.employee
            // extract the data
            const equipment = employee.equipment.map( item => {
                const isLeased = item.lease ? 'Leased' : 'Owned'
                return {id: item.id, model: item.model.model_name, category: item.model.category.category, serial_number: item.serial_number, leased: isLeased}
            })
            this.setState({
                firstName: employee.first_name,
                equipmentArray: equipment,
                isLoading: false
            })
        })
        .catch(error => console.log('Error fetching the data', error))
    }

    /**
     * isLoaded: determines what components should be rendered based on if the fetch is complete.
     */
    isLoaded() {
        if(this.state.isLoading){
            return (<Loading />)
        }
        else {
            return(
                <Fragment>
                    <WelcomeMessage firstName={this.state.firstName}/>
                    <Equipment
                        data={this.state.equipmentArray}
                    />
                </Fragment>
            )
        }
    }

    render(){
        return (
            <div>
                <Navigation />
                <div className="view-container">
                    <div className='container-fluid' id='home-container'>
                        <div className='flex-row pt-1'>
                            <ViewNavigation active={"home"} />
                        </div>
                        <div className='row justify-content-center mt-3 pr-1'>
                            {this.isLoaded()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Query to get users equipment data
const userQuery =  JSON.stringify({
    query: `query {
        me {
          employee {
            first_name
            equipment {
              id
              serial_number
              model {
                model_name
                category {
                  category
                }
              }
              lease {
                lease_end
              }
            }
          }
        }
      }`
})

/**
 * WelcomeMessage: Stateless component that displays the first and last name of a user
 * @param {React Props} props Props containing 'firstName' and 'lastName'.
 */
const WelcomeMessage = (props) => {
    return(
        <h1 style={{color:'#282c34'}}>Welcome {props.firstName} {props.lastName}</h1>
    )
}

export default Home