import React from 'react'
import AuthBox from './AuthBox'
import boatrLogo from '../images/boatrLogo.png'
import { Input, Menu, Button, Modal, Header, Image } from 'semantic-ui-react'

class NavBar extends React.Component {
  state = {
    activeIndex: 0,
    activeItem: 'inbox'
  }


  render() {
    return (
        <Menu fluid vertical style={{height: '98vh'}}>
          <p>
            <Menu.Item>
              <Image src={boatrLogo} size='medium' rounded />
            </Menu.Item>
          </p>

          <p>
            <Menu.Item>
              <AuthBox
                current_user={this.props.current_user}
                logIn={this.props.logIn}
                signIn={this.props.signIn}
                />
            </Menu.Item>
          </p>

          <p>
          <Menu.Item>
            <h4><p>
            boatr is designed for continuous cruisers on London's canal network to keep track of their migrations.
            </p>
            <p>
              There are 3 rules for boating:<br/><br/>
              <li>The canal is split into 1km length sections, and you must be in a new section every 14 days.</li><br/>
              <li>You must not return to the same section within 3 months.</li><br/>
              <li>You must cover at least 20 miles, in one direction, over the course of 12 months.</li><br/>
            </p>
            </h4>
          </Menu.Item>

            </p>
            { this.props.current_user?
              <React.Fragment>
            <p>

            <Modal trigger={<Button>How to use the map</Button>}>
                <Modal.Header>How to use the map</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <p>
                      <li>Add a marker using right-click, or (if on a mac) pressing with two fingers</li><br/>
                      <li>You can zoom in and move the marks as many times as you like!</li><br/>
                      <li>Add a comment by clicking on a marker</li><br/>
                    </p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              </p>

              <br/>

              <p>
              <Modal trigger={<Button>Help</Button>}>
                <Modal.Header>Need some more help?</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                      <p>
                      Contact lucy.mitchell@flatironschool.com or the CRT for help with this app and boating respectively :)
                      </p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              </p>

              <br/>

              <p>
              <Button onClick={this.props.logOut}>Log out</Button>
              </p>

              <br/>

              <Menu.Item>
                <Input icon='search' placeholder='Search for somewhere...' />
              </Menu.Item>
              </React.Fragment>
              :
              null
            }




        </Menu>

    )
  }



}

export default NavBar
