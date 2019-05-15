import React, { Component } from 'react'
import Navigation from '../Components/navigation'


class Employee extends Component {

    constructor(props){
        super(props)

        this.userId = this.props.rest
    }

    render(){
        console.log(this.userId)
        return (
            <div>
                <Navigation />
                <p>This is the employee page</p>
            </div>
        )
    }  
}
export default Employee