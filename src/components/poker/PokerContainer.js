import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import converter from 'unicode-playing-card-converter'

import { deal } from './pokerActions'

const PokerContainer = props => (
  <div className="container">
    <h1>Pokeri</h1>
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <button onClick={() => props.deal()} className="btn btn-primary">
          Jaa
        </button>
        {props.hand && (
          <div>
            <div className="row">
              {props.hand.map(card => {
                const color = card.endsWith('c') || card.endsWith('s') ? 'black' : 'red'
                return (
                  <div className={`col-md-2 col-xs-2 card ${color}`} key={card}>
                    {converter(card)}
                  </div>
                )
              })}
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-6">{props.game.handValue}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: R.path(['user'], state),
  error: R.path(['user', 'error'], state),
  hand: R.path(['poker', 'game', 'hand'], state),
  game: R.path(['poker', 'game'], state),
})

const mapDispatchToProps = dispatch => ({
  deal: params => dispatch(deal(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PokerContainer)
