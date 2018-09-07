import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MyMarker from './MyMarker'
import sectionMarkers from './sectionMarkers'
import CARTLogo from '../images/CARTLogo.png'

class MyMap extends React.Component {

  state = {
     isOpen: false,
     selectedMarker: false,
     comment: "",
   }

  handleUserInputComment = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

   handleClick = (event, marker) => {
    this.setState({
      selectedMarker: marker,
      isOpen: true
    })
  }


   handleToggleClose = () => {
     console.log("ya hittin it");
       this.setState({
           isOpen: false,
           selectedMarker: false
       })
   }


  render() {
    let displayedSectionMarkers = sectionMarkers.map(sectionMarker => {
      return (
          <Marker
            key={sectionMarker.lat}
            position={sectionMarker}
            options={
              {icon: CARTLogo,
               scaledSize: { width: 25, height: 25 }
              }
            }
        />
      )
    })

    let mySavedMarkers = this.props.myMarkers.map(marker => {
      return (<MyMarker
        key={marker.id}
        marker={marker}
        selectedMarker={this.state.selectedMarker}
        handleClick={this.handleClick}
        handleToggleClose={this.handleToggleClose}
        handleUserInputComment={this.handleUserInputComment}
        addComment={this.props.addComment}
        deleteUserMarker={this.props.deleteUserMarker}
        updateUserMarker={this.props.updateUserMarker}
      />)
    })


    return (
      <GoogleMap
        defaultZoom={11.5}
        defaultCenter={{ lat: 51.603933, lng: -0.340521 }}
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
    containerElement: <div style={{ height: `95vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(MyMap)

export default Map
