import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
const Home = () =>  {

  const token  = () => {
    const token = localStorage.jwtToken;
    return  token ? jwt.decode(token): false;
  }
 
  return  (
  <>
    <Jumbotron style={{ marginBottom: '0px'}}>
        {  token() ? (<h1>Hi {token().email.split('@')[0]}</h1>)
          : (<h1>Welcome to User system!</h1>)
        } 
        <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
        </p>
        <p>
      </p>
    </Jumbotron>
    <div>
      <img 
        src="https://images.unsplash.com/photo-1573495628363-7114730a4a11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        alt="sample"
        style={{ width: '100%'}}
      />
    </div>
   
  </>
)
}

export default Home;