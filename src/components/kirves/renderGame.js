import React from 'react'
import { includes } from 'ramda'

import { SvgImage, view, check } from '../shared/images'
import translate from '../shared/translate'

const Cards = props => {
  const s = props.scale || 1
  return (
    <div className="row">
      {props.cards.map((card, i) => (
        <div className={`col-md-${s} col-xs-${s}`} key={`card-${card}`}>
          <SvgImage
            name={card}
            className="img-responsive"
            onClick={() =>
              props.action({ gameId: props.gameId, action: props.actionName, index: i })
            }
          />
          {props.roundsWon.includes(i) &&
            (props.cardsVisible ? (
              <img src={check} width="10" height="10" />
            ) : (
              <BackCard lastCard={props.numOfPlayedRounds - 1 == i} />
            ))}
        </div>
      ))}
      {props.firstCardSuit && (
        <div className={`col-md-${s} col-xs-${s}`}>
          <SvgImage name={`Suit${props.firstCardSuit}`} className="img-responsive opaque50" />
        </div>
      )}
    </div>
  )
}

const BackCard = props => {
  if (props.lastCard) {
    setTimeout(() => {
      const element = document.getElementsByClassName('last-card')[0]
      if (element) {
        element.classList.remove('last-card')
      }
    }, 1500)
    return (
      <SvgImage
        name="back"
        className="img-responsive card-back last-card"
        onClick={event => hideForSeconds(event, 1.5)}
      />
    )
  } else return <SvgImage name="back" className="img-responsive card-back" />
}

function hideForSeconds(event, time) {
  const element = event.target
  element.classList.add('hidden')
  setTimeout(() => {
    element.classList.remove('hidden')
  }, time * 1000)
}

const RenderGame = props => (
  <div>
    {props.game.cutCard && (
      <div className="row">
        <div className="col-md-2 col-xs-2">Nostokortti:</div>
        <div className="col-md-1 col-xs-1">
          <SvgImage name={props.game.cutCard} className="img-responsive" />
        </div>
        {props.game.secondCutCard && (
          <div className="col-md-1 col-xs-1">
            <SvgImage name={props.game.secondCutCard} className="img-responsive opaque50" />
          </div>
        )}
      </div>
    )}
    <div className="row">
      <div className="col-md-2 col-xs-2">Valtti:</div>
      {props.game.trumpCard && (
        <div className="col-md-1 col-xs-1">
          <SvgImage name={props.game.trumpCard} className="img-responsive" />
        </div>
      )}
      {props.game.trump && (
        <div className="col-md-1 col-xs-1">
          <SvgImage name={`Suit${props.game.trump}`} className="img-responsive opaque50" />
        </div>
      )}
    </div>
    {!props.isReplay && (
      <div>
        <h4>Omat kortit:</h4>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <Cards
              cards={props.game.myCardsInHand}
              action={props.action}
              gameId={props.game.id}
              roundsWon={[]}
              actionName={
                includes('DISCARD', props.game.myAvailableActions) ? 'DISCARD' : 'PLAY_CARD'
              }
              firstCardSuit={props.game.firstCardSuit}
            />
          </div>
        </div>
      </div>
    )}
    {!props.isReplay && props.game.myExtraCard && (
      <div className="row">
        <div className="col-md-2 col-xs-2">Ylimääräinen kortti:</div>
        <div className="col-md-1 col-xs-1">
          <SvgImage name={props.game.myExtraCard} className="img-responsive" />
        </div>
      </div>
    )}
    <h2>
      Pelaajat
      {!props.isReplay && props.game.numOfPlayedRounds == 5 && (
        <img src={view} width="30" height="30" onClick={() => props.showAllCards()} />
      )}
    </h2>
    <div className="row">
      <div className="col-md-6 col-xs-6">
        {props.game.players.map(player => (
          <div key={player.email}>
            <h3>
              {player.nickname ? player.nickname : player.email}
              {props.game.dealer === player.email && ' (J)'}
              {player.availableActions.length > 0 && ' (V)'}
              {player.declaredPlayer && ' (P)'}
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
                <div className="col-md-2 col-xs-2">
                  <SvgImage name={player.extraCard} className="img-responsive" />
                </div>
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
    </div>
  </div>
)

export default RenderGame
