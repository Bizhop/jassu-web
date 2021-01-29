import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { path } from 'ramda'

import { init, getGames } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { check, SvgImage } from '../shared/images'

const printCards = cards => {
  return cards.map(card => (
    <div className="col-md-1 col-xs-1">
      <SvgImage name={card} />
    </div>
  ))
}

const KirvesContainer = props => (
  <div className="container">
    <h1>Kirves</h1>
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <button onClick={() => props.init()} className="btn btn-primary">
          Aloita uusi peli
        </button>
      </div>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Peli</th>
          <th>Pelaajia</th>
          <th>Voi liittyä</th>
        </tr>
      </thead>
      <tbody>
        {props.games.map(game => (
          <tr key={`game-${game.id}`}>
            <td>
              <NavLink
                to={`/kirves/${game.id}`}
                className="nav-link nav-item"
                activeClassName="active"
              >
                {game.id}
              </NavLink>
            </td>
            <td>{game.players.length}</td>
            <td>{game.canJoin && <img src={check} width="10" height="10" /> }</td>
          </tr>
        ))}
      </tbody>
    </table>
    {!props.user.email && <Redirect to="/" />}
  </div>
)

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  games: path(['kirves', 'games'], state),
})

const mapDispatchToProps = dispatch => ({
  autoLogin: dispatch(autoLogin()),
  getGames: dispatch(getGames()),
  init: () => dispatch(init())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesContainer)
