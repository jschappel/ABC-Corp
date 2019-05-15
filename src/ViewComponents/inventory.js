import React, { Component } from 'react'
import Navigation from '../Components/navigation'


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
                <p>This is the Inventory page</p>
            </div>
        )
    }
}
export default Inventory