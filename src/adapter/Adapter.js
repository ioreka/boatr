const baseURL = `http://localhost:3001/api/v1`


const createUser = (username, password) => {
  return fetch(`${baseURL}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(resp => resp.json())
}

const loginUser = (username, password) => {
  return fetch(`${baseURL}/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(resp => resp.json())
}

const getCurrentUser = (token) => {
  return fetch(`${baseURL}/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorisation: token
    },
  }).then(resp => resp.json())
}

const getUserMarkers = (id, token) => {
  return fetch(`${baseURL}/users/${id}/markers`, {
    headers: {
      'Content-Type': 'application/json',
      Authorisation: token
    }
  }).then(resp => resp.json())
}

const addUserMarker = (id, token, marker) => {
  return fetch(`${baseURL}/users/${id}/markers`, {
    headers: {
      'Content-Type': 'application/json',
      Authorisation: token
    },
    method: 'POST',
    body: JSON.stringify({
      marker
    })
  }).then(resp => resp.json())
}

const updateMarker = (id, token, marker, newCoordinates) => {
  return fetch(`${baseURL}/users/${id}/markers/${marker.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorisation: token
    },
    method: 'PATCH',
    body: JSON.stringify(
      newCoordinates
    )
  }).then(resp => resp.json())
}


const deleteMarker = (id, token, marker) => {
  return fetch(`${baseURL}/users/${id}/markers/${marker.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorisation: token
    },
    method: 'DELETE',
    body: JSON.stringify({
      marker
    })
  }).then(resp => resp.json())
}


//leave unless you have time to make a comment model argh
const setMarkerComment = (id, token, marker, comment) => {
  return fetch(`${baseURL}/users/${id}/markers/${marker.id}/comments`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    method: 'POST',
    body: JSON.stringify({
      comment
    })
  }).then(resp => resp.json())
}

const getMarkerComments = (id, token, meetup_id) => {
  return fetch(`${baseURL}/comments?meetup_id=${meetup_id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: meetup_id
  }).then(resp => resp.json())
}


export {
  createUser,
  loginUser,
  getCurrentUser,
  getUserMarkers,
  addUserMarker,
  updateMarker,
  deleteMarker,
  setMarkerComment,
  getMarkerComments
}
