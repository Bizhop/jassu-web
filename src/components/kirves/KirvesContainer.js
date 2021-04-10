import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { path } from 'ramda'

import { init, getGames, deleteGame } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { check, del } from '../shared/images'
import { formatString } from '../shared/dateFormat'

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
          <th>Pvm</th>
          <th>Pelaajia</th>
          <th>Voi liittyä</th>
          <th />
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
            <td>{formatString(game.createdAt)}</td>
            <td>{game.players}</td>
            <td>{game.canJoin && <img src={check} width="10" height="10" /> }</td>
            <td>
              {props.user.email === game.admin.email && (
                <img src={del} width="10" height="10" onClick={() => props.deleteGame(game.id)} /> 
              )}
            </td>
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
  init: () => dispatch(init()),
  deleteGame: gameId => dispatch(deleteGame(gameId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesContainer)
