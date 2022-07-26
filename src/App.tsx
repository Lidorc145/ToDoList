import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { MissionList } from './features/mission/MissionList';
import './App.css';
import {Container} from "@mui/material";
import AppMenuBar from "./components/AppMenuBar";
import About from "./pages/About";

function App() {
  return (
      <BrowserRouter>
          <AppMenuBar/>
          <Container maxWidth={'xl'} fixed>
              <Routes>
                  <Route path="/"  element={<MissionList />} />
                  <Route path="about" element={<About />} />
                  <Route path="*" element={<p>Error 404: page not found</p>} />
              </Routes>
          </Container>
      </BrowserRouter>
  );
}

export default App;
