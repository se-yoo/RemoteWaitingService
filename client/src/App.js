import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
