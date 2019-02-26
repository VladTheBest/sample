import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import styled from 'styled-components'
import EditForm from './EditForm'

const CardContainer = styled(Card)`
  margin:10px;
`
const Title = styled.h5`
    margin-bottom: 0;
`
export default ({ user, loading, onSave }) => (
  <CardContainer>
    <CardHeader><Title>Edit moderator <b>{user.username}</b></Title></CardHeader>
    <CardBody>
      {!loading && !!Object.keys(user).length && <EditForm
        user={user}
        onSubmit={onSave}
      />}
    </CardBody>

  </CardContainer>

)
