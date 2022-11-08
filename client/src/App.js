import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { ThemeProvider } from '@mui/material';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage/LoginPage'
import TestPage from './pages/TestPage/TestPage';
import EventListPage from './pages/EventListPage/EventListPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route exact path="/events" element={<EventListPage />} />
              <Route exact path="/test" element={<TestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
