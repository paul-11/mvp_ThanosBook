import React, {useState} from 'react'
import Navagation from './Navagation'
import {Container, Row} from 'react-bootstrap'

import AccountPage from './AccountPage.jsx'
import ChatPage from './ChatPage.jsx'
import AboutPage from './AboutPage.jsx'
import Media from './Media.jsx';


import CreateProfile from '../CreateProfile.jsx'

export default function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState('chat')
  return (
    <Container>
      <Row>
        <Navagation setCurrentComponent={setCurrentComponent}/>
      </Row>
      <Row >
        {currentComponent == 'chat' && <ChatPage />}
        {currentComponent == 'profile' && <AccountPage />}
        {currentComponent == 'about' && <AboutPage />}
        {currentComponent == 'create' && <CreateProfile />}
        {currentComponent == 'media' && <Media />}
      </Row>
    </Container>
  )
}


