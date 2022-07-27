import {Box, Paper} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import './About.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function About(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const ref = useRef({
        offsetWidth: 0
    });
    function onDocumentLoadSuccess({ numPages }:any) {
        setNumPages(numPages);
    }
    const [width, setWidth] = useState(5);
    useEffect(() => {
        function handleWindowResize() {
            setWidth(ref.current.offsetWidth);
        }
        handleWindowResize();
        window.addEventListener('resize',handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);
    return (
        <Paper elevation={3} sx={{padding: '20px', marginTop: '20px', marginBottom: '20px'}} >
        <Box ref={ref}>

            <Document file='assets/cv.pdf' onLoadSuccess={onDocumentLoadSuccess} externalLinkTarget={"_blank"}>
                    <Page pageNumber={1} width={width}  />
                </Document>

        </Box>
        </Paper>
    );
}

export default About;