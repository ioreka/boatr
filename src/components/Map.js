import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import sectionMarkers from './sectionMarkers'
import RubberDuck from '../images/RubberDuck.png'
import CARTLogo from '../images/CARTLogo.png'

class MyMap extends React.Component {

  state = {
     isOpen: false,
     selectedMarker: false
   }

   handleClick = (event, marker) => {
    this.setState({
      selectedMarker: marker,
      isOpen: true
    })
  }


   handleToggleClose = () => {
       this.setState({
           isOpen: false
       });
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



    let mySavedMarkers = this.props.myMarkers.map(marker => {
      return (<Marker
                key={marker.id}
                position={marker}
                draggable={true}
                onClick={(event) => this.handleClick(event, marker)}
                onDragEnd={(event) => this.props.updateUserMarker(event, marker)}
                options={
                  {icon: RubberDuck,
                   scaledSize: { width: 20, height: 20 }
                  }
                }>
                {this.state.selectedMarker === marker &&
                  <InfoWindow
                    onCloseClick={() => this.handleToggleClose()}>
                    <div>
                      <div>Date of arrival:</div>
                      <div>Date of departure:</div>
                      <div>Notes:</div>
                      <button>Save</button>
                    </div>
                  </InfoWindow>
                }
            </Marker>)
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
