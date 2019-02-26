import React from 'react'
import { AvField, AvForm } from 'availity-reactstrap-validation'
import { withFormik } from 'formik'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledCard = styled(Card)`
    margin-bottom: 20px;
`
const EditForm = ({ values, handleSubmit, handleChange, isSubmitting }) => (
  <AvForm onValidSubmit={handleSubmit}>
    <Row>
      <Col sm={{ size: 4, order: 2 }}>
        <StyledCard>
          <CardHeader><b>Moderator status</b></CardHeader>
          <CardBody>
            <div>Last update: {values.updated_at}</div>
            <div>Created at: {values.created_at}</div>
            {values?.creator && <div>Created by: <Link to={'/moderator/' + values.creator?.id}>
              {values.creator?.username}
            </Link></div>}
            <br />
            <AvField
              label='Role'
              type='select'
              value={values.role}
              onChange={handleChange}
              name='role'>
              <option>admin</option>
              <option>manager</option>
            </AvField>
          </CardBody>
        </StyledCard>
        <StyledCard>
          <CardHeader><b>Change password</b></CardHeader>
          <CardBody>
            <AvField
              label='New password'
              type='password'
              onChange={handleChange}
              value={values.password}
              name='password'
              validate={{
                pattern: {
                  value: '^[A-Za-z0-9]+$',
                  errorMessage: 'Password must be composed only with letter and numbers'
                },
                minLength: { value: 4, errorMessage: 'Password must be between 4 and 255 characters' },
                maxLength: { value: 255, errorMessage: 'Password must be between 4 and 255 characters' }
              }}
            />
            {values.password &&

            <AvField
              label='Confirm new password'
              type='password'
              onChange={handleChange}
              name='confirm_password'
              validate={{
                required: true,
                match: { value: 'password', errorMessage: 'The password confirmation does not match.' }
              }}
            />}
          </CardBody>
        </StyledCard>
      </Col>
      <Col sm={{ size: 8, order: 1 }}>
        <StyledCard>
          <CardHeader><b>Moderator info</b></CardHeader>
          <CardBody>
            <AvField
              label='Username'
              type='text'
              readOnly
              value={values.username}
              onChange={handleChange}
              name='username' />
            <AvField
              label='Email'
              type='email'
              value={values.email}
              onChange={handleChange}
              name='email'
              validate={{
                email: true
              }} />
            <AvField
              label='First name'
              type='text'
              value={values.first_name}
              onChange={handleChange}
              name='first_name'
              validate={{
                maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' }
              }} />
            <AvField
              label='Last name'
              type='text'
              value={values.last_name}
              onChange={handleChange}
              name='last_name'
              validate={{
                maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' }
              }} />
            <AvField
              label='Phone'
              type='text'
              value={values.phone}
              onChange={handleChange}
              name='phone'
              validate={{
                maxLength: { value: 255, errorMessage: 'Username must be less than 255 characters' },
                pattern: {
                  value: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
                  errorMessage: 'Phone must be in format "123-123-1234"'
                }
              }} />

          </CardBody>
        </StyledCard>
        <Button
          type='submit'
          color='success'
          disabled={isSubmitting}>
          Save
        </Button>
      </Col>
    </Row>
  </AvForm>
)

export default withFormik({
  mapPropsToValues: ({ user }) => {
    const fields = [
      'id',
      'email',
      'username',
      'phone',
      'role',
      'first_name',
      'last_name',
      'updated_at',
      'created_at',
      'creator'
    ]

    return fields
      .reduce((acc, key) => {
        acc[key] = user[key]
        return acc
      }, {})
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values, setSubmitting)
  },

  displayName: 'EditForm' // helps with React DevTools
})(EditForm)
