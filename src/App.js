import React from 'react';
import { useRoutes } from "hookrouter";
import routes from './router';
import MainNav from './components/Navbar';
import { Container } from 'react-bootstrap';
import NoResource from './components/NoResource';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';


const App = () => {
  const routeResult = useRoutes(routes);
  return (
    <>
      <MainNav />
      <Container style={{ marginTop: '70px' }}>
        {routeResult || <NoResource /> } 
      </Container>
    </>
  );
}

export default App;
