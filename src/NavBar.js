import React from 'react'

class NavBar extends React.Component {


  myAccFunc() {
      let x = document.getElementById("demoAcc");
      if (x.className.indexOf("w3-show") === -1) {
          x.className += " w3-show";
          x.previousElementSibling.className += " w3-green";
      } else {
          x.className = x.className.replace(" w3-show", "");
          x.previousElementSibling.className =
          x.previousElementSibling.className.replace(" w3-green", "");
      }
  }

  myDropFunc() {
      let x = document.getElementById("demoDrop");
      if (x.className.indexOf("w3-show") === -1) {
          x.className += " w3-show";
          x.previousElementSibling.className += " w3-green";
      } else {
          x.className = x.className.replace(" w3-show", "");
          x.previousElementSibling.className =
          x.previousElementSibling.className.replace(" w3-green", "");
      }
  }


  render() {
    return (
      <React.Fragment>
      <div className="w3-sidebar w3-bar-block w3-light-grey w3-card" styles="width:160px;">
        <div id="welcome-text">
          <h2>Hi, {this.props.current_user}!</h2>
        </div>

        <button className="w3-button w3-block w3-left-align" onClick={this.myAccFunc}>
        Helpful hints<i className="fa fa-caret-down"></i>
        </button>
         <div id="demoAcc" className="w3-hide w3-white w3-card">
           <li>Add a marker using right-click</li>
           <li>Add a comment by clicking on a marker</li>
           <li>Remember to save your markers!</li>

           <div>
            About
           </div>

           <div>
            Contact
           </div>

           <div>
            Help
           </div>

         </div>

        </div>

      </React.Fragment>
    )
  }



}

export default NavBar
