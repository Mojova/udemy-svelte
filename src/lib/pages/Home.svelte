<script>
  import Button from "../Button.svelte";
  import Form from "../form/Form.svelte";
  import Field from "../form/Field.svelte";
  import { validateEmail, validateRequiredField } from "../utils/validation.js";
</script>

<Form
  on:submit={(e) => console.log(e.detail)}
  initialValues={{ username: "test", email: "test@test.com" }}
  let:hasErrors
  let:values
  let:errors
>
  {JSON.stringify(values)}
  {JSON.stringify(errors)}
  <Field
    label="Username"
    name="username"
    type="text"
    validate={validateRequiredField}
    ><p style:color="green" slot="error" let:error>{error}</p></Field
  >
  <Field
    label="Email"
    name="email"
    type="email"
    validate={(value, label) => {
      return validateRequiredField(value, label) || validateEmail(value, label);
    }}
  />
  <Field
    label="Password"
    name="password"
    type="password"
    validate={validateRequiredField}
  />
  <Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>
<Form
        on:submit={(e) => console.log(e.detail)}
        let:hasErrors
        let:values
        let:errors
>
  <Field
          label="Username"
          name="username2"
          type="text"
          validate={validateRequiredField}
  ><p style:color="green" slot="error" let:error>{error}</p></Field
  >
  <Field
          label="Email"
          name="email2"
          type="email"
          validate={(value, label) => {
      return validateRequiredField(value, label) || validateEmail(value, label);
    }}
  />
  <Field
          label="Password"
          name="password2"
          type="password"
          validate={validateRequiredField}
  />
  <Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>