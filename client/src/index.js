import React from 'react';

import App from './App';
import { theme } from "./styles/styles";

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <HelmetProvider>
        <ThemeProvider theme={theme} >
            <BrowserRouter >
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </HelmetProvider>
)

