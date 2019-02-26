import React from 'react'
import { Button, FormGroup, Label } from 'reactstrap'
import { AvField, AvForm } from 'availity-reactstrap-validation'
import { withFormik } from 'formik'

const CreateForm = ({ values, handleSubmit, handleChange, isSubmitting }) => (
  <AvForm onValidSubmit={() => handleSubmit()}>
    <FormGroup>
      <AvField
        label='Username'
        type='text'
        value={values.username}
        onChange={handleChange}
        name='username'
        validate={{
          required: { value: true, errorMessage: 'Username is required' },
          pattern: {
            value: '^[A-Za-z0-9.]+$',
            errorMessage: 'Username must be composed only with letter and numbers and dots'
          },
          minLength: { value: 4, errorMessage: 'Username must be between 4 and 255 characters' },
          maxLength: { value: 255, errorMessage: 'Username must be between 4 and 255 characters' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <AvField
        label='Password'
        type='password'
        value={values.password}
        onChange={handleChange}
        name='password'
        validate={{
          required: { value: true, errorMessage: 'Password is required' },
          pattern: { value: '^[A-Za-z0-9]+$', errorMessage: 'Password must be composed only with letter and numbers' },
          minLength: { value: 4, errorMessage: 'Password must be between 4 and 255 characters' },
          maxLength: { value: 255, errorMessage: 'Password must be between 4 and 255 characters' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <AvField
        label='Confirm password'
        type='password'
        value={values.confirm_password}
        onChange={handleChange}
        name='confirm_password'
        validate={{
          required: true,
          match: { value: 'password', errorMessage: 'The password confirmation does not match.' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <AvField
        label='Email'
        type='email'
        value={values.email}
        onChange={handleChange}
        name='email'
        validate={{
          email: true
        }}
      />
    </FormGroup>
    <FormGroup>
      <Label for='first_name-field'>First name</Label>
      <AvField
        type='text'
        value={values.first_name}
        onChange={handleChange}
        name='first_name'
        validate={{
          maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <Label for='last_name-field'>Last name</Label>
      <AvField
        type='text'
        value={values.last_name}
        onChange={handleChange}
        name='last_name'
        validate={{
          maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <Label for='phone-field'>Phone</Label>
      <AvField
        type='text'
        value={values.phone}
        onChange={handleChange}
        name='phone'
        validate={{
          maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' }
        }}
      />
    </FormGroup>
    <FormGroup>
      <Label for='role-field'>Role</Label>
      <AvField
        type='select'
        value={values.role}
        onChange={handleChange}
        name='role'>
        <option>admin</option>
        <option>manager</option>
      </AvField>
    </FormGroup>
    <Button
      type='submit'
      color='success'
      disabled={isSubmitting}
    >Create</Button>

  </AvForm>

)

export default withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
    email: '',
    last_name: '',
    phone: '',
    role: 'manager',
    // eslint-disable-next-line camelcase
    first_name: ''
    // eslint-disable-next-line camelcase
  }),

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },

  displayName: 'CreateForm' // helps with React DevTools
})(CreateForm)
