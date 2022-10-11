import React, {useState, useEffect} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import ProgressBar from './ProgressBar'
import swal from 'sweetalert'

export default function Categories() {
  const {id} = useParams()
  const history = useHistory()
  const url = "http://localhost:8000/api/getProductsByCategories"
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

  const addToCart =(product)=>{
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
      <Navbar/>
    {check ? <ProgressBar/> : <div></div>}
      <div className="container">
        <div className="">
          <div className="row">
          {
            products.map((product)=>{
              return(
                <div className="col-md-3"  key={product.id}>
                  <div className="">
                    <div className="card my-2 px-2 py-1">
                          <Link to={`/products/${product.id}`}>
                            <div className="card-image d-flex align-items-center align-items-center newgoods" style={{backgroundImage: `url("http://localhost:8000/${product.picture}")`, height: "150px"}}></div>
                          </Link>
                        <div className="cardbody">
                          <small className="" style={{fontSize: "10px"}}>{product.description}</small>
                          <p className="font-weight-bold">{"NGN "+product.price}</p>
                            <button className="btn bg-danger text-light btn-sm" onClick={()=>addToCart(product)}>Add to Cart</button>
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
  )
}
