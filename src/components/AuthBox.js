import React from 'react'
import { Button, Icon, Modal, Header } from 'semantic-ui-react'

class AuthBox extends React.Component {

  state = {
    username: '',
    password: ''
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div id="authbox">

            { this.props.current_user?
              //if current_user is true, renders a welcome message
              <div>
                Hello, {this.props.current_user.username}!<br/>
              </div>
              :
              //if current_user is false, render the two links

              <React.Fragment>
              <p>

                 <Modal trigger={
                   <Button animated >
                      <Button.Content visible>Sign Up</Button.Content>
                      <Button.Content hidden>
                        <Icon name='signup' />
                      </Button.Content>
                    </Button>}>
                     <Modal.Content>
                       <Modal.Description>
                         <Header>Sign up!</Header>
                         <div id="AuthAction">
                             <form onSubmit={(e) => {
                               e.preventDefault()
                               this.props.signIn(this.state.username, this.state.password)
                             }}>
                               <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onValueChange} /><br/><br/>
                               <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onValueChange} /><br/><br/>
                               <input type="submit" />
                             </form>
                         </div>
                       </Modal.Description>
                     </Modal.Content>
                   </Modal>
              </p>

              <p>

              <Modal trigger={
                <Button animated >
                 <Button.Content visible>Log In</Button.Content>
                 <Button.Content hidden>
                   <Icon name='sign in' />
                 </Button.Content>
               </Button>}>
                  <Modal.Content>
                    <Modal.Description>
                      <Header>Log in!</Header>
                      <div id="AuthAction">
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            this.props.logIn(this.state.username, this.state.password)
                          }}>
                            <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onValueChange} /><br/><br/>
                            <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onValueChange} /><br/><br/>
                            <input type="submit" />
                          </form>
                      </div>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>


              </p>
              </React.Fragment>
            }

      </div>
    )
  }
}

export default AuthBox

//
// <Button animated as={Link} to='/login'>
//    <Button.Content visible>Log In</Button.Content>
//    <Button.Content hidden>
//      <Icon name='sign in' />
//    </Button.Content>
//  </Button>
//
//
//  <Button animated as={Link} to='/signup'>
//     <Button.Content visible>Sign Up</Button.Content>
//     <Button.Content hidden>
//       <Icon name='signup' />
//     </Button.Content>
//   </Button>
