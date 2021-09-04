import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { path, pathOr } from 'ramda'

import { init, getGames, deleteGame, getLog, getReplay, restoreGame } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { check, del, view, SvgImage } from '../shared/images'
import { formatString } from '../shared/dateFormat'
import translate from '../shared/translate'
import RenderGame from './renderGame'

const KirvesContainer = props => (
  <div className="container">
    <h1>Kirves</h1>
    <div className="row">
      <div className="col-md-3 col-xs-3">
        <button onClick={() => props.init()} className="btn btn-primary">
          Aloita uusi peli
        </button>
      </div>
      <div className="col-md-3 col-xs-3">
        <SvgImage name="refresh" width="20" height="20" onClick={() => props.refreshGames()} />
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
            <td>{game.canJoin && <img src={check} width="10" height="10" />}</td>
            <td>
              {props.user.email === game.admin.email && (
                <SvgImage
                  name="log"
                  width="30"
                  height="30"
                  onClick={() => props.getLog({ gameId: game.id, handId: game.lastHandId })}
                />
              )}
            </td>
            <td>
              {props.user.email === game.admin.email && (
                <img src={del} width="10" height="10" onClick={() => props.deleteGame(game.id)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {props.logVisible && (
      <div>
        <h2>
          Loki (peli: {props.logId.gameId} käsi: {props.logId.handId})
        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Pelaaja</th>
              <th>Toiminto</th>
              <th>Lisätieto</th>
              <th>Näytä tilanne</th>
              <th>Palauta tilanne</th>
            </tr>
          </thead>
          <tbody>
            {props.logItems.map((item, index) => (
              <tr key={`log-item-${index}`}>
                <td>{item.user.nickname}</td>
                <td>{translate(item.input.action)}</td>
                <td>
                  {(() => {
                    switch (item.input.action) {
                      case 'PLAY_CARD':
                      case 'DISCARD':
                        return `index=${item.input.index}`
                      case 'ACE_OR_TWO_DECISION':
                        return item.input.keepExtraCard ? 'Pidetty' : 'Hylätty'
                      case 'SPEAK':
                        return translate(item.input.speak)
                      case 'SPEAK_SUIT':
                        return translate(item.input.suit)
                      default:
                        return ''
                    }
                  })()}
                </td>
                <td>
                  <img
                    src={view}
                    width="20"
                    height="20"
                    onClick={() =>
                      props.getReplay({
                        gameId: props.logId.gameId,
                        handId: props.logId.handId,
                        index,
                      })
                    }
                  />
                </td>
                <td>
                  {props.selectedLogIndex == index && (
                    <img
                      src={check}
                      width="20"
                      height="20"
                      onClick={() =>
                        props.restoreGame({
                          gameId: props.logId.gameId,
                          handId: props.logId.handId,
                          index,
                        })
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {props.replay && (
      <div id="kirves-container" className="container">
        <RenderGame
          game={props.replay}
          isReplay={true}
          action={() => {}}
          showAllCards={() => {}}
          cardsVisible={true}
        />
      </div>
    )}
    {!props.user.email && <Redirect to="/" />}
  </div>
)

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  games: path(['kirves', 'games'], state),
  logItems: pathOr([], ['kirves', 'logItems'], state),
  logVisible: path(['kirves', 'logVisible'], state),
  logId: path(['kirves', 'logId'], state),
  replay: path(['kirves', 'replay'], state),
  selectedLogIndex: pathOr(0, ['kirves', 'selectedLogIndex'], state),
})

const mapDispatchToProps = dispatch => ({
  autoLogin: dispatch(autoLogin()),
  getGames: dispatch(getGames()),
  refreshGames: () => dispatch(getGames()),
  init: () => dispatch(init()),
  deleteGame: gameId => dispatch(deleteGame(gameId)),
  getLog: params => dispatch(getLog(params)),
  getReplay: params => dispatch(getReplay(params)),
  restoreGame: params => dispatch(restoreGame(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesContainer)
