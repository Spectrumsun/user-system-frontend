import React,  { useState } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { navigate } from "hookrouter"
import toast from 'toastr';
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

toast.options = {
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
}

const Signup = () => {
  const [inputValue, setValue] = useState({
    email: '',
    password: ''
  });

  const [validated, setValidated] = useState(true);

  const handleChange = (e) => {
    const  { name, value } = e.target;
    e.preventDefault();
    setValue({ ...inputValue, [name]: value })
    setValidated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const checkEmail =  re.test(String(inputValue.email).toLowerCase());
    if (!checkEmail) {
        toast.error('Provide a valid email')
        setValidated(true);
        return 
    }

    if (inputValue.password === '') {
        toast.error('Password cannot be empty')
        setValidated(true);
        return 
    }
  
    try {
      const responses = await axios.post('https://user-system-backend.herokuapp.com/api/v1/signup', inputValue);
      localStorage.setItem('jwtToken', responses.data.data.token);
      navigate('/', true); 
      toast.success('Account created ')
    } catch(error) {
      toast.error('Email already exist')
    };
  }
  
  return(
  <>
    <Card className="text-center" 
    style={{ 
      width: '56%' , 
      margin: '0 auto'
    }}>
    <Card.Header style={{ fontSize: "30px" }}>Signup</Card.Header>
    <Card.Body>
    <Form validated={!validated}>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type="email" 
          placeholder="email@example.com" 
          onChange={handleChange}
          name="email"
          required
          />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Email.
            </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Form.Label column sm="2" style={{ textAlign: 'left'}}>
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control 
          type="password" 
          placeholder="Password" 
          name="password"
          onChange={handleChange}
          required
          />
          <Form.Control.Feedback type="invalid">
              Please enter a strong password.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </Form>
    </Card.Body>
    <Card.Footer className="text-muted">     
      <Button 
        variant="primary"
        onClick={handleSubmit}
        disabled={validated}
        >
        Submit
      </Button>
    </Card.Footer>
  </Card>
  </>
  )
};

export default Signup;