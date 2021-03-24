import React from "react"
import { Field, reduxForm } from "redux-form"
import { reject, append } from "ramda"
import translate from "../shared/translate"

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

export const RenderSelectInput = ({ input, label, type, options, meta: { touched, error } }) => {
  const optionList = options.map(opt => (
    <option key={opt.value} value={opt.value}>
      {opt.name}
    </option>
  ))
  return (
    <div className="form-group form-inline">
      <div className="row">
        <div className="col-md-3">
          <label className="form-control-label pull-right" htmlFor={input.name}>
            {label}
          </label>
        </div>
        <div className="col-md-3">
          <select className="form-control" {...input} type={type}>
            <option value="">Valitse...</option>
            {optionList}
          </select>
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    </div>
  )
}

export default reduxForm({
    form: "setValttiForm"
})(SetValttiForm)
