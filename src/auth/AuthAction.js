import React from 'react'

class AuthAction extends React.Component {

  state = {
    current_user: "",
    password: ""
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <React.Fragment>
      <h1>{this.props.header}</h1>
      </React.Fragment>
    )
  }


}


export default AuthAction
