const defaultState = {
  myMarkers: []
}

export default function(state=defaultState, action) {
  // console.log(action.payload)

  switch(action.type) {
    case "ADD_MARKER":
      return {...state, myMarkers: [...state.myMarkers, action.payload]}
    default:
      return state
  }
}
