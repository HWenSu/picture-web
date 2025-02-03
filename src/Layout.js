import { Outlet, Link } from "react-router-dom";
import React from 'react'
import Footer from "./components/Footer";
import LoginBtn from "./components/LoginBtn";
import './styles/style.css'

const Layout = () => {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/picture-web">IDEAS</Link>
          </li>
          <li>
            <Link to="/picture-web/portfolio">PORTFOLIO</Link>
          </li>
          <li>
          <Link to="/picture-web/favorite">FAVORITE</Link>
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