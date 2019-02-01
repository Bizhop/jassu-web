import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'

import { deal } from './pokerActions'

const PokerContainer = props => (
  <div className="container">
    <h1>Pokeri</h1>
    <div className="row">
      <div className="col-md-6 col-xs-6">
        <button onClick={() => props.deal()} className="btn btn-primary">
          Jaa
        </button>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  user: R.path(['user'], state),
  error: R.path(['user', 'error'], state),
})

const mapDispatchToProps = dispatch => ({
  deal: params => dispatch(deal(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PokerContainer)
