import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { createUser, loginUser, getCurrentUser, getUserMarkers, addUserMarker, updateMarker, deleteMarker } from './adapter/Adapter'
import Map from './components/Map'
import NavBar from './components/NavBar'
import AuthAction from './auth/AuthAction'
import AlertBox from './components/AlertBox'
import './App.css'

// import { connect } from 'react-redux'

class App extends Component {

  state = {
    myMarkers: [],
    // sectionMarkers: [],
    current_user: "",
    previouslySeenUser: null
  }

  //authorisation section

  signIn = (username, password) => {
    createUser(username, password).then(this.postAuth)
  }

  login = (username, password) => {
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




  //render section

  render() {
    this.fetchMyMarkers()
    const isLoggedIn = this.state.current_user
    return (
      <div className="App">
        <Switch>
          <Route path="/home" render={() => {
            return (
              <React.Fragment>
                <NavBar
                  current_user={this.state.current_user}
                  logOut={this.logOut}
                />
                <Map
                  saveToMyMarkers={this.saveToMyMarkers}
                  myMarkers={this.state.myMarkers}
                  sectionMarkers={this.state.sectionMarkers}
                  updateUserMarker={this.updateUserMarker}
                  deleteUserMarker={this.deleteUserMarker}
                />
                {isLoggedIn ? null : <AlertBox />}
              </React.Fragment>
            )
          }} />
          <Route path="/signup" render={() => {
            return (<AuthAction header="Sign up!" submit={this.signIn} />)
          }} />
          <Route path="/login" render={() => {
            return (<AuthAction header="Log in!" submit={this.login} />)
          }} />
          <Route path="/" render={() => {
             return (<Redirect to="/home" />)
           }} />
        </Switch>
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
