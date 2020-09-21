import React,  { useEffect, useState } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { navigate } from "hookrouter"
import toast from 'toastr';

toast.options = {
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
}

const Profile = () => {
  const [profile, setData] = useState({});
  const [updateProfile, setUpdateProfile] = useState({})

  useEffect(() => {
    const isSignIn =  localStorage.jwtToken;
    if(!isSignIn) {
      toast.error('You have to signin or signup to access that page')
      return navigate('/')
    }

    const fetchProfile = async () => {
      const response = 
        await axios.get(`https://user-system-backend.herokuapp.com/api/v1/user-profile?token=${localStorage.jwtToken}`);
      setData(response.data.data.userDetail);
      setUpdateProfile({...response.data.data.userDetail})
    };
    fetchProfile();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setUpdateProfile({ 
      ...updateProfile,
      [name]: value 
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updateData = {
        ...profile,
        ...updateProfile
      }
      if(updateData.email === '' ) {
        updateData.email = profile.email;
      }
      
      const responses = await axios.post(`https://user-system-backend.herokuapp.com/api/v1/update-profile?token=${localStorage.jwtToken}`, updateData);
      localStorage.setItem('jwtToken', responses.data.data.token);
      toast.success('Profile updated')
    } catch(error) {
      toast.error('An error occurred')
    };
  }

  const handleClose = () => navigate('/', true); 
  

  return(
  <>
    <Card className="text-center" 
    style={{ 
      width: '60%' , 
      margin: '0 auto'
    }}>
    <Card.Header>Profile</Card.Header>
    <Card.Body>
    <Form>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="email" 
          placeholder="email@example.com" 
          onChange={handleChange}
          name="email"
          value={updateProfile.email}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          First name
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder="First Name" 
          name="firstName"
          value={updateProfile.firstName}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          Last name
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder="Last Name" 
          name="lastName"
          value={updateProfile.lastName}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
        Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder=" Phone Number" 
          name="phoneNumber"
          value={updateProfile.phoneNumber}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder="Address" 
          name="address"
          value={updateProfile.address}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
            Age
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder="age" 
          name="age"
          value={updateProfile.age}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
            Gender
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="text" 
          placeholder="gender" 
          name="gender"
          value={updateProfile.gender}
          onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Form>
    </Card.Body>
    <Card.Footer className="text-muted">
    <Button 
        variant="primary"
        style={{ marginRight: '30px'}}
        onClick={handleSubmit}
        >
        Update
      </Button>
      <Button 
        variant="danger"
        onClick={handleClose}
        >
        Cancel
      </Button>

    </Card.Footer>
  </Card>
  </>
  )
};

export default Profile;