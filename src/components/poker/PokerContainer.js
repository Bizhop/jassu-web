import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, isEmpty } from 'ramda'
import converter from 'unicode-playing-card-converter'

import { deal, toggleHold, action } from './pokerActions'

const actions = [
  {
    value: 'STAY',
    label: 'Jää',
    style: 'btn-warning'
  },
  {
    value: 'HOLD',
    label: 'Jatka',
    style: 'btn-success'
  },
]

const PokerContainer = props => (
  <div className="container">
    <h1>Pokeri</h1>
    <h2>Massia: {props.userMoney || props.user.money}</h2>
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
              actionProps={a}
              game={props.game}
              key={a.value}
              action={props.action}
              holds={props.holds}
            />
          ))}
        </div>
      </div>
    )}
    {(!props.game || isEmpty(props.game.availableActions)) && (
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <button onClick={() => props.deal()} className="btn btn-primary">
            Jaa
          </button>
        </div>
      </div>
    )}
    {props.multipliers && (
      <table className="table table-striped">
        <thead>
        <tr>
          <th>Käsi</th>
          <th>Kerroin</th>
        </tr>
        </thead>
        <tbody>
        {props.multipliers.map(m => (
          <tr key={m.name}>
            <td>{m.name}</td>
            <td>{m.value}</td>
          </tr>
        ))}
        </tbody>
      </table>
    )}
    {!props.user.email && <Redirect to="/" />}
  </div>
)

const ActionButton = props => {
  return includes(props.actionProps.value, props.game.availableActions) ? (
    <div className="col-md-2 col-xs-2">
      <button
        className={`btn ${props.actionProps.style}`}
        onClick={() =>
          props.action({
            game: props.game,
            action: props.actionProps.value,
            holds: props.holds
          })}
      >
        {props.actionProps.label}
      </button>
    </div>
  ) : null
}

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  game: path(['poker', 'game'], state),
  holds: path(['poker', 'holds'], state),
  userMoney: path(['poker', 'userMoney'], state),
  multipliers: path(['poker', 'game', 'multipliersTable'], state)
})

const mapDispatchToProps = dispatch => ({
  deal: () => dispatch(deal()),
  toggleHold: index => dispatch(toggleHold(index)),
  action: params => dispatch(action(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PokerContainer)
