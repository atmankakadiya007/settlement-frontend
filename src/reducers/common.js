import * as types from '../action_types/common'

let intialState = {
  highlights: [], 
  suburbs: [], 
  postal_codes: [], 
  packages:[],
  isUserLoggedIn:false
}

export default (state = intialState, action) => {
    switch (action.type) {
     case types.GET_HIGHLIGHTS:
      return { ...state, highlights: action.payload }
     case types.GET_PRICING_PACKAGES:
       return { ...state, packages: action.payload }
      case types.CHANGE_USER_LOGGEDIN_STATUS:
      return { ...state, isUserLoggedIn: !state.isUserLoggedIn }
     default:
      return state
    }
   }