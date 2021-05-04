import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, pluck } from 'ramda'
import SockJsClient from 'react-stomp'

import { getGame, joinGame, action, showAllCards } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { SvgImage, view, check } from '../shared/images'
import SetValttiForm from './SetValttiForm'
import AdjustPlayersForm from './AdjustPlayersForm'
import translate from '../shared/translate'

const Cards = props => (
  <div>
    {props.cards.map((card, i) => (
      <div className="col-md-1 col-xs-1" key={`card-${card}`}>
        <SvgImage name={card} className="img-responsive" onClick={() => props.action({gameId:props.gameId, action:props.actionName, index:i})} />
        {props.roundsWon.includes(i) && (
          props.cardsVisible ? <img src={check} width="10" height="10" /> : <BackCard lastCard={props.numOfPlayedRounds - 1 == i} />
        )}
      </div>
    ))}
    {props.firstCardSuit && (
      <div className="col-md-1 col-xs-1">
        <SvgImage name={`Suit${props.firstCardSuit}`} className="img-responsive opaque50" />
      </div>
    )}
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

const ActionButton = props => (
  <div className="col-md-2 col-xs-2">
    <button onClick={() => props.action({
          gameId: props.gameId,
          action: props.actionName,
          declineCut: props.declineCut,
          keepExtraCard: props.keepExtraCard
          })}
        className="btn btn-primary">
      {props.label}
    </button>
  </div>
)

const KirvesGame = props => (
  <div id="kirves-container" className="container">
    {props.game && (
      <div>
        <SockJsClient url={WEB_SOCKET_URL} topics={['/topic/refresh']} 
          onMessage={msg => {
            if(msg == props.game.id) {
              props.refresh(props.game.id)
            }
          }}
        />
        <h1>Kirves (Peli {props.game.id})</h1>
        <div className="row">
          {props.game.canJoin && (
            <div className="col-md-2 col-xs-2">
              <button onClick={() => props.join(props.game.id)} className="btn btn-primary">
                Liity peliin
              </button>
            </div>
          )}
          {includes('DEAL', props.game.myAvailableActions) && (
            <ActionButton action={props.action} actionName="DEAL" gameId={props.game.id} label="Jaa" />
          )}
          {includes('FOLD', props.game.myAvailableActions) && (
            <ActionButton action={props.action} actionName="FOLD" gameId={props.game.id} label="Mene pakkaan" />
          )}
          {includes('CUT', props.game.myAvailableActions) && (
            <div>
              <ActionButton action={props.action} actionName="CUT" gameId={props.game.id} label="Nosta" />
              {props.game.canDeclineCut && (
                <ActionButton action={props.action} actionName="CUT" gameId={props.game.id} declineCut="true" label="Älä nosta" />
              )}
            </div>
          )}
          {includes('ACE_OR_TWO_DECISION', props.game.myAvailableActions) && (
            <div>
              <ActionButton action={props.action} actionName="ACE_OR_TWO_DECISION" gameId={props.game.id} keepExtraCard="true" label="Pidä" />
              <ActionButton action={props.action} actionName="ACE_OR_TWO_DECISION" gameId={props.game.id} keepExtraCard="false" label="Hylkää" />
            </div>
          )}
        </div>
        {includes('SET_VALTTI', props.game.myAvailableActions) && (
          <div className="row">
            <div className="col-md-6 col-xs-6">
              <SetValttiForm 
                onSubmit={props.setValtti}
                valtti={props.game.valtti}
                players={props.game.players}
              />
            </div>
          </div>
        )}
        {includes('ADJUST_PLAYERS_IN_GAME', props.game.myAvailableActions) && (
          <div className="row">
            <div className="col-md-6 col-xs-6">
              <AdjustPlayersForm
                onSubmit={props.adjustPlayers}
                players={props.game.players}
                adjustPlayersFormValues={props.adjustPlayersFormValues}
                initialValues={{resetActivePlayers: false}}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-2 col-xs-2">Viesti:</div>
          <div className="col-md-3 col-xs-3">{props.game.message}</div>
        </div>
        <div className="row">
          <div className="col-md-2 col-xs-2">Pakka:</div>
          <div className="col-md-2 col-xs-2">{props.game.cardsInDeck} korttia</div>
        </div>
        {props.game.cutCard && (
          <div className="row">
            <div className="col-md-2 col-xs-2">Nostokortti:</div>
            <div className="col-md-1 col-xs-1"><SvgImage name={props.game.cutCard} className="img-responsive" /></div>
          </div>
        )}
        <div className="row">
          <div className="col-md-2 col-xs-2">Valtti:</div>
          {props.game.valttiKortti && ( 
            <div className="col-md-1 col-xs-1"><SvgImage name={props.game.valttiKortti} className="img-responsive" /></div>
          )}
          {props.game.valtti && ( 
            <div className="col-md-1 col-xs-1"><SvgImage name={`Suit${props.game.valtti}`} className="img-responsive opaque50" /></div>
          )}
        </div>
        <div className="row">
          <div className="col-md-2 col-xs-2">Omat kortit:</div>
          <Cards 
            cards={props.game.myCardsInHand}
            action={props.action}
            gameId={props.game.id}
            roundsWon={[]}
            actionName={includes('DISCARD', props.game.myAvailableActions) ? 'DISCARD' : 'PLAY_CARD'}
            firstCardSuit={props.game.firstCardSuit}
          />
        </div>
        {props.game.myExtraCard && (
          <div className="row">
            <div className="col-md-2 col-xs-2">Ylimääräinen kortti:</div>
            <div className="col-md-1 col-xs-1"><SvgImage name={props.game.myExtraCard} className="img-responsive" /></div>
          </div>
        )}
        <h2>Pelaajat
        {props.game.numOfPlayedRounds == 5 && (
          <img src={view} width="30" height="30" onClick={() => props.showAllCards()} />
        )}
        </h2>
        {props.game.players.map(player => (
          <div key={player.email}>
            <h3>
              {player.nickname ? player.nickname : player.email}
              {props.game.dealer === player.email && (' (J)')}
              {player.availableActions.length > 0 && (' (V)')}
              {player.declaredPlayer && (' (P)')}
            </h3>
            <div className="row">
              <div className="col-md-2 col-xs-2">Toiminnot:</div>
              <div className="col-md-2 col-xs-2">
                {player.availableActions.map(action => (
                  <div key={action}>{translate(action)} </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 col-xs-2">Kortteja kädessä:</div>
              <div className="col-md-1 col-xs-1">{player.cardsInHand}</div>
            </div>
            {player.extraCard && (
              <div className="row">
                <div className="col-md-2 col-xs-2">Ylimääräinen kortti:</div>
                <div className="col-md-1 col-xs-1"><SvgImage name={player.extraCard} className="img-responsive" /></div>
              </div>
            )}
            <div className="row">
              <div className="col-md-2 col-xs-2">Pelatut kortit:</div>
              <Cards
                cards={player.playedCards}
                roundsWon={player.roundsWon}
                action={() => {}}
                numOfPlayedRounds={props.game.numOfPlayedRounds}
                cardsVisible={props.cardsVisible}
              />
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
  adjustPlayersFormValues: path(['form', 'adjustPlayersForm', 'values'], state),
  cardsVisible: path(['kirves', 'cardsVisible'], state)
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    getGame: dispatch(getGame(id)),
    autoLogin: dispatch(autoLogin()),
    join: gameId => dispatch(joinGame(gameId)),
    refresh: gameId => dispatch(getGame(gameId)),
    action: params => dispatch(action(params)),
    setValtti: form => dispatch(action({gameId:id, action:'SET_VALTTI', valtti: form.valtti, declarePlayerEmail: form.declarePlayerEmail})),
    adjustPlayers: form => dispatch(action({gameId:id, action:'ADJUST_PLAYERS_IN_GAME', resetActivePlayers: form.resetActivePlayers, inactivateByEmail: pluck('value', form.inactivateByEmail)})),
    showAllCards: () => dispatch(showAllCards())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesGame)
