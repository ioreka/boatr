import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Map from './Map'
import NavBar from './NavBar'
import AuthAction from './auth/AuthAction'
// import { connect } from 'react-redux'

class App extends Component {

  state = {
    myMarkers: [],
    current_user: "lucille"
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/home" render={() => {
            return (
              <React.Fragment>
                <NavBar current_user={this.state.current_user}/>
                <Map />
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

export default App
