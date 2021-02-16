import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path } from 'ramda'
import SockJsClient from 'react-stomp'

import { getGame, joinGame, action } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { SvgImage } from '../shared/images'

const Cards = props => (
  <div>
    {props.cards.map((card, i) => (
      <div className="col-md-1 col-xs-1" key={`card-${card}`}>
        <SvgImage name={card} className="img-responsive" onClick={() => props.action({gameId:props.gameId, action:'PLAY_CARD', index:i})} />
        {props.roundsWon.includes(i) && (
          <BackCard lastCard={props.numOfPlayedRounds - 1 == i} />
        )}
      </div>
    ))}
  </div>
)

const BackCard = props => {
  if(props.lastCard) {
    setTimeout(() => {
      const element = document.getElementsByClassName('last-card')[0]
      if(element) {
        element.classList.remove('last-card')
      }
    }, 1500)
    return <SvgImage name="back" className="img-responsive card-back last-card" onClick={event => hideForSeconds(event, 1.5)} />
  } else return (
    <SvgImage name="back" className="img-responsive card-back" />
  )
}

function hideForSeconds(event, time) {
  const element = event.target
  element.classList.add('hidden')
  setTimeout(() => {
    element.classList.remove('hidden')
  }, time * 1000)
}

const KirvesGame = props => (
  <div className="container">
    <h1>Kirves</h1>
    {props.game && (
      <div>
        <SockJsClient url={WEB_SOCKET_URL} topics={['/topic/refresh']} 
          onMessage={msg => {
            if(msg == props.game.id) {
              props.refresh(props.game.id)
            }
          }}
        />
        <div className="row">
          <div className="col-md-6 col-xs-6">Peli {props.game.id} alkanut!</div>
          {props.game.canJoin && (
            <div className="col-md-3 col-xs-3">
              <button onClick={() => props.join(props.game.id)} className="btn btn-primary">
                Liity peliin
              </button>
            </div>
          )}
          {props.game.canDeal && (
            <div className="col-md-3 col-xs-3">
              <button onClick={() => props.action({gameId:props.game.id, action:'DEAL'})} className="btn btn-primary">
                Jaa
              </button>
            </div>
          )}
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
          <div className="col-md-3 col-xs-3">Jakaja:</div>
          <div className="col-md-3 col-xs-3">{props.game.dealer}</div>
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Pelivuoro:</div>
          <div className="col-md-3 col-xs-3">{props.game.turn}</div>
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Omat kortit:</div>
          <Cards cards={props.game.myCardsInHand} action={props.action} gameId={props.game.id} roundsWon={[]} />
        </div>
        <div className="row">
          <div className="col-md-3 col-xs-3">Valttikortti:</div>
          <div className="col-md-1 col-xs-1"><SvgImage name={props.game.valttiKortti} className="img-responsive" /></div>
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
              <Cards cards={player.playedCards} roundsWon={player.roundsWon} action={() => {}} numOfPlayedRounds={props.game.numOfPlayedRounds} />
            </div>
          </div>
        ))}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    getGame: dispatch(getGame(id)),
    autoLogin: dispatch(autoLogin()),
    join: gameId => dispatch(joinGame(gameId)),
    refresh: gameId => dispatch(getGame(gameId)),
    action: params => dispatch(action(params)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesGame)
