import React from 'react';
import logo from './logo.svg';
import './App.css';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Main from './components/Main';


function App() {
  return (
      <Container className="App">
          <Typography variant="h4" component="h1" gutterBottom>
            Create your optimal Starbucks diet!
          </Typography>
          <Main/>
      </Container>
  );
}

export default App;
