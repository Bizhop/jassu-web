import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, isEmpty } from 'ramda'

import { init } from './kirvesActions'
import { autoLogin } from '../user/userActions'

const KirvesContainer = props => (
  <div className="container">
    <h1>Kirves</h1>
    {props.game && (
      <div>
        <h2>Peli alkanut!</h2>
      </div>
    )}
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <button onClick={() => props.init()} className="btn btn-primary">
          Aloita peli
        </button>
      </div>
    </div>
    {!props.user.email && <Redirect to="/" />}
  </div>
)

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  game: path(['kirves', 'game'], state),
})

const mapDispatchToProps = dispatch => ({
  autoLogin: dispatch(autoLogin()),
  init: () => dispatch(init()),
})

export default connect(mapStateToProps, mapDispatchToProps)(KirvesContainer)
