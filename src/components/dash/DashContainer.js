import React from 'react'
import { path } from 'ramda'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'

import { login, loginError, autoLogin } from '../user/userActions'

const DashContainer = props => (
  <div className="container">
    {props.user.email ? (
      <div>
        <h1>Tervetuloa!</h1>
        <div className="row">
          <div className="col-md-2">Email</div>
          <div className="col-md-5">{props.user.email}</div>
        </div>
        <div className="row">
          <div className="col-md-2">Massia</div>
          <div className="col-md-5">{props.user.money}</div>
        </div>
      </div>
    ) : (
      <GoogleLogin
        clientId="266150004835-ijh2ibgdsa9timu7cmak0udc76hnhldb.apps.googleusercontent.com"
        buttonText="Kirjaudu sisään"
        className="btn btn-danger"
        onSuccess={props.login}
        onFailure={props.loginError}
      />
    )}
    {props.error && console.log(props.error)}
  </div>
)

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
})

const mapDispatchToProps = dispatch => ({
  autoLogin: dispatch(autoLogin()),
  login: response => dispatch(login(response)),
  loginError: response => dispatch(loginError(response)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashContainer)
