import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import sectionMarkers from './sectionMarkers'
import RubberDuck from '../images/RubberDuck.png'
import CARTLogo from '../images/CARTLogo.png'

// import saveToMyMarkers from './App'
// import Pin from './Pin'


class MyMap extends React.Component {

  render() {
    let displayedSectionMarkers = sectionMarkers.map(sectionMarker => {
      return (<Marker
      key={sectionMarker.lat}
      position={sectionMarker}
      options={
        {icon: CARTLogo,
         scaledSize: { width: 20, height: 20 }
        }
      }
      />)
    })

    let mySavedMarkers = this.props.myMarkers.map(marker => {
      console.log(marker);
      return (<Marker
        key={marker.id}
        position={marker}
        options={
          {icon: RubberDuck,
           scaledSize: { width: 20, height: 20 }
          }
        }
      />)
      })

    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 51.615831, lng: -0.330991 }}
        onRightClick={(e) => this.props.saveToMyMarkers(e)}>

        {mySavedMarkers}
        {displayedSectionMarkers}

      </GoogleMap>
    )
  }
}


const Map = compose(
  withProps({
    googleMapURL: process.env.REACT_APP_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `900px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMap)

export default Map
