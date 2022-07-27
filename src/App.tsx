import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MissionList} from './features/mission/MissionList';
import './App.css';
import {Container} from "@mui/material";
import AppMenuBar from "./components/AppMenuBar";
import About from "./pages/About";
import packageJson from '../package.json';

function App() {
    return (
        <BrowserRouter>
            <AppMenuBar/>
            <Container maxWidth={'xl'} fixed>
                <Routes>
                    <Route path={packageJson.homepage+"/"} element={<MissionList/>}/>
                    <Route path={packageJson.homepage+"/about"} element={<About/>}/>
                    <Route path={packageJson.homepage+"/*"} element={<p>Error 404: page not found</p>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
