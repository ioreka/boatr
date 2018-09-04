import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import sectionMarkers from './sectionMarkers'
import RubberDuck from '../images/RubberDuck.png'
import CARTLogo from '../images/CARTLogo.png'
// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'


class MyMap extends React.Component {

  getMarkerId(e) {
    console.log("ondragstart event:", e);
    console.log("ondragstart this:", this);
  }

  onClick() {
    //eventually hook this up to display a comment
    console.log("onclick thing:", this);
  }


  render() {
    let displayedSectionMarkers = sectionMarkers.map(sectionMarker => {
      return (
          <Marker
            key={sectionMarker.lat}
            position={sectionMarker}
            options={
              {icon: CARTLogo,
               scaledSize: { width: 20, height: 20 }
              }
            }
        />
      )
    })

    console.log('map this.props.mymarkers', this.props.myMarkers);
    let mySavedMarkers = this.props.myMarkers.map(marker => {
      return (<Marker
        key={marker.lat}
        position={marker}
        draggable={true}
        onClick={this.onClick}
        onDragStart={this.getMarkerId}
        onDragEnd={(event) => this.props.updateUserMarker(event, marker)}
        options={
          {icon: RubberDuck,
           scaledSize: { width: 20, height: 20 }
          }
        }
      />)
      })

      // markerWithLabel={window.MarkerWithLabel}
      // labelContent={`yooooooo`}
      // labelClass={'map-marker-icon'}

    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 51.615831, lng: -0.330991 }}
        onRightClick={(e) => this.props.saveToMyMarkers(e)}>

        {displayedSectionMarkers}
        {mySavedMarkers}

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
