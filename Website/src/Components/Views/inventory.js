import React, { Component } from 'react'
import Navigation from '../Navbars/account_navigation'
import ViewNavigation from '../Navbars/view_navigation'


class Inventory extends Component {

    constructor(props){
        super(props)

        this.userInfo = this.props.rest
    }


    render() {
        console.log(this.userInfo)
        return (
            <div>
            <Navigation />
            <div className="view-container">
                <div className='container-fluid' id='home-container'>
                    <div className='flex-row pt-1'>
                        <ViewNavigation roles={this.props.rest.roles}/>
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
export default Inventory