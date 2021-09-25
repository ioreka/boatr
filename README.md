# BOATR

## Table of Contents

- [Introduction](#introduction)
- [Functionality](#functionality)
- [Technical Details](#technical-details)
- [Additional Information](#additional-information)

![Entire App Screenshot](EntireAppScreenshot.png?raw=true "Entire App Screenshot")

## Introduction

  boatr is a single page application designed for continuous cruisers on London's canal network to keep track of their migrations.<br>

  There are 3 rules for boating, as shown above:<br/>
  <li>The canal is split into 1km length sections, and you must be in a new section every 14 days.</li><br/>
  <li>You must not return to the same section within 3 months.</li><br/>
  <li>You must cover at least 20 miles, in one direction, over the course of 12 months.</li>

  If you do not adhere to these guidelines, your boat license may be revoked. boatr arose from a personal need to keep a log of these points for my own boat. <br/>

## Functionality

Users are able to sign up and log in securely using JWT. They are able to add a duck-shaped pin to the map with a single click, and ducks can be moved by dragging.

![Sign In and Add Ducks GIF](SignIntoAppAndDropDuxxx.gif?raw=true "Sign In and Add Ducks GIF")


Users are then able to write and re-write (edit) notes about this location, which allows them to store details on the dates they were here for future reference or liaison with the Canal And River Trust and ensure claims are accurate. They are also able to upload and store a picture of their boat in this location, which helps with location accuracy.

![Sign In and Add Ducks GIF](AddPhotoToDuxxx.gif?raw=true "Sign In and Add Ducks GIF")

## Technical Details

boatr is a Rails/React app hosted currently on Heroku. As it implemented so few components and little state, I decided against using Redux, and instead used the opportunity to focus on React best practices and a React-specific CSS library (Semanti UI React).

The app uses the Google Maps API through the awesome npm package [react-google-maps](https://tomchentw.github.io/react-google-maps).

Photo uploading is supported by Filestack, and persisted to the database.

Sound capability (a duck noise when a pin is dropped) is supported by React Sound.

API keys are hidden using dotenv.

I chose to use React and implement a Progressive Web App approach rather than React Native as I wanted this app to be used fluently both in browser and on mobile.

Links:<br/>
[Front end](https://github.com/ioreka/boatr-frontend)<br/>
[Back end](https://github.com/ioreka/boatr-backend)

## Additional information
The decision was taken to not implement a location-grabbing feature as it could easily be erroneous and frustrating for the user. Narrowboats are made of steel and, as such, function as lovely big Faraday cages, obstructing signal. Instead of adding a caveat like "to use this app, make sure you are outside the boat!" I chose to allow users to drop their own pins, and be able to easily readjust them.

An option to work on this in the future could be to drop a pin based on location, ask the user to confirm the location is correct, and be able to move the map (not the pin) to the right location.


If reading this on GitHub, you can find the Heroku-hosted version of this app at [london-boatr.herokuapp.com](https://london-boatr.herokuapp.com).
