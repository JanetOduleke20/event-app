import React, {useState} from 'react'
import Navbar from './Navbar'
import '../App.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ProgressBar from './ProgressBar';

export default function Delivery() {
    const url = 'http://localhost:8000/api/delivery';
    const history = useHistory(); 
    const user_email = localStorage.registeredUser;
    const [message, setmessage] = useState("")
    const [check, setcheck] = useState(false)
    const [deliverydetails, setdeliverydetails] = useState({phone: '', email: '', home: '', city: ''})
    const getDeliveryInfo=e=>{
        setdeliverydetails({...deliverydetails, [e.target.name]: e.target.value});
    }
    const paynow = ()=>{
        if(user_email !==deliverydetails.email) {
            setmessage('This email is not signed in');
        }else{
            setcheck(true)
            axios.post(url, deliverydetails).then(res=>{
                if(res.data.status===200) {
                    history.push('/success')
                }else if(res.data.status===404){
                    setmessage(res.data.message)
                }else{
                    setmessage("Sorry, we didn't catch that. Please input your details and send again")
                }
            })
        }
    }
  return (
    <div>
        {/* Navbar */}
        <div><Navbar></Navbar></div>

        {/* Delivery */}
        <div className="container mt-3">
          {check===true ? <ProgressBar/> : <div/>}
            <div>
                <small className='text-danger text-center'>{message}</small>
                <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input type="number" className="form-control" name="phone" onChange={getDeliveryInfo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Email Address</label>
                    <input type="email" className="form-control" name="email" onChange={getDeliveryInfo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Residential Address</label>
                    <input type="text" className="form-control" name="home" onChange={getDeliveryInfo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">City</label>
                    <input type="text" className="form-control" name="city" onChange={getDeliveryInfo}/>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dicta deserunt iusto 
                        corrupti distinctio neque debitis aspernatur error, mollitia sunt quae! Placeat 
                        voluptatibus ex quis molestias voluptatem dolore consequatur soluta?
                    </p>
                </div>
                <button className="btn btn-md paynow shadow" onClick={paynow}>Pay Now</button>
            </div>
        </div>
    </div>
  )
}
