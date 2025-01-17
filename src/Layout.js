import { Outlet, Link } from "react-router-dom";
import React from 'react'
import Footer from "./components/Footer";
import LoginBtn from "./components/LoginBtn";
import './styles/style.css'

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <LoginBtn/>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout