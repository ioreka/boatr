import React from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import RubberDuck from '../images/RubberDuck.png'
import Sound from 'react-sound'

class MyMarker extends React.Component {

  state = {
     comment: ""
   }

   handleUserInputComment = (e) => {
     this.setState({
       comment: e.target.value
     })
   }


render() {
  let marker = this.props.marker
    return (<Marker
              key={marker.id}
              position={marker}
              draggable={true}
              onClick={(event) => this.props.handleClick(event, marker)}
              onDragEnd={(event) => this.props.updateUserMarker(event, marker)}
              options={
                {icon: RubberDuck,
                 scaledSize: { width: 20, height: 20 }
                }
              }>
              {this.props.selectedMarker === marker &&
                <React.Fragment>
                  <InfoWindow
                    key={marker.created_at}>
                    <div className="infobox">

                    <button onClick={
                      () => this.props.handleToggleClose()
                    }>x</button>

                    <label>Notes:</label><br/>
                      <textarea
                        rows="7" cols="30"
                        name="comment" value={this.state.comment}
                        className="searchFormInput"
                        onChange={this.handleUserInputComment}
                        placeholder="Dates you were moored in this location, details of any correspondence with CRT (for example, who you spoke to on the phone), any particularly fine pubs in the vicinity..."
                        /><br/>

                      <button onClick={(e) => {
                        this.props.addComment(marker, this.state.comment)
                      }}>Save notes</button>

                      <button onClick={
                        () => this.props.deleteUserMarker(this.props.selectedMarker)
                      }>Remove this Pin</button>

                    </div>
                  </InfoWindow>

                  <Sound
                      url="saltyquack.mp3"
                      playStatus={Sound.status.PLAYING}
                  />
                </React.Fragment>
              }
          </Marker>)
  }
}



export default MyMarker
