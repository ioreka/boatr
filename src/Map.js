import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import Pin from './Pin'


class MyMap extends React.Component {
  state = {
    myMarkers: []
  }

  handleClick = (event) => {
    this.setState({
      myMarkers:[...this.state.myMarkers, { lat: event.latLng.lat(), lng: event.latLng.lng() }]
    })
    console.log("my markers, in state:",this.state.myMarkers);
  }

  render() {
    let myPins = this.state.myMarkers.map(marker => {
      return (<Marker
        key={marker.lat}
        position={marker}
      />)
      })
      console.log("myPins, the variable:", myPins);
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 51.52089, lng: -0.08649 }}
        onRightClick={(e) => this.handleClick(e)}>

        {myPins}

      </GoogleMap>
    )
  }
}


const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9QQqawxTt2ouxuf917rLOqz-5RLn0W5A&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `900px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMap)

export default Map
