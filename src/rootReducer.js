import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './components/user/userReducer'
import pokerReducer from './components/poker/pokerReducer'
import kirvesReducer from './components/kirves/kirvesReducer'

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  poker: pokerReducer,
  kirves: kirvesReducer,
})

export default rootReducer
