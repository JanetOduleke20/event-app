import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function No_items_in_cart() {
  return (
    <div>
        <div className="container d-flex align-items-center justify-content-center my-auto mx-auto">
            <div>
                <span>No item in your bag yet</span><br/>
                <Link to="/collections">
                    <button className="btn btn-md btn-danger text-light mx-auto">SHOP NOW</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
