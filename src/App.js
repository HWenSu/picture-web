import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import Portfolio from "./pages/Portfolio";


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="portfolio" element={<Portfolio />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
