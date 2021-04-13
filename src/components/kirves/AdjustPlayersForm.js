import React from "react"
import { Field, reduxForm } from "redux-form"

import { RenderCheckbox, RenderMultiSelectInput } from '../shared/FormInput'

function getPlayerOptions(players) {
  return players.map(player => { return {label: player.nickname ? player.nickname : player.email, value:player.email}})
}

const AdjustPlayersForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="resetActivePlayers"
      label="Palauta kaikki takaisin peliin"
      type="checkbox"
      component={RenderCheckbox}
      normalize={v => !!v}
    />
    {props.adjustPlayersFormValues && !props.adjustPlayersFormValues.resetActivePlayers && (
      <Field
        name="inactivateByEmail"
        label="Poistettavat pelaajat"
        component={RenderMultiSelectInput}
        options={getPlayerOptions(props.players)}
      />
    )}
    <div className="row">
      <div className="col-md-3 col-md-offset-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={props.submitting}
        >
        Lisää/poista pelaajia
        </button>
      </div>
    </div>
  </form>
)

export default reduxForm({
    form: "adjustPlayersForm"
})(AdjustPlayersForm)
