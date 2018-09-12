import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createUser, loginUser, getCurrentUser, getUserMarkers, addUserMarker, updateMarker, deleteMarker, setMarkerComment } from './adapter/Adapter'
import { Icon, Button, Menu, Segment, Sidebar } from 'semantic-ui-react'
import Map from './components/Map'
import NavBar from './components/NavBar'

class App extends Component {

  state = {
    myMarkers: [],
    current_user: "",
    previouslySeenUser: null,
    comments: [],
    visible: false
  }

  //authorisation section
  signUp = (username, password) => {
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
    this.setState({
      current_user: null
    })
    this.props.history.push('/')
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
      })
      })
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
    console.log("ya hittin tha update fuction");
    let newCoordinates = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    console.log("newCoordinates", newCoordinates);
    if (this.state.current_user) {
      updateMarker(this.state.current_user.id, localStorage.getItem('token'), marker, newCoordinates).then(newCoordinates => {
        let newMarkers = this.state.myMarkers.filter(duck => duck.id !== marker.id)
        newMarkers = [...newMarkers, newCoordinates]
        console.log("new markers", newMarkers);
      this.setState({
        myMarkers: newMarkers
      })})
    }
  }

  deleteUserMarker = (marker) => {
    if (this.state.current_user) {
      if (this.state.current_user.id === marker.user_id) {
          deleteMarker(this.state.current_user.id, localStorage.getItem('token'), marker)
          .then(updatedMarkers => {
            this.setState({
              myMarkers: updatedMarkers
            })
          })
        }
      }
  }

  //comments section
  addComment = (marker, comment) => {
    this.setComments(marker, comment)
  }

  setComments = (marker, comment) => {
    console.log("comment", comment);
    setMarkerComment(this.state.current_user.id, localStorage.getItem('token'), marker, comment)
    .then(new_comment => {
      this.setState({
        comments: [...this.state.comments, new_comment]
      })
    })
  }


  //sidebar section
  handleButtonClick = () => this.setState({ visible: !this.state.visible })
  handleSidebarHide = () => this.setState({ visible: false })



  //render section
  render() {

    this.fetchMyMarkers()
    const visible = this.state.visible
    return (
      <div>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='wide'
            icon='labeled'
          >
            <Menu.Item textalign='center'>
                <NavBar
                  fluid
                  textalign='center'
                  current_user={this.state.current_user}
                  logOut={this.logOut}
                  logIn={this.logIn}
                  signUp={this.signUp}
                />
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Button animated='fade' size='mini' floated="left" onClick={this.handleButtonClick}>
                <Button.Content visible><Icon name='angle double left'/></Button.Content>
                <Button.Content hidden>Menu</Button.Content>
              </Button>

              <Map
                saveToMyMarkers={this.saveToMyMarkers}
                myMarkers={this.state.myMarkers}
                sectionMarkers={this.state.sectionMarkers}
                updateUserMarker={this.updateUserMarker}
                deleteUserMarker={this.deleteUserMarker}
                addComment={this.addComment}
                current_user={this.state.current_user}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}



export default withRouter(App)
