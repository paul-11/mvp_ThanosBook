import React,{useState} from 'react'
import {Card, ListGroup, Button, Row, Col, Nav, Image} from 'react-bootstrap'


const Profile = () => {
  return (
    <Col xs={6} md={4}>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Thanos Lord King</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Vormir, Klandaku System</ListGroup.Item>
          <ListGroup.Item>I am Thanos. Lord of Death. God of Balance. Look Upon My Works, Ye Mighty, And Despair!</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      
      </Card.Body>
    </Card>
  </Col>
  )
}


const ProfileMain = () => {
  const [profileTab, setProfileTab] = useState('friends')
  return (
    <Col xs={12} md={8}>
      <Card>
        <Card.Header>
          <Nav variant="tabs" 
               activeKey={profileTab}
               onSelect={(selectedKey) => setProfileTab(selectedKey)}
         >
            <Nav.Item>
              <Nav.Link eventKey='friends'>View Friends</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='album'>View Album</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
          {profileTab == 'friends' && <Friends />}
          {profileTab == 'album' && <Album />}
      </Card>
    </Col>
  )
}

const Friends = () => {
  return(
    <>
      <Card>
        <Card.Body>
          <Card.Title>Tony</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Robert</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  )
}
const Album = () => {
  return(
    <>
      <Card>
        <Card.Body>
          <Image src="holder.js/171x180" rounded />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Image src="holder.js/171x180" rounded />
        </Card.Body>
      </Card>
    </>
      

    )
}



export default function AccountPage(){
  return (
    <Row >
      <Profile />
      <ProfileMain />
    </Row>
  )
}

