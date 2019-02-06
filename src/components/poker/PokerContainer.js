import React from 'react'
import { connect } from 'react-redux'
import { path, includes, isEmpty } from 'ramda'
import converter from 'unicode-playing-card-converter'

import { deal, toggleHold, action } from './pokerActions'

const actions = [
  {
    value: 'STAY',
    label: 'Jää',
  },
  {
    value: 'HOLD',
    label: 'Jatka',
  },
]

const PokerContainer = props => (
  <div className="container">
    <h1>Pokeri</h1>
    <h2>Massia: {props.userMoney || props.user.money}</h2>
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <button onClick={() => props.deal()} className="btn btn-primary">
          Jaa
        </button>
      </div>
    </div>
    {props.game && (
      <div>
        <div className="row cards">
          {props.game.hand.map((card, index) => {
            const color = card.endsWith('c') || card.endsWith('s') ? 'black' : 'red'
            const held = includes(index, props.holds) ? 'held' : ''
            return (
              <div
                className={`col-md-2 col-xs-2 card ${color} ${held}`}
                key={card}
                onClick={() => props.toggleHold(index)}
              >
                {converter(card)}
              </div>
            )
          })}
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-6">{props.game.handValue}</div>
          <div className="col-md-6 col-xs-6">{
            isEmpty(props.game.availableActions) ? 'Voitto: ' : 'Panos: '
          }{props.game.money}</div>
        </div>
        <div className="row">
          {actions.map(a => (
            <ActionButton
              actionValue={a.value}
              label={a.label}
              game={props.game}
              key={a.value}
              action={props.action}
              holds={props.holds}
            />
          ))}
        </div>
      </div>
    )}
  </div>
)

const ActionButton = props => {
  return includes(props.actionValue, props.game.availableActions) ? (
    <div className="col-md-2 col-xs-2">
      <button
        onClick={() =>
          props.action({
            game: props.game,
            action: props.actionValue,
            holds: props.holds
          })}
      >
        {props.label}
      </button>
    </div>
  ) : null
}

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  game: path(['poker', 'game'], state),
  holds: path(['poker', 'holds'], state),
  userMoney: path(['poker', 'userMoney'], state)
})

const mapDispatchToProps = dispatch => ({
  deal: () => dispatch(deal()),
  toggleHold: index => dispatch(toggleHold(index)),
  action: params => dispatch(action(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PokerContainer)
