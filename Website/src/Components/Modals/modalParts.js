import React from 'react'


/**
 * DataComponent: A component to display form data
 * @param {title, body} props 
 */
export const DataComponent = (props) => {
    return(
      <div className='row'>
        <dt className="d-flex text-muted font-weight-normal">{props.title}</dt>
        <dd className="d-flex text-center font-weight-normal ml-5" >{props.body}</dd>
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