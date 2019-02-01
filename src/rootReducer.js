import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './components/user/userReducer'
import pokerReducer from './components/poker/pokerReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  poker: pokerReducer,
})

export default rootReducer
