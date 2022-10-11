import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import ProgressBar from './ProgressBar'
import {Link} from 'react-router-dom'

export default function TransactionHistory() {
    const email = localStorage.registeredUser
    const historyURL= 'http://localhost:8000/api/getUserHistory';
    const [userHistory, setuserHistory] = useState([])
    const [check, setcheck] = useState(true)
    useEffect(() => {
        axios.post(historyURL, {email}).then(res=>{
            if(res.data.status === 200 ){
                setuserHistory(res.data.userHistory)
                // console.log(userHistoryuser)
                setcheck(false)
            }
        })
    }, [])
    
  return (
    <div>
        <Navbar/>
        <div className="container">
        {check ? <ProgressBar/> : <div></div>}

            <div className="align-items-center justify-content-center">
                {userHistory ? 
                <div>
                    <h4>Your Orders</h4>
                    {userHistory.map((history)=>{
                        const date = history.created_at.split('T')[0];
                        
                        return (
                            <div key={history.id} className="d-flex mx-1 my-2 mb-2">
                                <div>
                                    <span className="text-danger fw-bold">{date}</span><br/>
                                    <small className=''>{history.name}</small><br/>
                                </div> <br/>
                                <div className=''>
                                    <span className='mx-2 text-danger'>{"NGN "+history.total_price}</span><br/>
                                    <small className='float-end'>{history.quantity}</small>
                                </div>
                                <hr className='bg-secondary'/>
                            </div>
                        )
                    })}
                </div>    
            : <div>
            <div className="container d-flex align-items-center justify-content-center my-auto mx-auto">
                <span>Oops! You have no recent transaction</span><br/>
                <Link to="/collections">
                    <button className="btn btn-md btn-danger text-light mx-auto">SHOP NOW</button>
                </Link>
            </div>
            </div>}
            </div>
        </div>
    </div>
  )
}
