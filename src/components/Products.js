import React, {useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Goods from './Goods'
import Navbar from './Navbar'
import ProgressBar from './ProgressBar'
import swal from 'sweetalert'

export default function Products() {
    const {id} = useParams()
    const history = useHistory()
    const url = "http://localhost:8000/api/getProducts"
    const [products, setproducts] = useState([])
    const [check, setcheck] = useState(true)
  const user_email = localStorage.getItem("registeredUser");

    useEffect(() => {
      axios.post(url, {id}).then((res)=>{
        if(res.data.status ===200) {
          setproducts(res.data.products)
          // console.log(res.data)
          setcheck(false)
        }
      })
    }, [])
    const addToCart = (product)=>{
      if(!user_email) {
        history.push('/signup')
      }else{
        const cartDetails = {...product, user_email, quantity: 1};
        console.log(cartDetails)
        swal('Success', 'Added', 'success');
        axios.post('http://localhost:8000/api/addtocart', cartDetails).then(res=>{
          if(res.data) {
            console.log(res.data)
          }else{
            console.log("Error encountered")
          }
        })
      }
    }
    
  return (
    <div className="">
      <Navbar/>
    <div className="container mt-4">
      {check===true ? <ProgressBar/> : <div></div>}
      <div className="row">
        <div className="col-md-6">
          <div className="newgoods" style={{backgroundImage: `url("http://localhost:8000/${products.picture}")`, height: "350px", width: '100%'}}></div>
        </div>
        <div className="col-md-6 align-items-center justify-content-center">
          <p className="fw-bold">{products.description}</p>
          <p className="fs-4 fw-bolder">{"NGN"+products.price}</p>
          <div>
            <button className="btn btn-lg text-light px-2 bg-danger" onClick={()=>addToCart(products)}>Add to Cart</button>
          </div>
        </div>
      </div>
      {/* <div className="mt-3">
        <Goods />
      </div> */}
    </div>

    </div>
  )
}
