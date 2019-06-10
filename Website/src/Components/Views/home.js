import React, { Component } from 'react'
import Navigation from '../Navbars/navigation'


class Home extends Component {

    constructor(props){
        super(props)


        this.userInfo = this.props.rest
    }


    render(){
        console.log(this.userInfo)

        return (
            <div>
                <Navigation />
                <p>This is the home page</p>
            </div>
        )
    }    
}
export default Home