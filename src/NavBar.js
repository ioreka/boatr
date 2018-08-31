import React from 'react'
import AuthBox from './AuthBox'
import { Link } from 'react-router-dom'

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
      <div className="logo">
        <img src={require(`./boatr_logo.png`)} alt="boatr_logo"/>
      </div>
        <AuthBox current_user={this.props.current_user}/>

        <button className="w3-button w3-block w3-left-align" onClick={this.myAccFunc}>
        Helpful hints<i className="fa fa-caret-down"></i>
        </button>
         <div id="demoAcc" className="w3-hide w3-white w3-card">
           <li>Add a marker using right-click</li>
           <li>Add a comment by clicking on a marker</li>
           <li>Remember to save your markers!</li>


         </div>

         <p>
         About
         {
           //boatr is designed for continuous cruisers on London's canal network to keep track of their migrations.
           //There are 3 rules for boating:
           //the canal is split into 1km length sections, and you must be in a new section every 14 days.
           //You must not return to the same section within 3 months.
           //You must cover at least 20 miles, in one direction, over the course of 12 months.
         }
         </p>

         <p>
         Contact
          {
            //lucy.mitchell@flatironschool.com
          }
         </p>

         <p>
         Help
         {
           //This app is for guidance only. Liaise with the Canal & River Trust for your officially recorded movements! 
         }
         </p>

         <Link onClick={this.props.logOut} to="#" className="button" >Log out</Link>
        </div>

      </React.Fragment>
    )
  }



}

export default NavBar
