import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../App.css'
import No_items_in_cart from './No_items_in_cart'
import ProgressBar from './ProgressBar'
import { useHistory } from 'react-router-dom'


export default function Cart() {
  const [cart, setcart] = useState([])
  const [total, settotal] = useState(0)
  const [check, setcheck] = useState(true)

  const [total_items, settotalitems] = useState(0)
  const email = localStorage.registeredUser;
  const history = useHistory();
  const url = 'http://localhost:8000/api/getCartItems';
  const deleteURL = 'http://localhost:8000/api/deleteCartItem'
  const increaseURL = 'http://localhost:8000/api/increaseItem'
  const decreaseURL = 'http://localhost:8000/api/decreaseItem'
  const saveOrdersURL = 'http://localhost:8000/api/saveUserOrders'

  useEffect(async()=>{
    await axios.post(url, {email}).then(res=>{
      if(res.data.status ===200) {
        setcart(res.data.items)
        setcheck(false)
        if(cart && check===false) {
          setTotal();
          setTotalItems();
        }
      }
    })
  }, [])
  // useEffect(()=>{
  // }, [])
  const setTotal = ()=>{
    let newCart = cart.reduce(function(sum, current) {
      return sum + current.total_price;
    }, 0) 
    settotal(newCart);
  } 
  const setTotalItems = ()=>{
    let newCart = cart.reduce(function(sum, current) {
      return sum + current.quantity;
    }, 0) 
    settotalitems(newCart)
  } 

  const increase = index=>{
    let newCart = cart.map((cartitem)=>{
      if(cartitem.id=== index) {
        cartitem.quantity +=1;
        cartitem.total_price = cartitem.price_per_one * cartitem.quantity;
      }
      return cartitem;
    })
    setcart(newCart);
    setTotal();
    setTotalItems();
    axios.post(increaseURL, {index}).then(res=>{
      console.log(res.data.message)
    })
  }
  const decrease = index=>{
    let newCart = cart.map((cartitem)=>{
      if(cartitem.id ===index && cartitem.quantity >=1) {
        cartitem.quantity -=1;
        cartitem.total_price = cartitem.price_per_one * cartitem.quantity;
      }
      return cartitem;
    })
    setcart(newCart);
    setTotal();
    setTotalItems();
    axios.post(decreaseURL, {index}).then(res=>{
      console.log(res.data.message)
    })
  }
  const del = index=>{
    let filteredArray = cart.filter((item, i)=>(i!==index))
    setcart(filteredArray);
    setTotal();
    setTotalItems();
    axios.post(deleteURL, {index}).then(res=>{
      if(res.data.status === 200) {
        console.log('Deleted')
      }
    })
  }
  const proceedToPayment = ()=>{
    setcheck(true)
    axios.post(saveOrdersURL, {cart}).then(res=>{
      if(res.data.status===200) {
        console.log(res.data.message);
        history.push('/details')
      }
    })
  }
  return (
    <div className="cartComponent">
      <Navbar />
      {check===true ? <ProgressBar/> : <div/>}
      {cart.length === 0 && check===false? <No_items_in_cart/> :
      <div className="row cartComponent">
          <div className="col-md-6">
            {cart.map((cartitem)=>{
            return(
                <div key={cartitem.id} className="ms-2 my-2 p-2">
                <div className="d-flex">
                    <div className='mx-2 newgoods' style={{backgroundImage: `url("http://localhost:8000/${cartitem.picture}")`, height: "150px"}}></div>
                    <div className="py-4 my-auto">
                    <small>{cartitem.description}</small><br />
                    <span>{"NGN "+cartitem.total_price}</span>
                    <div className="d-flex p-2">
                      {cartitem.quantity ===1 ?
                        <button className='bg-light border border-light fw-bold' onClick={()=>del(cartitem.id)}><span class="material-symbols-outlined">delete</span></button>
                        :<button className='bg-light border border-light fw-bold' onClick={()=>decrease(cartitem.id)}><span class="material-symbols-outlined">remove</span></button>
                      }
                        <span className="fw-bold">{cartitem.quantity}</span>
                        <button className='bg-light border border-light fw-bold' onClick={()=>increase(cartitem.id)}><span class="material-symbols-outlined">add</span></button>
                    </div>
                    <div>
                    </div>
                    </div>
                </div>
                </div>
            )
            })}
          </div> 
          {check===false ? 
          <div className="col-md-6 d-flex mx-auto align-items-center justify-content-center">
            <div className="py-4">
            <span>Sub Total: </span>
            <span className='fw-bold'>{"NGN "+ total}</span><br/>
            <small>{total_items} {cart.length <=1 ? ' item' :  ' items'}</small>
            <div className='checkoutbtn'>
            <button className='btn btn-md bg-danger w-100 px-2 text-light' onClick={proceedToPayment}>Proceed to payment</button>
            </div>
            </div>
          </div> 
          :<div></div>}
    </div>
      }
  </div>
  )

}
