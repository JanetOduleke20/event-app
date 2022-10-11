import React from 'react'
import Sidebar from './Sidebar'
import Goods from './Goods'
import Navbar from './Navbar'

export default function Collections() {
  return (
    <div className="">
        <Navbar></Navbar>
        <div className="container-fluid row">
            <div className="col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-10">
                <Goods></Goods>
            </div>
        </div>
    </div>
  )
}
