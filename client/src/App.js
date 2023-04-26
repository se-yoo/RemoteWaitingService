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
import MyPage from "./pages/MyPage/MyPage";
import MyPageEditPage from "./pages/MyPage/MyPageEditPage";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import EndPage from "./pages/DefaultPage/EndPage";
import DefaultPage from "./pages/DefaultPage/DefaultPage";
import EventParticipantPage from "./pages/EventParticipantPage/EventParticipantPage";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/end" element={<EndPage />} />
            <Route path="/default" element={<DefaultPage />} />
            {/* <Route
              path="/user/event/join/:eventId"
              element={<UserEventJoinPage />}
            />
            <Route
              path="/guest/event/detail/:eventId/:userId"
              element={<GuestEventDetailPage />}
            /> */}
            <Route path="/" element={<Layout />}>
              <Route path="/event" element={<EventListPage />} />
              <Route path="/event/edit/:id" element={<EventEditPage />} />
              <Route path="/event/detail/:id" element={<EventDetailPage />} />
              <Route
                path="/event/participant/:id"
                element={<EventParticipantPage />}
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
