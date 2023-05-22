import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import EventListPage from "./pages/EventListPage/EventListPage";
import EventEditPage from "./pages/EventEditPage/EventEditPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import EventParticipationPage from "./pages/EventParticipationPage/EventParticipationPage";
import MyPage from "./pages/MyPage/MyPage";
import MyPageEditPage from "./pages/MyPageEditPage/MyPageEditPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/" element={<Layout />}>
              <Route path="/event" element={<EventListPage />} />
              <Route path="/event/edit/:eventId" element={<EventEditPage />} />
              <Route
                path="/event/detail/:eventId"
                element={<EventDetailPage />}
              />
              <Route
                path="/event/detail/:eventId/:answerId"
                element={<EventDetailPage />}
              />
              <Route
                path="/event/participation/:eventId"
                element={<EventParticipationPage />}
              />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/edit" element={<MyPageEditPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
