import React from "react"
import R from "ramda"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"

import { logout } from "../user/userActions"

const Header = props => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="row">
          <div className="col-md-1 col-xs-12">
            <NavLink to="/" className="nav-link nav-item" activeClassName="active">
              Etusivu
            </NavLink>
          </div>
          {props.loggedIn && (
            <div className="col-md-4 col-xs-12 pull-right">
              <div className="row">
                <div className="col-md-6 col-xs-6">{props.loggedIn.email}</div>
                <div className="col-md-6 col-xs-6">
                  <button onClick={() => props.logout()} className="btn btn-primary">
                    Kirjaudu ulos
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  </div>
)

const mapStateToProps = state => ({
  loggedIn: R.path(["user", "token"], state),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
