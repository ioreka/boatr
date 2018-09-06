import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { createUser, loginUser, getCurrentUser, getUserMarkers, addUserMarker, updateMarker, deleteMarker, setMarkerComment } from './adapter/Adapter'
import { Container, Grid } from 'semantic-ui-react'
import Map from './components/Map'
import NavBar from './components/NavBar'
import AuthAction from './auth/AuthAction'
import AlertBox from './components/AlertBox'


// import { connect } from 'react-redux'

class App extends Component {

  state = {
    myMarkers: [],
    current_user: "",
    previouslySeenUser: null,
    comments: []
  }

  //authorisation section

  signIn = (username, password) => {
    createUser(username, password).then(this.postAuth)
  }

  logIn = (username, password) => {
    loginUser(username, password).then(this.postAuth)
  }

  postAuth = (data) => {
    if (data.error) {
      alert(data.error)
    } else {
      this.props.history.push("/home")
      localStorage.setItem('token', data.token)
      this.updateCurrentUser(data.token)
    }
  }

  logOut = () => {
    // alert("Thanks for using Boatr! See you again soon <3")
    this.setState({
      current_user: null
    })
    this.props.history.push('/login')
    localStorage.clear()
  }

  updateCurrentUser = (token) => {
    getCurrentUser(token).then(data => {
      if (data.error) {
        this.logOut()
      } else {
        this.setState({
          current_user: data
        })
      }
    })
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.updateCurrentUser(localStorage.getItem('token'))
    }
  }

  // map methods section
  saveToMyMarkers = (event) => {
    let body = {lat: event.latLng.lat(), lng: event.latLng.lng()}
    if (this.state.current_user) {
      addUserMarker(this.state.current_user.id, localStorage.getItem('token'), body).then(data => {
      this.setState({
        myMarkers:[...this.state.myMarkers, data]
      })})
    }
  }

  setMarkers = () => {
    return addUserMarker(this.state.current_user.id, localStorage.getItem('token'), this.state.myMarkers)
  }

  fetchMyMarkers = () => {
  if (this.state.current_user && this.state.current_user !== this.state.previouslySeenUser) {
    getUserMarkers(this.state.current_user.id, localStorage.getItem('token'))
    .then(markers => {
      this.setState({
        myMarkers: markers,
        previouslySeenUser: this.state.current_user
      })
    })
    }
  }

  updateUserMarker = (e, marker) => {
    let newCoordinates = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    if (this.state.current_user) {
      updateMarker(this.state.current_user.id, localStorage.getItem('token'), marker, newCoordinates).then(newCoordinates => {
        let newMarkers = this.state.myMarkers.filter(duck => duck.id !== marker.id)
        newMarkers = [...newMarkers, newCoordinates]
      this.setState({
        myMarkers: newMarkers
      })})
    }
  }

  deleteUserMarker = (marker) => {
  if (this.state.current_user.id === marker.user_id) {
      deleteMarker(this.state.current_user.id, localStorage.getItem('token'), marker)
      .then(updatedMarkers => {
        this.setState({
          myMarkers: updatedMarkers
        })
      })
    }
  }


  //comments section

  addComment = (marker, comment) => {
    this.setComments(marker, comment)
  }


  setComments = (marker, comment) => {
  setMarkerComment(this.state.current_user.id, localStorage.getItem('token'), marker, comment)
  .then(new_comment => {
    this.setState({
      comments: [...this.state.comments, new_comment]
    })
  })
}



  //render section

  render() {
    this.fetchMyMarkers()
    const isLoggedIn = this.state.current_user
    return (
      <div className="App">
              <Container fluid textAlign='center'>
                <Grid padded style={{height: '100vh'}}>
                  <Grid.Column width={3}>
                    <Container fluid>
                      <NavBar
                        current_user={this.state.current_user}
                        logOut={this.logOut}
                        logIn={this.logIn}
                        signUp={this.signUp}
                      />
                    </Container>
                  </Grid.Column>

                  <Grid.Column width={13}>
                    <Map
                      saveToMyMarkers={this.saveToMyMarkers}
                      myMarkers={this.state.myMarkers}
                      sectionMarkers={this.state.sectionMarkers}
                      updateUserMarker={this.updateUserMarker}
                      deleteUserMarker={this.deleteUserMarker}
                      addComment={this.addComment}
                    />
                    {isLoggedIn ? null : <AlertBox />}
                  </Grid.Column>
                </Grid>
              </Container>
            )
      </div>
    );
  }
}

  // const mapStateToProps = (state) => {
  //   console.log("APP MSP", state)
  //   return {
  //     myMarkers: state.myMarkers
  //   }
  // }

export default withRouter(App)
