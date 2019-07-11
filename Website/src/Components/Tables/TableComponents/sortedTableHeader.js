import React, { Component } from 'react'


class sortedTableHeader extends Component {

    constructor(props){
        super(props)

        /** State Variables
         * - asc: determines to sort be asc or descending order
         */
        this.state = {
            asc: true
        }

        // binding function below
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * handleClick: Handles the onClick functionality for a sortedTableRow. This function then calls the parent sort
     *      function passed down through props.
     */
    handleClick(){
        // Handle sorting here
        this.setState({ asc: !this.state.asc})
        this.props.onClick(this.props.name, !this.state.asc)
    }

    render() {
        return(
            <th scope='col' className={this.props.className} onClick={() => this.handleClick()}>{this.props.title}</th>
        )
    }
}

export default sortedTableHeader