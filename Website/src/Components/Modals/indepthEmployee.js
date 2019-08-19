import React, { Component, Fragment } from 'react'
import LoadingImage from '../Utils/loading'
import { withAuthorization } from '../Authorization/authorization'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapContainer from '../Utils/map'
import { APIKEY } from '../Utils/map'
import '../../CSS/Components/hr.css'
import { phoneNumberFormatter } from '../Utils/helpers'
import { DataComponent, AddressComponent } from './modalParts'


class inDepthEmployee extends Component {

    constructor(props) {
        super(props)

        /** State Variables
         * - isLoading: {Boolean} true if loading, otherwise false
         * - data: {Object} the data from db the fetch request
         * - geoLocation: {Array} An aray of address coordinates [lat, lng]. Initally set to null
         * - editMode: {Boolean} true if the edit html should be rendered, false if the display html should be rendered.
         */
        this.state = {
            isLoading: true,
            data: null,
            geoLocation: null,
            editMode: false,
        }

        //FontAwesome Icons
        this.userIcon = <FontAwesomeIcon icon={'user'} />
        this.editIcon = <FontAwesomeIcon icon={'edit'} />
    }

    componentDidMount() {
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataFetch(this.props.epId)
        })
        .then(results => results.json())
        .then( ({data}) => {
            this.setState({
              data: data.employee
            })

            // Variables for Geolocation api request
            const apiAddress = data.employee.address.address1.replace(" ", '"+"')
            const apiCity = data.employee.address.city.city
            const apiState = data.employee.address.district
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${apiAddress}+${apiCity}+${apiState}&key=${APIKEY}`)
        })
        .then(result => result.json())
        .then( ({results}) => {
          const loc = results[0].geometry.location
          this.setState({
            geoLocation: [loc.lat, loc.lng],
            isLoading: false
          })
        })
        .catch(error => {
          this.setState({isLoading: false})
          console.log('There was an error fetching the modal data', error)
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
                        <div className="modal-header" id='blue-modal-header'>
                            <h4 className="modal-title" id="exampleModalLabel">In-Depth View</h4>
                            <button type="button" className="close" onClick={() => this.props.toggleModal()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <ModalBody loading={this.state.isLoading} data={this.state.data} geoLoc={this.state.geoLocation} roles={this.props.roles} edit={() => console.log('Time to edit')}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * modalBody: The body for the modal 
 * @param {Object} props The props to pass to the component
 */
const modalBody = ( props ) => {
  const data = props.data
  const location = props.geoLoc

  // Render the edit button only if the permissions are correct
  const EditButton = withAuthorization(editButton) 
  return(
      <Fragment>
          <h5 className="d-inline-flex mt-2 font-weight-normal">Personal Information{<FontAwesomeIcon icon={'user'} size='sm' transform="right-4 down-2" />}</h5>
          <div className='row justify-content-center mt-3'>
            <div className='col-sm-5'>
              <DataComponent title='First Name:' body={data.first_name} />
            </div>
            <div className='col-sm-5'>
              <DataComponent title='Last Name:' body={data.last_name} />
            </div>
          </div>
          <div className='row justify-content-center mt-3'>
            <div className='col-sm-5'>
              <DataComponent title='Email:' body={data.email} />
            </div>
            <div className='col-sm-5'>
              <DataComponent title='Phone Number:' body={ phoneNumberFormatter(data.phone_number) } />
            </div>
          </div>
          <div className='row justify-content-center mt-3'>
            <div className='col-sm-5'>
              <DataComponent title='Work Phone:' body={phoneNumberFormatter(data.work_phone_number)} />
            </div>
          </div>

          <h5 className="d-inline-flex mt-4 font-weight-normal">Location Information  {<FontAwesomeIcon icon={'home'} size='sm' transform="right-4 down-2" />}</h5>
          <div className='row justify-content-center align-items-center mt-3'>
            <div className='col-sm-5'>
              <AddressComponent
                title='Home Address'
                street={data.address.address1}
                apt={data.address.address2}
                city={data.address.city.city}
                country={data.address.city.country.country}
                state={data.address.district}
                postalCode={data.address.postal_code}
              />
            </div>
            <div className='col-sm-5'>
              <div className='row' style={{ width:'300px', height:'200px', border:'1px solid black'}}>
                <GoogleMapContainer
                  lng={location[1]}
                  lat={location[0]} />
              </div>
            </div>
          </div>
          <h5 className="d-inline-flex mt-4 font-weight-normal">Office Information  {<FontAwesomeIcon icon={'building'} size='sm' transform="right-4 down-2" />}</h5>
          <div className='row justify-content-center align-items-end mt-3'>
            <div className='col-sm-5'>
            <AddressComponent
                title={data.office.office}
                street={data.office.address.address1}
                apt={data.office.address.address2}
                city={data.office.address.city.city}
                country={data.office.address.city.country.country}
                state={data.office.address.district}
                postalCode={data.office.address.postal_code}
              />
            </div>
            <div className='col-sm-5'>
              <DataComponent title='Office Phone:' body={phoneNumberFormatter(data.office.phone_number)} />
            </div>
          </div>
          <div className='row ml-3 mt-5'> 
            <EditButton roles={props.roles} reqArray={['update']} onClick={props.edit}/>
          </div>
      </Fragment>
  )
}

/**
 * editButton: Stateless component that renders the edit button
 */
const editButton = (props) => {
  return(
    <Fragment>
      <button type="edit" className="btn btn-abc-dark-blue mb-2" onClick={props.onClick}>Edit
        <span className="ml-1" aria-hidden="true">{<FontAwesomeIcon icon={'edit'} />}</span>
      </button>
    </Fragment>
  )
}

const dataFetch = (id) => {
    return JSON.stringify({
        query : `query {
            employee(id: ${id}) {
              first_name
              last_name
              email
              phone_number
              work_phone_number
              address {
                address1
                address2
                postal_code
                district
                city {
                  city
                  country {
                    country
                  }
                }
              }
              office {
                office
                phone_number
                address {
                  address1
                  address2
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
          }`
    })
}

/**
 * withLoadingModal: Renders a loading screen if needed
 * @param {Component} Component The component to apply the function to
 */
const withLoadingModal = (Component) => (props) => {
  return props.loading ? <LoadingImage /> : <Component {...props} />
}

/**
 * wihtNullDataModal: Renderes an error screen if there was an error connecting to the server
 */
const withNullDataModal = (Component) => (props) => {
  return props.loading === false && props.data === null ?<h1 classname='display-4'>Error Connecting to Server</h1> : <Component {...props} />
}

/**
 * ModalBody: renders the modal body to have a loading screen or the content
 */
const ModalBody = withNullDataModal(withLoadingModal(modalBody))

export default inDepthEmployee