import React from "react"
import { Field, reduxForm } from "redux-form"

import { RenderTextInput } from "../shared/FormInput"

const UpdateUserForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="nickname"
      label="Nickname"
      type="text"
      component={RenderTextInput}
    />
    <button
      type="submit"
      className="btn btn-primary"
      disabled={props.submitting || props.pristine}
    >
     Päivitä käyttäjä
    </button> 
  </form>
)

export default reduxForm({
    form: "updateUserForm"
})(UpdateUserForm)
