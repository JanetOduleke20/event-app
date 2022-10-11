import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import "../App.css";
import ProgressBar from './ProgressBar';

export default function Signup() {
  const [userinfo, setuserinfo] = useState({firstname: "", lastname: "", email: "", password: ""});
  const history = useHistory();
  const [error, seterror] = useState("")
  const [check, setcheck] = useState(false)


  const setInfo= (e)=>{
    setuserinfo({...userinfo, [e.target.name]: e.target.value});
  }
  const signBtn =async(e)=>{
    e.preventDefault();
    setcheck(true)
    const res = await axios.post("http://localhost:8000/api/signup", userinfo); 
    if(res.data.status === 200) {
      localStorage.setItem("registeredUser", userinfo.email)
      history.push("/collections");
    }else{
      console.log("Something went wrong");
    }
  }

  // Login 

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mt-5 card-deck">
        <div className="col-md-4 card signCard">
        {check ? <ProgressBar/> : <div></div>}
        <div class="mb-4 text-center">
          <h4>Sign up</h4>
        </div>
        <p><input type="text" placeholder="First Name" required className="form-control" name="firstname" onChange={setInfo}/></p>
        <p><input type="text" placeholder="Last Name" required className="form-control" name="lastname" onChange={setInfo}/></p>
        <p><input type="email" placeholder="E-mail Address" required className="form-control" name="email" onChange={setInfo}/></p>
        <p><input type="password" placeholder="Password" required className="form-control" name="password" onChange={setInfo}/></p>
        <button className="btn btn-md text-light signBtn" onClick={signBtn}>Sign up</button>
        <div>
          <p className="text-center mt-3">Already a user? <Link to='/login'><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-sm btn-primary text-light" href="">Log in here</button></Link></p>

        <p className="text-center mt-3"><Link to="/Reset"  className="text-primary">Forgot password?</Link></p>
        </div>
        <div class="simply text-center mt-2">SimplyBook.me</div>
        </div>
        </div>
    </div>
  )
}
