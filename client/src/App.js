import React, { Suspense } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage'
import TestPage from './pages/TestPage/TestPage';
import Layout from './layouts/Layout';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route exact path="/test" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
