import React from 'react'
import { Marker, InfoWindow } from "react-google-maps"
import RubberDuck from '../images/RubberDuck.png'
import Sound from 'react-sound'
import ReactFilestack from 'filestack-react'
// import Comments from './Comments'

class MyMarker extends React.Component {

  state = {
     comment: "",
     url: ""
   }

   handleUserInputComment = (e) => {
     this.setState({
       comment: e.target.value
     })
   }


   onSuccess = (result) => {
      this.setState({
        url: result.filesUploaded[0].url
      })
      console.log(this.state.url);
    }
    onError = (error) => {
      console.error('error', error);
  }



render() {
  const basicOptions = {
    accept: 'image/*',
    fromSources: ['local_file_system'],
    maxSize: 1024 * 1024,
    maxFiles: 1,
  }

  let regex = /.com/i
  let sentence = this.state.url
  let newSentence = sentence.replace(regex, '.com/AtSQoV36ZQCvExzfn73Q4z/rounded_corners=blur:0.3/resize=height:200/')

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
                      }}>Save/update notes</button>

                      <button onClick={
                        () => this.props.deleteUserMarker(this.props.selectedMarker)
                      }>Remove this Pin</button>

                      <br/>

                      {this.state.url ? <img src={newSentence} alt="your boat pic! super cute"/> : null}

                      <br/>

                      <ReactFilestack
                        apikey="AtSQoV36ZQCvExzfn73Q4z"
                        buttonText="Upload photo of your boat at this location!"
                        buttonClass="classname"
                        options={basicOptions}
                        onSuccess={this.onSuccess}
                        onError={this.onError}
                      />
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

// leave unless you have time to implement the comment model
// <Comments
//  comments={this.props.comments}
//  ev={this.props.mySelectedEvent}/>


export default MyMarker
