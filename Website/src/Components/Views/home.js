import React, { Component } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'
import '../../CSS/container.css'
import Loading from '../Utils/loading'
import EquipmentTable from '../Tables/home_Equipment'
import WelcomeMessage from '../Other/welcome'


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
            equipmentArray: null,

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
            if(!data.me.employee){
                this.setState({isLoading: false})
                return
            }
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
        .catch(error =>  {
            this.setState({isLoaded: false})
            console.log('Error fetching the data', error)})
    }

    /**
     * isLoaded: determines what components should be rendered based on if the fetch is complete.
     */
    isLoaded() {

        if(this.state.isLoading){
            return (
                <div id='loader-position'>
                    <Loading />
                </div>
            )
        }
        else {
            return(
                <div className='row justify-content-center mt-3 pr-1'>
                    <WelcomeMessage firstName={this.state.firstName}/>
                    <EquipmentTable
                        data={this.state.equipmentArray}
                    />
                </div>
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
                            <ViewNavigation roles={this.props.rest.roles} active={"home"} />
                        </div>
                            {this.isLoaded()}
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


export default Home