import React from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

export default function PaymentSuccess() {
  return (
    <div>
    <Navbar/>
      <div className="container card d-flex align-items-center justify-content-center my-auto shadow">
        <div className="mx-auto py-2">
        <img src={process.env.PUBLIC_URL + 'pictures/WDI0da4.gif'} className="logo"/>
        </div>
        <div>
            <p className='text-center'>
                You have successfully purchased products from <span className='fw-bold'>Fashion Store.</span>
                <span>Thanks for your patronage. Do visit again.</span>
            </p>
        </div>
        <div className='mx-auto mb-2'>
            <span className="text-center">You can view your recent transactions here</span> <br/>
            <Link to="/history"><button className='btn btn-md text-light bg-danger mt-1 mx-auto'>See History</button></Link>
        </div>
    </div>

    </div>
  )
}
