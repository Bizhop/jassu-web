import React from "react"
import { Field, reduxForm } from "redux-form"
import { reject, append } from "ramda"

import translate from "../shared/translate"
import { RenderSelectInput } from '../shared/FormInput'

function getOptions(valtti) {
  const initialValues = 
    ["DIAMONDS", "HEARTS", "SPADES", "CLUBS"]
      .map(valtti => { return {name: translate(valtti), value: valtti}})

  return append({name: `Nykyinen (${translate(valtti)})`, value: valtti}, reject(obj => obj.value === valtti, initialValues))
}

const SetValttiForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="valtti"
      label="Valtti"
      type="select"
      component={RenderSelectInput}
      options={getOptions(props.valtti)}
    />
    <button
      type="submit"
      className="btn btn-primary"
      disabled={props.submitting || props.pristine}
    >
     Aseta Valtti
    </button> 
  </form>
)

export default reduxForm({
    form: "setValttiForm"
})(SetValttiForm)
