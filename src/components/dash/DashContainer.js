import React from 'react'
import { path } from 'ramda'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'

import { login, loginError, autoLogin, update } from '../user/userActions'
import UpdateUserForm from '../user/UpdateUserForm'

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
          <div className="col-md-2">Nickname</div>
          <div className="col-md-5">{props.user.nickname}</div>
        </div>
        {/* <div className="row">
          <div className="col-md-2">Massia</div>
          <div className="col-md-5">{props.user.money}</div>
        </div> */}
        <div className="row" style={{ marginTop: 20 }}>
          <div className="col-md-6">
            <UpdateUserForm onSubmit={props.updateUser} user={props.user} />
          </div>
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
  updateUser: form => dispatch(update(form)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashContainer)
