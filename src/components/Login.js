import React, {useState} from 'react'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import ProgressBar from './ProgressBar'

export default function Login() {
    const [loginDetails, setloginDetails] = useState({loginemail: "", loginpassword: ""});
    const history = useHistory();
    const [error, seterror] = useState("")
  const [check, setcheck] = useState(false)

    const login =e=>{
        setloginDetails({...loginDetails, [e.target.name]: e.target.value});
      }
      const loginUser =async (e)=>{
        e.preventDefault();
        setcheck(true)
        const res = await axios.post("http://localhost:8000/api/login", loginDetails);
        if(res.data.status === 200) {
          console.log(res.data);
          localStorage.setItem("registeredUser", loginDetails.loginemail)
          history.push("/collections");
        }else if(res.data.isAdmin){
            localStorage.isAdmin = true;
          history.push("/admin/dashboard");
        }else{
          seterror(res.data.error)
        }
      }    
  return (
    <div  className="d-flex justify-content-center align-items-center mt-5 card-deck my-auto mt-4">
        {/* <Navbar/> */}
        <div className="card px-2 py-2 w-50">
        {check ? <ProgressBar/> : <div></div>}
                <small className="text-center text-danger">{error}</small>
                <div className="form-group mb-2">
                  <label htmlFor="">E-mail Address</label>
                  <input type="email" className="form-control" placeholder="E-mail Address" name="loginemail" onChange={login}/>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="">Password</label>
                  <input type="password" className="form-control" placeholder="Password" name="loginpassword" onChange={login}/>
                </div>
                <div className="form-group mb-2 float-end">
                    <button type="button" class="btn btn-primary me-auto" onClick={loginUser}>Log in</button>

                </div>
              </div>
              <div>
        </div>
    </div>
  )
}
