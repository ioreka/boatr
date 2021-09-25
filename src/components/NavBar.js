import React from 'react'
import AuthBox from './AuthBox'
import boatrLogo from '../images/boatrLogo.png'
import { Button, Modal, Image, Divider } from 'semantic-ui-react'

class NavBar extends React.Component {
  state = {
    activeIndex: 0,
    activeItem: 'inbox'
  }


  render() {

    return (
        <React.Fragment>
            <Image src={boatrLogo} size='medium' rounded />

            <Divider hidden />

            <AuthBox
              current_user={this.props.current_user}
              logIn={this.props.logIn}
              signUp={this.props.signUp}
              />

            <Divider hidden />


            <h4>
              <p>
                boatr is designed for continuous cruisers on London's canal network to keep track of their migrations.
              </p>
              <p>
                There are 3 rules for boating with a CC licence according to the UK Canal and River Trust:<br/><br/>
                <li>The canal is split into 1km length sections, and you must be in a new section every 14 days.</li><br/>
                <li>You must not return to the same section within 3 months.</li><br/>
                <li>You must cover at least 20 miles, in one direction, over the course of 12 months.</li><br/>
              </p>
              <p>
                Sign up or log in to learn how to use the map. This site is best used on desktop, but you can use it on mobile broswer too.
              </p>
            </h4>

            { this.props.current_user?
              <React.Fragment>
                <Modal size="small" trigger={<Button>How to use the map</Button>}>
                  <Modal.Header>How to use the map</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>
                        <li>The blue CRT logos mark where new canal "sections" begin</li>
                        <li>Drop a pin to mark your boat's current position by clicking once on the map</li><br/>
                        <li>Zoom in and out using the trackpad or buttons in the bottom right corner</li><br/>
                        <li>Add a comment or upload a photo by clicking on an individual marker</li><br/><br/>
                      </p>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>

                  <Divider hidden />

                <Modal size="small" trigger={<Button>Help</Button>}>
                  <Modal.Header>Need some more help?</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>
                        Contact countlessworlds@protonmail.com or the CRT for help with this app and boating respectively!
                      </p>
                    </Modal.Description>
                  </Modal.Content>
                </Modal>

                <Divider hidden />

                <Button onClick={this.props.logOut}>Log out</Button>

                <Divider hidden />

              </React.Fragment>
              :
              null
            }

        </React.Fragment>
    )
  }



}

export default NavBar
