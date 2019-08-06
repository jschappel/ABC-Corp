import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const APIKEY = 'AIzaSyANT2sowTkLLApXkyZJ8qyY1yGImtcZOYw'

const mapStyles = {
  width: '298px',
  height: '198px',
  backgroundColor: 'lightBlue'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: this.props.lat,
         lng: this.props.lng
        }} >
        <Marker position={{ lat: this.props.lat, lng: this.props.lng}} />
      </Map>
    )
  }
}
// AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
export default GoogleApiWrapper({
  apiKey: APIKEY
})(MapContainer)

export { APIKEY }