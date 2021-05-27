import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, pluck, without, keys, values } from 'ramda'
import SockJsClient from 'react-stomp'

import { getGame, joinGame, action, showAllCards } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import { SvgImage, view, check } from '../shared/images'
import AdjustPlayersForm from './AdjustPlayersForm'
import translate from '../shared/translate'

const Cards = props => {
  const s = props.scale || 1;
  return (
    <div className="row">
      {props.cards.map((card, i) => (
        <div className={`col-md-${s} col-xs-${s}`} key={`card-${card}`}>
          <SvgImage name={card} className="img-responsive" onClick={() => props.action({gameId:props.gameId, action:props.actionName, index:i})} />
          {props.roundsWon.includes(i) && (
            props.cardsVisible ? <img src={check} width="10" height="10" /> : <BackCard lastCard={props.numOfPlayedRounds - 1 == i} />
          )}
        </div>
      ))}
      {props.firstCardSuit && (
        <div className={`col-md-${s} col-xs-${s}`}>
          <SvgImage name={`Suit${props.firstCardSuit}`} className="img-responsive opaque50" />
        </div>
      )}
    </div>
)}

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
    <button 
      onClick={() => props.action({
          gameId: props.gameId,
          action: props.actionName,
          declineCut: props.declineCut,
          keepExtraCard: props.keepExtraCard,
          speak: props.speak,
        })}
      className="btn btn-primary"
    >
      {props.label}
    </button>
  </div>
)

const SuitSelector = props => {
  const suits =  without([props.currentTrump], ['CLUBS', 'SPADES', 'HEARTS', 'DIAMONDS'])
  return (
    <div>
      <h3>Valitse valtti</h3>
      <div className="row">
        {suits.map(suit => (
          <div className="col-md-1 col-xs-1" key={`suit-${suit}`}>
            <SvgImage name={`Suit${suit}`} className="img-responsive" onClick={() => props.action({gameId:props.gameId, action:props.actionName, suit})} />
          </div>
        ))}
      </div>
    </div>
  )
}

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
          {includes('SPEAK', props.game.myAvailableActions) && (
            <div>
              <ActionButton action={props.action} actionName="SPEAK" gameId={props.game.id} speak="KEEP" label="Päältä" />
              <ActionButton action={props.action} actionName="SPEAK" gameId={props.game.id} speak="CHANGE" label="Värjäisin" />
              <ActionButton action={props.action} actionName="SPEAK" gameId={props.game.id} speak="PASS" label="Viitenä" />
            </div>
          )}
          {includes('SPEAK_SUIT', props.game.myAvailableActions) && (
            <SuitSelector 
              action={props.action}
              actionName="SPEAK_SUIT"
              gameId={props.game.id}
              currentTrump={props.game.trump}
            />
          )}
          <div className="col-md-4 col-xs-4 pull-right" >
            <p>Viestit:</p>
            <ul className="list-group" id="message-log">
              {props.game.messages.reverse().map((message, index) => (
                <li className="list-group-item" key={`li-${index}`}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
        {props.game.cutCard && (
          <div className="row">
            <div className="col-md-2 col-xs-2">Nostokortti:</div>
            <div className="col-md-1 col-xs-1"><SvgImage name={props.game.cutCard} className="img-responsive" /></div>
            {props.game.secondCutCard && (
              <div className="col-md-1 col-xs-1"><SvgImage name={props.game.secondCutCard} className="img-responsive opaque50" /></div>
            )}
          </div>
        )}
        <div className="row">
          <div className="col-md-2 col-xs-2">Valtti:</div>
          {props.game.trumpCard && ( 
            <div className="col-md-1 col-xs-1"><SvgImage name={props.game.trumpCard} className="img-responsive" /></div>
          )}
          {props.game.trump && ( 
            <div className="col-md-1 col-xs-1"><SvgImage name={`Suit${props.game.trump}`} className="img-responsive opaque50" /></div>
          )}
        </div>
        <h4>Omat kortit:</h4>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <Cards 
              cards={props.game.myCardsInHand}
              action={props.action}
              gameId={props.game.id}
              roundsWon={[]}
              actionName={includes('DISCARD', props.game.myAvailableActions) ? 'DISCARD' : 'PLAY_CARD'}
              firstCardSuit={props.game.firstCardSuit}
            />
          </div>
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
        <div className="row">
          <div className="col-md-6 col-xs-6">
            {props.game.players.map(player => (
              <div key={player.email}>
                <h3>
                  {player.nickname ? player.nickname : player.email}
                  {props.game.dealer === player.email && (' (J)')}
                  {player.availableActions.length > 0 && (' (V)')}
                  {player.declaredPlayer && (' (P)')}
                </h3>
                <div className="row">
                  <div className="col-md-4 col-xs-4">Toiminnot:</div>
                  <div className="col-md-4 col-xs-4">
                    {player.availableActions.map(action => (
                      <div key={action}>{translate(action)} </div>
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 col-xs-4">Kortteja kädessä:</div>
                  <div className="col-md-2 col-xs-2">{player.cardsInHand}</div>
                </div>
                {player.speak && (
                  <div className="row">
                    <div className="col-md-4 col-xs-4">Puhe:</div>
                    <div className="col-md-2 col-xs-2">{translate(player.speak)}</div>
                  </div>
                )}
                {player.extraCard && (
                  <div className="row">
                    <div className="col-md-4 col-xs-4">Ylimääräinen kortti:</div>
                    <div className="col-md-2 col-xs-2"><SvgImage name={player.extraCard} className="img-responsive" /></div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    <Cards
                      cards={player.playedCards}
                      roundsWon={player.roundsWon}
                      action={() => {}}
                      numOfPlayedRounds={props.game.numOfPlayedRounds}
                      cardsVisible={props.cardsVisible}
                      scale={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 col-xs-6 score">
            <table className="table table-striped score">
              <thead><tr>
                {keys(props.game.scores).map((player,i) => <th key={`player-${i}`}>{player}</th>)}
              </tr></thead>
              <tbody>
                {props.game.scoresHistory.map((history,i) => <ScoreRow scores={values(history)} unique={i} key={i} /> )}
                <ScoreRow scores={props.game.scores} unique={0} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
    {!props.user.email && <Redirect to="/" />}
  </div>
)

const ScoreRow = props => (
  <tr>{values(props.scores).map((score,i) => <td key={`score-${props.unique}${i}`}>{score}</td>)}</tr>
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
    showAllCards: () => dispatch(showAllCards())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesGame)
