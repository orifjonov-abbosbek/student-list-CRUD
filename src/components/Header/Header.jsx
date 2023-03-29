import React from 'react'
import '../Header/Header.css'
import  { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-wrapper">
            <nav className="site-nav">
              <ul className="site-nav-list">
                <li className="nav-list-item">
                  <NavLink className="sitenav__link" to="/">
                    <button className="sitenav_btn ">Home</button>
                  </NavLink>
                </li>

                <li className="nav-list-item">
                  <NavLink className="sitenav__link" to="/students">
                    <button className="sitenav_btn ">Studentlist</button>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
