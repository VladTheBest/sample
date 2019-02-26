import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import CreateForm from './CreateForm'

const CardContainer = styled(Card)`
  margin:10px;
`

const Title = styled.h5`
    margin-bottom: 0;
`

export default ({ onCreate }) => (
  <CardContainer>
    <CardHeader><Title>Create moderator</Title></CardHeader>
    <CardBody>
      <Row>
        <Col>
          <CreateForm
            onSubmit={onCreate} />
        </Col>
        <Col />
      </Row>
    </CardBody>

  </CardContainer>

)
