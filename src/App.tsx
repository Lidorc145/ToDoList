import React from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {AppBar,Container,Paper,Box,Button, IconButton,Typography,Menu,Tooltip,Avatar,Toolbar,MenuItem} from "@mui/material";
import { Notes as NotesIcon } from '@mui/icons-material';
import AppMenuBar from "./components/AppMenuBar";

function App() {

  return (
      <BrowserRouter>
     <AppMenuBar/>
          <Routes>

              <Route path="counter" element={<Counter />} />
          </Routes>
      </BrowserRouter>

/*
    <div className="App">
      <AppBar position="static" color="primary">
        default
      </AppBar>
      <Container>
      <Paper variant="outlined" square elevation={1}>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Routes>

            <Route path="counter" element={<Counter />} />
          </Routes>
        </BrowserRouter>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      </Paper>
      </Container>
    </div>*/
  );
}


export default App;
