import React, { Component, Fragment } from 'react'
import Loading from '../Utils/loading'
import DateFormat from '../Utils/formatter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataComponent, AddressComponent, withLeaseComponent, LeaseComponent } from './modalParts'
import '../../CSS/Components/hr.css'


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
            office_address1: null,
            office_address2: null,
            office_postal: null,
            office_city_name: null,
            office_country: null,
            office_district: null,
            office_phone_number: null,
            floor: null,
            room: null,
            vendor_name: null,
            vendor_phone_number: null,
        }

        // FontAwesome
        this.clipboard = <FontAwesomeIcon icon={'user'} size='sm' transform="right-4 down-2" />
        this.building = <FontAwesomeIcon icon={'building'} size='sm' transform="right-4 down-2" />
        this.shoppingCart = <FontAwesomeIcon icon={'shoppingCart'} size='sm' transform="right-4 down-2" />
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
            console.log(tableData)
            this.setState({
                isLoading: false,
                modal_title: tableData.model.model_name,
                model_number: tableData.model.model_number,
                serial_number: tableData.serial_number,
                warranty_end: tableData.warranty_end_date,
                lease_start: tableData.lease.lease_start,
                lease_end: tableData.lease.lease_end,
                office_name: tableData.room.office.office,
                office_address1: tableData.room.office.address.address1,
                office_address2: tableData.room.office.address.address2,
                office_postal: tableData.room.office.address.postal_code,
                office_city_name: tableData.room.office.address.city.city,
                office_country: tableData.room.office.address.city.country.country,
                office_district: tableData.room.office.address.district,
                office_phone_number: tableData.room.office.phone_number,
                floor: tableData.room.floor,
                room: tableData.room.room,
                vendor_name: tableData.vendor.name,
                vendor_phone_number: tableData.vendor.phone_number,
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
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header id='blue-modal-header'">
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
                phone_number
              }
              room {
                room
                floor
                office {
                  office
                  phone_number
                  address {
                    address1
                    address2
                    district
                    postal_code
                    city {
                      city
                      country {
                        country
                      }
                    }
                  }
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
    //withLeaseComponent(<LeaseComponent title='Lease Start:' formatString={false} body={new Date(data.lease_start)} />)
    return(
        <Fragment>
            <h5 className="d-inline-flex mt-2 font-weight-normal">Item Specifics  {<FontAwesomeIcon icon={'user'} size='sm' transform="right-4 down-2" />}</h5>
            <div className='row justify-content-center mt-3'>
                <div className='col-sm-5'>
                    <DataComponent title='Model Number:' body={data.model_number} />
                </div>
                <div className='col-sm-5'>
                    <DataComponent title='Serial Number:' body={data.serial_number} />
                </div>
            </div>
            <div className='row justify-content-center mt-3'>
                <div className='col-sm-5'>
                    <DataComponent title='Warranty End Date:' body={new DateFormat(data.warranty_end).toLongString()} />
                </div>
            </div>

            <h5 className="d-inline-flex mt-5 font-weight-normal">Location Information  {<FontAwesomeIcon icon={'building'} size='sm' transform="right-4 down-2" />}</h5>
            <div className='row justify-content-center align-items-end mt-3'>
                <div className='col-sm-5'>
                    <AddressComponent
                        title={data.office_name}
                        street={data.office_address1}
                        apt={data.office_address2}
                        city={data.office_city_name}
                        country={data.office_country}
                        state={data.office_district}
                        postalCode={data.office_postal}
                    />
                </div>
                <div className='col-sm-5'>
                    <div className='row justify-content-center align-items-end mt-3'>
                        <div className='col-sm-5'>
                            <DataComponent title='Room:' body={data.room} />
                        </div>
                        <div className='col-sm-5'>
                            <DataComponent title='Floor:' body={data.floor} />
                        </div>
                    </div>
                    <div className='row justify-content-center align-items-end mt-3'>
                        <div className='col-sm'>
                            <DataComponent title='Phone Number:' body={data.office_phone_number} />
                        </div>
                    </div>    
                </div>
            </div>

            <h5 className="d-inline-flex mt-5 font-weight-normal">Lease Information  {<FontAwesomeIcon icon={'shopping-cart'} size='sm' transform="right-4 down-2" />}</h5>
            <div className='row justify-content-center mt-3'>
                <div className='col-sm-5'>
                    <DataComponent title='Vendor Name:' body={data.vendor_name} />
                </div>
                <div className='col-sm-5'>
                    <DataComponent title='Phone Number:' body={data.vendor_phone_number} />
                </div>
            </div>
            <div className='row justify-content-center mt-3'>
                <div className='col-sm-5'>
                    {withLeaseComponent(<LeaseComponent title='Lease Start:' formatString={false} body={new Date(data.lease_start)} />)}
                </div>
                <div className='col-sm-5'>
                    <LeaseComponent title='Lease End:' formatString={true} body={new Date(data.lease_end)} />
                </div>
            </div>
            <div className='row justify-content-center mt-3'>
                <div className='col-sm-5'>
                    <DataComponent title='Warranty End Date:' body={new DateFormat(data.warranty_end).toLongString()} />
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