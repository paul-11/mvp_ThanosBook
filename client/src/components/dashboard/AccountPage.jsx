import React,{useState, useEffect,Component } from 'react'
import { Card, ListGroup, Button, Row, Col, Nav, Image, Form } from 'react-bootstrap'
import axios from 'axios'
import Media from './Media'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import { array } from 'prop-types'

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
    <Col>
      <Card style={{ width: '18rem' }}>
        <Card.Img style={{ width: '18rem', height: '18rem', boxShadow: '0 5px 10px 2px rgba(190,185,185,.5)' }} variant="top" src={props.profilePic} />
        <Form style={{ alignSelf: "center", color: "#007BFF" }}>
          <Form.File id="formcheck-api-regular">
            <Form.File.Label>Upload a Profile Pic!</Form.File.Label>
            <div id="oc-alert-container" style={{font: "000000"}}></div>{/* Single File Upload*/}
            <Form.File.Input style={{ color: "#007BFF" }} onChange={props.singleFileChangedHandler} />
          </Form.File>
        </Form>
        <Button variant="primary" style={{ width: "12rem", alignSelf: "center", marginTop: '5px' }} onClick={props.profileImageUploadHandler}>Upload Image</Button>{' '}
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


const ProfileMain = (props) => {
  const [profileTab, setProfileTab] = useState('friends')
  return (
    <Col >
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
              <Nav.Link eventKey='album'>Posted Images</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        {profileTab == 'friends' && <Friends />}
        {profileTab == 'album' && <Album images={props.images} singleFileChangedHandler={props.singleFileChangedHandler} singleFileUploadHandler={props.singleFileUploadHandler} ocShowAlert={props.ocShowAlert} />}
      </Card>
    </Col>
  )
}

const Friends = () => {
  return (
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
const Album = (props) => {

  return (
    <>
      <Card>
        <Card.Body>
          <Media images={props.images} singleFileChangedHandler={props.singleFileChangedHandler} singleFileUploadHandler={props.singleFileUploadHandler} ocShowAlert={props.ocShowAlert} />
        </Card.Body>
      </Card>
    </>
  )
}



export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      username: "test",
      profilePic: "https://nvmbucket.s3-us-west-2.amazonaws.com/profile-placeholder.png",
      images: []
    }
    this.singleFileChangedHandler = this.singleFileChangedHandler.bind(this);
    this.singleFileUploadHandler = this.singleFileUploadHandler.bind(this);
    this.profileImageUploadHandler = this.profileImageUploadHandler.bind(this);
    this.ocShowAlert = this.ocShowAlert.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  getImages() {
    const data = {
      username: this.state.username,
    }
    console.log("DATA:",data)
    axios.get(`/media/images/${this.state.username}`)
    .then((result)=>{
      console.log("RESULT", result);
      this.setState({
        profilePic: result.data.profPic || "https://nvmbucket.s3-us-west-2.amazonaws.com/profile-placeholder.png",
        images: result.data.images
      })
      console.log(this.state)
    })
    .catch((err)=>{
      console.log("ERROR",err);
    })

  }

  // single file on change handler
  singleFileChangedHandler(event) {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  // single file image upload
  profileImageUploadHandler(event) {
    const data = new FormData();// If file selected
    if (this.state.selectedFile) {
      console.log(this.state.name)
      data.append('profileImage', this.state.selectedFile, `${this.state.username}-${this.state.selectedFile.name}`);
      for (var value of data.values()) {
        console.log("THIS", value);
      }
      axios.post('/media/profile-img-upload', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
        .then((response) => {
          if (200 === response.status) {
            console.log("THIS IS THE PROFILE", response)
            const data = {
              username: this.state.username,
              profPic: response.data.location
            }
            axios.post("/media/profileImage", data)
            .then((result=> {
              console.log("Success")
              return;
            }))
            .then(()=>{
              this.componentDidMount()
            })
            .catch((err)=> {
              console.log("error")
            })
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                this.ocShowAlert('Max size: 2MB', 'red');
              } else {
                console.log(response.data);// If not the given file type
                this.ocShowAlert(response.data.error, 'red');
              }
            } else {
              // Success
              let fileName = response.data;
              console.log('fileName', fileName);
              this.ocShowAlert('File Uploaded', '#FFFFFF');
            }
          }
        }).catch((error) => {
          // If another error
          this.ocShowAlert(error, 'red');
        });
    } else {
      // if file not selected throw error
      this.ocShowAlert('Please upload file', 'red');
    }
  };

  // single file image upload
  singleFileUploadHandler(event) {
    const data = new FormData();// If file selected
    if (this.state.selectedFile) {
      console.log(this.state.name)
      data.append('profileImage', this.state.selectedFile, `${this.state.username}-${this.state.selectedFile.name}`);
      for (var value of data.values()) {
        console.log("THIS", value);
      }
      axios.post('/media/profile-img-upload', data, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
      })
        .then((response) => {
          if (200 === response.status) {
            console.log("THE RESPONSE", response)
            const data = {
              username: this.state.username,
              images: response.data.location
            }
            axios.post("/media/images", data)
            .then((result=> {
              console.log("Success")
              return;
            }))
            .then(()=>{
              this.componentDidMount()
            })
            .catch((err)=> {
              console.log("error")
            })
            // If file size is larger than expected.
            if (response.data.error) {
              if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                this.ocShowAlert('Max size: 2MB', 'red');
              } else {
                console.log(response.data);// If not the given file type
                this.ocShowAlert(response.data.error, 'red');
              }
            } else {
              // Success
              let fileName = response.data;
              console.log('fileName', fileName);
              this.ocShowAlert('File Uploaded', '#FFFFFF');
            }
          }
        }).catch((error) => {
          // If another error
          this.ocShowAlert(error, 'red');
        });
    } else {
      // if file not selected throw error
      this.ocShowAlert('Please upload file', 'red');
    }
  };



  // ShowAlert Function
  ocShowAlert(message, background = '#3089cf') {
    let alertContainer = document.querySelector('#oc-alert-container'),
      alertEl = document.createElement('div'),
      textNode = document.createTextNode(message);
    alertEl.setAttribute('class', 'oc-alert-pop-up');
    $(alertEl).css('background', background);
    alertEl.appendChild(textNode);
    alertContainer.appendChild(alertEl);
    setTimeout(function () {
      $(alertEl).fadeOut('slow');
      $(alertEl).remove();
    }, 3000);
  };

  componentDidMount(){
    var url = window.location.href.replace(/\/$/,'');
    var lastSeg = url.substr(url.lastIndexOf('/') + 1);
    this.setState({
      username:lastSeg
    })
    setTimeout(()=>{this.getImages()})
  }

  render() {

    return (
      <Row xs={12} style={{ width: "100%" }}>
        <Col xs={4}>
          <Profile profilePic={this.state.profilePic}singleFileChangedHandler={this.singleFileChangedHandler} profileImageUploadHandler={this.profileImageUploadHandler} ocShowAlert={this.ocShowAlert} />
        </Col>
        <Col xs={8}>
          <ProfileMain images={this.state.images} singleFileChangedHandler={this.singleFileChangedHandler} singleFileUploadHandler={this.singleFileUploadHandler} ocShowAlert={this.ocShowAlert} />
        </Col>
      </Row>
    )
  }
}

