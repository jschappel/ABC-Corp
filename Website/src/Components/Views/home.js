import React, { Component } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'
import '../../CSS/container.css'


class Home extends Component {

    constructor(props){
        super(props)
        
        /** State Variables
         * - isLoading: boolean value to determine if the view is loading. Initially set to true
         * - firstName: logged in users first name.
         * - lastName: logged in users last name.
         */
        this.state = {
            isLoading: true,
            firstName: null,
            lastName: null,

        }

        this.userInfo = this.props.rest
    }


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
            console.log(employee)
        })
        .catch(error => console.log('Error fetching the data', error))
    }


    render(){
        return (
            <div>
                <Navigation />
                <div className="view-container">
                    <div className='container-fluid' id='home-container'>
                        <div className='flex-row'>
                            <ViewNavigation active={"home"} />
                        </div>
                        <div className='row justify-content-center'>
                            <p>Hello World!</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const userQuery =  JSON.stringify({
    query: `query {
        me {
          employee {
            first_name
            last_name
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