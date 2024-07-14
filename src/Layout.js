import { Outlet, Link } from "react-router-dom";
import React from 'react'

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home Page</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout