import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import "../App.css"
import Signup from './Signup';

export default function Navbar() {
  const history = useHistory();
  const signup =()=>{
    history.push("/signup")
  }
  return (
    <div className="navBar p-1 ">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/"><img src={process.env.PUBLIC_URL + 'pictures/fashion.png'} className="logo"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbarNav" id="">
              <ul className="navbar-nav ms-auto float-end">
                {/* <li className="nav-item mx-auto">
                  <input className="search shadow" placeholder="Search"/>
                </li> */}
                <li className="nav-item mx-2">
                  <Link to="/"><i class="fa-solid fa-house-chimney-user text-dark"></i></Link>
                </li>
                <li class="nav-item mx-2 ">
                  <Link to="/signup" className="mx-2 fw-bold text-dark" onClick={signup}><i class="fa-solid fa-user"></i></Link> 
                </li>
                <li class="nav-item mx-2">
                  <Link to="/cart" className="text-dark"><i class="fa-solid fa-suitcase"></i></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

    </div>
  )
}
