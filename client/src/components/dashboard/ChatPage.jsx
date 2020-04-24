import React from 'react'
import {Col, Card, InputGroup, FormControl, Nav, Button, ListGroup} from 'react-bootstrap'




export default function ChatPage(){
  return (
    <>
      <ChatSection/>
      <MainSection />
    </>
  )
}



function ChatSection(){
  return (
    <>
      <Col xs={6} md={4}>1 of 3
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Room 1</ListGroup.Item>
              <ListGroup.Item>Room 2</ListGroup.Item>
              <ListGroup.Item>Room 3</ListGroup.Item>
            </ListGroup>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">Message</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </Col>
    </>
  )
}




function MainSection(){
  return (
    <>
      <Col xs={12} md={8}>2 of 3
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}