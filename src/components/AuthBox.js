import React from 'react'
import { Button, Icon, Modal, Header, Form, Divider } from 'semantic-ui-react'

class AuthBox extends React.Component {

  state = {
    username: "",
    password: ""
  }

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div>
        { this.props.current_user ?
            <h3>Hello, {this.props.current_user.username}!</h3>
            :
            <React.Fragment>

            <Divider hidden />

               <Modal size="mini" trigger={
                 <Button animated='fade' >
                    <Button.Content visible>Sign Up</Button.Content>
                    <Button.Content hidden>
                      <Icon name='signup' />
                    </Button.Content>
                  </Button>}>
                 <Modal.Content>
                   <Modal.Description>
                     <Header>Sign up!</Header>
                      <div id="AuthAction">
                      <Form onSubmit={(e) => {
                       e.preventDefault()
                       this.props.signUp(this.state.username, this.state.password)
                    }}>
                        <Form.Field>
                          <label>Username</label>
                          <input placeholder="Username" name="username" value={this.state.username} onChange={this.onValueChange} />
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input placeholder='Password' type="password" name="password" value={this.state.password} onChange={this.onValueChange} />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                      </Form>
                     </div>
                   </Modal.Description>
                 </Modal.Content>
              </Modal>

            <Divider hidden />

            <Modal size="mini" trigger={
              <Button animated='fade' >
               <Button.Content visible>Log In</Button.Content>
               <Button.Content hidden>
                 <Icon name='sign in' />
               </Button.Content>
              </Button>}>
                <Modal.Content>
                  <Modal.Description>
                    <Header>Log in!</Header>
                      <div id="AuthAction">
                    <Form onSubmit={(e) => {
                      e.preventDefault()
                      this.props.logIn(this.state.username, this.state.password)
                    }}>
                       <Form.Field>
                         <label>Username</label>
                         <input placeholder="Username" name="username" value={this.state.username} onChange={this.onValueChange} />
                       </Form.Field>
                       <Form.Field>
                         <label>Password</label>
                         <input placeholder='Password' type="password" name="password" value={this.state.password} onChange={this.onValueChange} />
                       </Form.Field>
                       <Button type='submit'>Submit</Button>
                     </Form>
                    </div>
                  </Modal.Description>
                </Modal.Content>
              </Modal>

              <Divider hidden />
              </React.Fragment>
            }

      </div>
    )
  }
}

export default AuthBox
