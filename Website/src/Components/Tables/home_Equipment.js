import React, { Component } from 'react'
import DefaultRow from './TableComponents/defaultRow'
import SortHeader from './TableComponents/sortedTableHeader'
import EquipmentModal from '../Modals/homeEquipment'

class EquipmentTable extends Component{

    constructor(props) {
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
        console.log(event.currentTarget.id)
        this.setState({
            showModal: true,
            modalId: event.currentTarget.id,
        })
    }

    renderModal() {
        return (
            <EquipmentModal 
                eqId={this.state.modalId} 
                showModal={true}
                toggleModal={() => this.setState({showModal: !this.state.showModal})}
            />
        )
    }

    
    render() {
        return(
            <div className="container mt-3">
                <h5>Lent Equipment</h5>
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <SortHeader 
                            className='text-center arrow-up'
                            name='model'
                            handler={this.sortHandler}
                            title='Item Name'
                            data={this.state.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='category'
                            handler={this.sortHandler}
                            title='Category'
                            data={this.state.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='serial_number'
                            handler={this.sortHandler} 
                            title='Serial Number'
                            data = {this.state.data}
                            />
                        <SortHeader
                            className='text-center arrow-up'
                            name='leased'
                            handler={this.sortHandler}
                            title='Status'
                            data = {this.state.data}
                            />
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map( item => {
                            return (<DefaultRow key={item.id} id={item.id} data={item} onClick={this.handleClick}/>)
                        })
                    }
                </tbody>
            </table>
                <div className={`container ${this.state.showModal ? 'modal-open' :''}`}>
                    {
                        this.state.showModal ? this.renderModal() : null
                    }
                </div>
            </div>
        )
    }
}


/**
 * withNullData: Given a table will render the table if there is data otherwise will render a message
 * @param {Component} Component The component that you wish to apply the function to
 */
const withNullData = (Component) => (props) =>{
    return props.data ? <Component {...props} /> : <p>No Employees Exist!</p>
}

export default withNullData(EquipmentTable)