import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import Portfolio from "./pages/Portfolio";
import SignUp from "./pages/SignUp";
import Favorite from "./pages/Favorite";
import LandingPage from "./pages/LandingPage";
import VisitImagPage from "./pages/VisitImagPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 首先顯示 LandingPage */}
        <Route path="/" element={<LandingPage/>}/>
        {/* 當動畫結束後，導向 /home */}
        <Route path="/picture-web" element={<Layout />}>
        <Route index element={<HomePage />}/>
          <Route path="*" element={<Page404 />}/>
          <Route path="portfolio" element={<Portfolio />}/>
          <Route path="portfolio/user/:userId" element={<VisitImagPage />} />
          <Route path="sign-up" element={<SignUp />}/>
          <Route path="favorite" element={<Favorite />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
