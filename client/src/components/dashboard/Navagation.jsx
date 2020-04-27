import React from 'react'
import {Nav} from 'react-bootstrap'

export default function Navagation({setCurrentComponent}) {
  return (
  <Nav
    activeKey="chat"
    onSelect={(selectedKey) => setCurrentComponent(selectedKey)}
  >
    <Nav.Item>
      <Nav.Link eventKey="chat">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="about">About</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="profile">Profile</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/">Log Out</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" disabled>
        Stay Cool
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="create">New User</Nav.Link>
    </Nav.Item>
  </Nav>
  )
}
