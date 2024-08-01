import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="*" element={<Page404 />}></Route>
            <Route path="portfolio" element={<Portfolio />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
