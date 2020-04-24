import React from 'react'
import Navagation from './Navagation'
import {Container, Row, Col} from 'react-bootstrap'
import ChatSection from './ChatSection'
import MainSection from './MainSection'


export default function Dashboard() {
  return (
    <Container>
      <Row>
        <Navagation />
      </Row>
      <Row >
        <ChatSection />
        <MainSection />
      </Row>
    </Container>
  )
}

