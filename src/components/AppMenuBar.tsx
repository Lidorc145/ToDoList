import {AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Notes as NotesIcon} from "@mui/icons-material";
import React from "react";
import './AppMenuBar.css';
import {Link} from "react-router-dom";
import packageJson from '../../package.json';
import { BrowserRouter } from "react-router-dom";

function AppMenuBar() {
    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <NotesIcon sx={{display: {md: 'flex'}, mr: 1}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 10,
                        display: {md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    To Do List
                </Typography>
                <Box sx={{flexGrow: 1, display: {md: 'inline-flex', paddingRight: '20px'}}}>
                    <Link to={packageJson.homepage+'/'}><Button key={'home'} sx={{my: 2, color: 'white', display: 'block'}}>
                        Home
                    </Button></Link>
                    <Link to={packageJson.homepage+'/about'}><Button key={'about'} sx={{my: 2, color: 'white', display: 'block'}}>
                        About Me
                    </Button></Link>
                </Box>
                <Box sx={{flexGrow: 0}}>
                    <Link to={'about'}>
                        <Tooltip title="Lidor Cohen">
                            <IconButton sx={{p: 0}}>
                                <Avatar src={'assets/profile.png'}/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
}

export default AppMenuBar;