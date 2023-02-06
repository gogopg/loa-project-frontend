import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
// mui
import {CssBaseline, Box, CircularProgress} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
// components
import NavBar from './components/NavBar';
// import { DrawerHeader } from './components/LeftSideBar';
// router
import AppRouter from './AppRouter';

import './Layout.css';
import {theme_palette_dark, theme_palette_light} from './constants/colors';

import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


// https://in-your-saas.github.io/mui-theme-editor/
const theme = createTheme({
    palette: theme_palette_light,
});

export default function Layout() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="App fill-window">
                    <Router basename={process.env.REACT_APP_BASEPATH}>
                        <NavBar/>
                        {/*<LeftSideBar />*/}
                        <main style={{marginTop: '4rem'}}>
                            {/*<DrawerHeader />*/}
                            <AppRouter/>
                        </main>
                    </Router>
                </div>
            </ThemeProvider>
        </RecoilRoot>
    );
}
