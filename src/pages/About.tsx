import {Box, Paper} from "@mui/material";
import React from "react";
import './About.css';

function About(){
    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px', marginBottom: '20px'}} >
        <Box><button>about me</button></Box>
        </Paper>
    );
}

export default About;