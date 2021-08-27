import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, keys, values, without } from 'ramda'
import SockJsClient from 'react-stomp'

import { getGame, joinGame, action, showAllCards } from './kirvesActions'
import { autoLogin } from '../user/userActions'
import RenderGame from './renderGame'

const ActionButton = props => (
  <div className="col-md-2 col-xs-2">
    <button
      onClick={() =>
        props.action({
          gameId: props.gameId,
          action: props.actionName,
          declineCut: props.declineCut,
          keepExtraCard: props.keepExtraCard,
          speak: props.speak,
        })
      }
      className="btn btn-primary"
    >
      {props.label}
    </button>
  </div>
)

const SuitSelector = props => {
  const suits = without([props.currentTrump], ['CLUBS', 'SPADES', 'HEARTS', 'DIAMONDS'])
  return (
    <div>
      <h3>Valitse valtti</h3>
      <div className="row">
        {suits.map(suit => (
          <div className="col-md-1 col-xs-1" key={`suit-${suit}`}>
            <SvgImage
              name={`Suit${suit}`}
              className="img-responsive"
              onClick={() => props.action({ gameId: props.gameId, action: props.actionName, suit })}
            />
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
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/refresh']}
          onMessage={msg => {
            if (msg == props.game.id) {
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
            <ActionButton
              action={props.action}
              actionName="DEAL"
              gameId={props.game.id}
              label="Jaa"
            />
          )}
          {includes('FOLD', props.game.myAvailableActions) && (
            <ActionButton
              action={props.action}
              actionName="FOLD"
              gameId={props.game.id}
              label="Mene pakkaan"
            />
          )}
          {includes('CUT', props.game.myAvailableActions) && (
            <div>
              <ActionButton
                action={props.action}
                actionName="CUT"
                gameId={props.game.id}
                label="Nosta"
              />
              {props.game.canDeclineCut && (
                <ActionButton
                  action={props.action}
                  actionName="CUT"
                  gameId={props.game.id}
                  declineCut="true"
                  label="Älä nosta"
                />
              )}
            </div>
          )}
          {includes('ACE_OR_TWO_DECISION', props.game.myAvailableActions) && (
            <div>
              <ActionButton
                action={props.action}
                actionName="ACE_OR_TWO_DECISION"
                gameId={props.game.id}
                keepExtraCard="true"
                label="Pidä"
              />
              <ActionButton
                action={props.action}
                actionName="ACE_OR_TWO_DECISION"
                gameId={props.game.id}
                keepExtraCard="false"
                label="Hylkää"
              />
            </div>
          )}
          {includes('SPEAK', props.game.myAvailableActions) && (
            <div>
              <ActionButton
                action={props.action}
                actionName="SPEAK"
                gameId={props.game.id}
                speak="KEEP"
                label="Päältä"
              />
              <ActionButton
                action={props.action}
                actionName="SPEAK"
                gameId={props.game.id}
                speak="CHANGE"
                label="Värjäisin"
              />
              <ActionButton
                action={props.action}
                actionName="SPEAK"
                gameId={props.game.id}
                speak="PASS"
                label="Viitenä"
              />
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
          <div className="col-md-4 col-xs-4 pull-right">
            <p>Viestit:</p>
            <ul className="list-group" id="message-log">
              {props.game.messages.reverse().map((message, index) => (
                <li className="list-group-item" key={`li-${index}`}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <RenderGame
          game={props.game}
          isReplay={false}
          action={props.action}
          showAllCards={props.showAllCards}
          cardsVisible={props.cardsVisible}
        />
        <div className="row">
          <div className="col-md-6 col-xs-6 score pull-right">
            <table className="table table-striped score">
              <thead>
                <tr>
                  {keys(props.game.scores).map((player, i) => (
                    <th key={`player-${i}`}>{player}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.game.scoresHistory.map((history, i) => (
                  <ScoreRow scores={values(history)} unique={i} key={i} />
                ))}
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
  <tr>
    {values(props.scores).map((score, i) => (
      <td key={`score-${props.unique}${i}`}>{score}</td>
    ))}
  </tr>
)

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  game: path(['kirves', 'game'], state),
  cardsVisible: path(['kirves', 'cardsVisible'], state),
})

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = path(['match', 'params', 'id'], ownProps)
  return {
    getGame: dispatch(getGame(id)),
    autoLogin: dispatch(autoLogin()),
    join: gameId => dispatch(joinGame(gameId)),
    refresh: gameId => dispatch(getGame(gameId)),
    action: params => dispatch(action(params)),
    showAllCards: () => dispatch(showAllCards()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KirvesGame)
