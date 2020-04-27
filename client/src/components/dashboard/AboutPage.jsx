import React from 'react'
import {Container, Card, Button, Col, Row} from 'react-bootstrap'

export default function AboutPage(){
  return (
    <Container>

      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://mvp-hr.s3-us-west-1.amazonaws.com/ironman.jpg" style={{ height: '400px' }}/>
            <Card.Body>
              <Card.Title>Brandon Gomez</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://mvp-hr.s3-us-west-1.amazonaws.com/main-qimg-2c8df03cd85570e89e01079abaec5778.jpeg" style={{ height: '400px' }}/>
            <Card.Body>
              <Card.Title>Paul Yi</Card.Title>
              <Card.Text>
                I am a full stack developer who loves to puzzles and use that passion to solve modern day problems in the tech industry.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://mvp-hr.s3-us-west-1.amazonaws.com/Spiderman-Avengers-Infinity-War-iPhone-Wallpaper.jpg" style={{ height: '400px' }}/>
            <Card.Body>
              <Card.Title>Bertrand Shao</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://mvp-hr.s3-us-west-1.amazonaws.com/Thanos.jpg" style={{ height: '400px' }}/>
            <Card.Body>
              <Card.Title>Nick Lopez</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}