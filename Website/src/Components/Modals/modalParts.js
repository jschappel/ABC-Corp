import React from 'react'
import DateFormatter from '../Utils/formatter'

/**
 * DataComponent: A component to display form data
 * @param {title, body} props 
 */
export const DataComponent = (props) => {
    return(
      <div className='row justify-content-center'>
        <dt className="d-flex text-muted font-weight-normal">{props.title}</dt>
        <dd className="d-flex text-center font-weight-normal ml-3">{props.body}</dd>
        <div className='custom-line' />
      </div>
    )
  }
  
  /**
   * AddressComponent: A stateless component that creates the address view
   */
  export const AddressComponent = (props) => {
    const streetAddress = props.apt !== null ? `${props.street}, ${props.apt}` : `${props.street}`
    return(
      <div className='flex-row'>
        <address>
          <strong>{props.title}</strong> <br/>
          {streetAddress} <br/>
          {props.city}, {props.state} {props.postalCode} <br/>
        </address>
        <div className='custom-line' />
      </div>
    )
}

/**
 * LeaseComponent: A component to display form data
 * @param {title, body, formatString} props where body is a {Javascript UTC Date Object}
 */
const LeaseComponent = (props) => {
  const expired =  Date.now() < props.body ? false : true
  return(
    <div className='row justify-content-center'>
        <dt className="d-flex text-muted font-weight-normal">{props.title}</dt>
        {
          props.formatString ? 
            <dd className="d-flex text-center font-weight-normal ml-3" style={expired ? {color:"red"} : {color:"green"}}>{new DateFormatter(props.body).toLongString()}</dd>
            :
            <dd className="d-flex text-center font-weight-normal ml-3">{new DateFormatter(props.body).toLongString()}</dd>
        }
        <div className='custom-line' />
      </div>
  )
}


/**
 * A HOC for a Lease Component to check if the lease exists
 * @param {LeaseComponent} Component 
 */
const withLeaseComponent = (Component) => (props) => {
  if (props.body === null) {
    return(
      <div className='row justify-content-center'>
        <dt className="d-flex text-muted font-weight-normal">{props.title}</dt>
        <dd className="d-flex text-center font-weight-normal ml-3">Not Applicable</dd>
        <div className='custom-line' />
      </div>
    )
  } else {
    return (<Component {...props}/>)
  }
}

export const LeaseDisplay = withLeaseComponent(LeaseComponent)