import React, { Component, Fragment } from 'react'
import CheckedRow from './TableComponents/checkedRow'
import '../../CSS/Components/table_headers.css'
import SortHeader from './TableComponents/sortedTableHeader'
import EmployeeModal from '../Modals/indepthEmployee'


class EmployeeTable extends Component {

    constructor(props){
        super(props)

        /** State Variables
         * - data: Object Array: The data to be show in the table
         * - showModal: boolean value that determines if a modal should be rendered or not. True if a modal should ber
         *      rendered. Initially set to false.
         * - modalId: integer that represents the equipment id the modal should fetch data from
         */
        this.state = {
            data: this.props.data,
            showModal: false,
            modalId: null,
        }

        // Bind necessary functions below:
        this.sortHandler = this.sortHandler.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    /**
     * sortHandler: Sets the state of this component to the sorted data coming from the <SortHeader>
     *      component.
     * @param {Array} data An array of sorted objects
     */
    sortHandler(data){
        this.setState({data})
    }

    handleClick(event){
        this.setState({
            showModal: true,
            modalId: event.currentTarget.id,
        })
    }

    renderModal() {
        return (
            <EmployeeModal 
                epId={this.state.modalId} 
                showModal={true}
                roles={this.props.roles}
                toggleModal={() => this.setState({showModal: !this.state.showModal})}
            />
        )
    }

    render() {
        return(
            <Fragment>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className='text-center'></th>
                        <SortHeader 
                            className='text-center arrow-up'
                            name='first_name'
                            handler={this.sortHandler}
                            title='First Name'
                            data={this.props.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='last_name'
                            handler={this.sortHandler}
                            title='Last Name'
                            data={this.props.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='email'
                            handler={this.sortHandler} 
                            title='Email'
                            data = {this.props.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='phone_number'
                            handler={this.sortHandler}
                            title='Phone Number'
                            data = {this.props.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='office'
                            handler={this.sortHandler}
                            title='Office'
                            data = {this.props.data}
                            />
                    </tr>
                </thead>
                <tbody>
                   {
                       this.props.data.map( (obj) => {
                           return (<CheckedRow key={obj.id} id={obj.id} data={obj} onClick={this.handleClick} />)
                       })
                   }
                </tbody>
            </table>
            <div className={`container ${this.state.showModal ? 'modal-open' :''}`}>
                {
                    this.state.showModal ? this.renderModal() : null
                }
            </div>
            </Fragment>
        )
    }
}
/**
 * withNullData: Given a table will render the table if there is data otherwise will render a message
 * @param {Component} Component The component that you wish to apply the function to
 */
const withNullData = (Component) => (props) =>{
    return props.data ? <Component {...props} /> : <p>Sorry you do not own any equipment yet</p>
}

export default withNullData(EmployeeTable)