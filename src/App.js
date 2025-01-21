import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";
import Portfolio from "./pages/Portfolio";
import SignUp from "./pages/SignUp";
import Favorite from "./pages/Favorite";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="portfolio" element={<Portfolio />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route>
          <Route path="favorite" element={<Favorite />}></Route>

        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
