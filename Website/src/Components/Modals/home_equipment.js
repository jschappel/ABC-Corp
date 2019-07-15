import React, { Component, Fragment } from 'react'
import Loading from '../Utils/loading'

class EquipmentModal extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            isLoading: true,
            model_title: null,
            model_number: null,
            serial_number: null,
            warranty_end: null,
            lease_start: null,
            lease_end: null,
            office_name: null,
            floor: null,
            room: null,
            vendor_name: null,
        }
    }

    /**
     * componentDidMount: Fetches the necessary data from the API so that the table can be rendered
     */
    componentDidMount(){
        fetch('/graphql',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: equipmentFetch(this.props.eqId),
        })
        .then( results => results.json())
        .then( ({data}) => {
            const tableData = data.equipmentSingle
            this.setState({
                isLoading: false,
                modal_title: tableData.model.model_name,
                model_number: tableData.model.model_number,
                serial_number: tableData.serial_number,
                warranty_end: tableData.warranty_end_date,
                lease_start: tableData.lease.lease_start,
                lease_end: tableData.lease.lease_end,
                office_name: tableData.room.office.office,
                floor: tableData.room.floor,
                room: tableData.room.room,
                vendor_name: tableData.vendor.name,
            })
        })
    }

    render() {
        return(
            <div 
             className={`modal ${this.props.showModal ? 'show' : ''}`} 
                style={{display: `${this.props.showModal ? 'block' : 'none'}`, backgroundColor: 'rgb(0,0,0,.8)'}}
                tabIndex="-1" 
                role="dialog" 
                aria-label="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">{this.state.modal_title}</h4>
                            <button type="button" className="close" onClick={() => this.props.toggleModal()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ModalBody data={this.state} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * equipmentFetch: Fetches data about a piece of equipment from the GraphQL API
 * @param {String} id The id of the piece of equipment that you wish to query from the database
 * @return {String} A string containing the JSON object
 */
const equipmentFetch = (id) => {
    return JSON.stringify({
        query : `query{
            equipmentSingle(id: ${id}){
              serial_number
              active
              warranty_end_date
              lease{
                lease_start
                lease_end
              }
              model{
                model_name
                model_number
              }
              vendor {
                name
              }
              room {
                room
                floor
                office {
                  office
                }
              }
            }
          }`
    })
}

/**
 * modalBody: The body for the modal 
 * @param {Object} props The props to pass to the component
 */
const modalBody = ({data}) => {
    console.log(data)
    return(
        <Fragment>
            <h5>Item Specifics</h5>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Model Number: <strong>{data.model_number}</strong></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Serial Number: <strong>{data.serial_number}</strong></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Warranty End Data: <strong>{data.warranty_end}</strong></p>
                </div>
            </div>

            <h6>Location Information</h6>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Office Name: <strong>{data.office_name}</strong></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-3'>
                    <p>-  Floor: <strong>{data.floor}</strong></p>
                </div>
                <div className='col-sm-3'>
                    <p>- Room: <strong>{data.room}</strong></p>
                </div>
            </div>

            <h6>Lease Information</h6>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Leased From: <strong>{data.vendor_name}</strong></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Lease Start Date: <strong>{data.lease_start}</strong></p>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <p>-  Lease End Date: <strong>{data.lease_end}</strong></p>
                </div>
            </div>    
        </Fragment>
    )
}

/**
 * withLoadingModal: Renders a loading screen if needed
 * @param {Component} Component The component to apply the function to
 */
const withLoadingModal = (Component) => (props) => {
    return props.data.isLoading ? <Loading /> : <Component {...props} />
}

const ModalBody = withLoadingModal(modalBody)


export default EquipmentModal