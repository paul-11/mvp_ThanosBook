import React,{useState, useEffect } from 'react'
import {Card, ListGroup, Button, Row, Col, Nav, Image} from 'react-bootstrap'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState([])

  useEffect(()=>{
    axios.get(`search/user/notThanos`)
    .then((res)=>setProfile(res.data[0]))
    .catch((err)=>console.log(err))
  }, [])

  // const getAge = (birthday) => {
  //   console.log(birthday.length)
  //   // return (2020 - (parseInt(birthday.substr(birthday.length - 4))) > 18)
  // }

  return (
    <Col xs={6} md={4}>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{profile.first} {profile.last}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>username: {profile.username}</ListGroup.Item>
          <ListGroup.Item>birthday: {profile.birthday}</ListGroup.Item>
          <ListGroup.Item>{profile.about}</ListGroup.Item>
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

