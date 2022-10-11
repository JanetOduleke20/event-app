import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css";
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import ProgressBar from './ProgressBar';

export default function Goods() {
  const history = useHistory();
  const [search, setsearch] = useState("");
  const [check, setcheck] = useState(true)
  const [searchedGoods, setsearchedGoods] = useState([]);
  const [allGoods, setallGoods] = useState([]);
  const [category, setcategory] = useState([]);
  const [cart, setcar] = useState([]);
  const [total, settotal] = useState(0)
  // const [quantity, setquantity] = useState(1)

  const user_email = localStorage.getItem("registeredUser");
  useEffect(() => {
    // setcheck(true)
    axios.get("http://localhost:8000/api/allGoods").then(res=>{
      if(res.data.status === 200){
        setallGoods(res.data.goods);
        setcategory(res.data.category);
        setcheck(false)

      }
    })
  }, []);

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
    <div>
        <div className="">
          {check===true ?   <ProgressBar/> : <div></div>}
            <div>
                {/* Goods gallery  */}
                <div className="mt-2 container">
                <div className="d-md-flex d-md-block align-items-center justify-content-center">
                   <div className="container-fluid">
                     <div className="row">
                        {
                          allGoods.map((product)=>{
                            return(
                              <div className="col-md-3"  key={product.id}>
                                    <div className="">
                                      <div className="card my-2 px-2 py-1">
                                          <Link to={`/products/${product.id}`}>
                                            <div className="card-image d-flex align-items-center align-items-center newgoods" style={{backgroundImage: `url("http://localhost:8000/${product.picture}")`, height: "150px"}}></div>
                                          </Link>
                                        <div className="cardbody">
                                          <small className="" style={{fontSize: "10px"}}>{product.description}</small>
                                          <p className="fw-bold">{"NGN "+product.price}</p>
                                            <button className="btn bg-danger text-light btn-sm" onClick={()=>addToCart(product)}>Add to cart</button>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                                )
                          })
    }     

                     </div>
                   </div>
                    </div>
                  </div>
                </div>
            </div>    
    </div>
  )
}
