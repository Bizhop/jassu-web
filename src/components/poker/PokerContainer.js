import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { path, includes, isEmpty } from 'ramda'

import { deal, toggleHold, action } from './pokerActions'
import { autoLogin } from '../user/userActions'

const actions = [
  {
    value: 'STAY',
    label: 'Lopeta',
    style: 'btn-warning',
  },
  {
    value: 'HOLD',
    label: 'Jatka',
    style: 'btn-success',
  },
  {
    value: 'DOUBLE_HIGH',
    label: 'Suuri',
    style: 'btn-danger btn-sm',
  },
  {
    value: 'DOUBLE_LOW',
    label: 'Pieni',
    style: 'btn-danger btn-sm',
  },
]

const PokerContainer = props => (
  <div className="container">
    <h1>Pokeri</h1>
    <h2>Massia: {props.userMoney || props.user.money}</h2>
    {props.game && (
      <div>
        <div className="row cards">
          {props.game.hand.map((card, index) => {
            const held = includes(index, props.holds) ? 'held' : ''
            return (
              <div
                className={`col-md-2 col-xs-2 card`}
                key={card}
                onClick={() =>
                  includes('HOLD', props.game.availableActions) && props.toggleHold(index)
                }
              >
                <CardImage name={card} />
                <div className={`overlay ${held}`} />
              </div>
            )
          })}
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-6">{props.game.handValue}</div>
          <div className="col-md-6 col-xs-6">
            {isEmpty(props.game.availableActions) ? 'Voitto: ' : 'Panos: '}
            {props.game.money}
          </div>
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
    {(!props.game || isEmpty(props.game.availableActions)) && (
      <div className="row">
        <div className="col-md-6 col-xs-6">
          <button onClick={() => props.deal()} className="btn btn-primary">
            Jaa
          </button>
        </div>
      </div>
    )}
    {props.multipliers && (
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <table className="table table-striped custom-table">
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
        </div>
      </div>
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
            holds: props.holds,
          })
        }
      >
        {props.actionProps.label}
      </button>
    </div>
  ) : null
}

const CardImage = props => {
  const image = require('../../assets/' + props.name + '.svg')
  return <img src={image} className="img-responsive" />
}

const mapStateToProps = state => ({
  user: path(['user'], state),
  error: path(['user', 'error'], state),
  game: path(['poker', 'game'], state),
  holds: path(['poker', 'holds'], state),
  userMoney: path(['poker', 'userMoney'], state),
  multipliers: path(['poker', 'game', 'multipliersTable'], state),
})

const mapDispatchToProps = dispatch => ({
  autoLogin: dispatch(autoLogin()),
  deal: () => dispatch(deal()),
  toggleHold: index => dispatch(toggleHold(index)),
  action: params => dispatch(action(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokerContainer)
