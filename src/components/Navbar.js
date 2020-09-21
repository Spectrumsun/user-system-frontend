import React from "react";
import { Navbar } from 'react-bootstrap';
import { A, navigate } from "hookrouter";
import jwt from 'jsonwebtoken';


const MainNav = () =>  {
  const token  = () => {
    const token = localStorage.jwtToken;
    return  token ? jwt.decode(token): false;
  }

  const logout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/', true); 
  }

  return(
  <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href='/'>User System</Navbar.Brand>
    <A href='/' style={styles}>Home</A>
    {
      !token() && (  
      <>
        <A href='/signup' style={styles}>Signup</A>
        <A href='/signin' style={styles}>Sign in</A>
      </>
    )
    }
    {
      token() && ( 
        <>
          <A href="/profile" style={styles}>Profile</A>
          <A href="/logout" style={styles} onClick={logout}>Logout</A>
        </>
      )
    }
    {
     token() && token().role === 'Admin' && 
          (<A 
              href="/admin-dashboard" 
              variant="outline-dark" 
              style={styles}>
                Admin Menu
          </A>)
        }
  {
    token() && (
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{token().email}</a>
          </Navbar.Text>
      </Navbar.Collapse>
    )
  }
    >
  </Navbar>
  </>
  )
};

const styles = {
  marginLeft: '20px',
  color: 'white'
}

export default MainNav;