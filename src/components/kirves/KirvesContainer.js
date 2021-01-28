import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, isEmpty } from 'ramda'

import { init, getGame } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { SvgImage } from '../shared/images'

const printCards = cards => {
  return cards.map(card => (
    <div className="col-md-1 col-xs-1">
      <SvgImage name={card}/>
    </div>
  ))
}

const KirvesContainer = props => (
  <div className="container">
    <h1>Kirves</h1>
    {props.game && (
      <div>
        <div className="row">
          <div className="col-md-6 col-xs-6">Peli {props.game.id} alkanut!</div>
          <div className="col-md-3 col-xs-3">
            <button onClick={() => props.refresh(props.game.id)} className="btn btn-primary">
              <SvgImage name="refresh" width="10" height="10" />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Viesti:</div>
          <div className="col-md-3 col-xs-3">{props.game.message}</div>
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Pakka:</div>
          <div className="col-md-3 col-xs-3">{props.game.cardsInDeck} korttia</div>
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Omat kortit:</div>
          {printCards(props.game.myCardsInHand)}
        </div>
        <h2>Pelaajat</h2>
        {props.game.players.map(player => (
          <div key={player.email}>
            <h2>{player.email}</h2>
            <div className="row">
              <div className="col-md-3 col-xs-3">Kortteja:</div>
              <div className="col-md-3 col-xs-3">{player.cardsInHand}</div>
            </div>
            <div className="row">
              <div className="col-md-3 col-xs-3">Pelatut kortit:</div>
              {printCards(player.playedCards)}
            </div>
          </div>
        ))}
      </div>
    )}
    {!props.game && (
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <button onClick={() => props.init()} className="btn btn-primary">
            Aloita peli
          </button>
        </div>
      </div>
    )}
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
  refresh: gameId => dispatch(getGame(gameId))
})

export default connect(mapStateToProps, mapDispatchToProps)(KirvesContainer)
