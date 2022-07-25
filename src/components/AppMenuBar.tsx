import {AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {Notes as NotesIcon} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
const pages = ['Home', 'Categories', 'About'];
const isLoggedIn = false; //todo: need to add support for login
function AppMenuBar(){
    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <NotesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 10,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >

                    To Do List
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Link to='/counter'><Button
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block', '& .MuiButtonBase-root':{color:'red',decoration:'none' } }}
                        >
                            {page}
                        </Button></Link>
                    ))}
                </Box>
                {isLoggedIn&&(
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>)}
            </Toolbar>
        </Container>
    </AppBar>);
}

export default AppMenuBar;