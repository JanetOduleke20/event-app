import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import "../App.css";
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [category, setcategory] = useState([])
  const [newcollection, setnewcollection] = useState([])
  const history = useHistory();

  const shopnow =()=>{
    history.push('/collections');
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/allGoods").then(res=>{
      if(res.data.status === 200) {
        setcategory(res.data.category)
        setLoading(false);
        let newcollections = res.data.goods.slice(-4);
        setnewcollection(newcollections)
        console.log(newcollections);
      }
    })
  }, [])
  
  if(loading) {
    return (
    <div className="d-flex align-items-center justify-content-center mt-5">
      <img src={process.env.PUBLIC_URL + 'pictures/fashion.png'} width="40px"/> <br/>
      <h4>Loading...</h4>
    </div> 
    )
  }
  else{
    return (
      <div>
        {/* Navbar */}
        <div><Navbar></Navbar></div>
        <div className="">
          <div className="jumbotron">
            <div className="intro">
              <div className="">
                <p className="introtext lead">Your No. 1 Online Store <br/> For All Your <br/><span className="fashion">FASHION</span> <br/>Needs <br/> <button className="btn btn-lg bg-danger text-light shadow" onClick={shopnow}>SHOP NOW</button></p>
              </div>
            </div>
          </div>
        {/* Shop New Collection */}
        <div className="container goodscard ps-2 mt-3">
          <div className="">
            <p className="text-center">SHOP NEW COLLECTION</p>
            <hr className="w-25 mx-auto"/>
            <div>
              <div className="d-md-flex d-sm-block align-items-center justify-content-center">
                {
                  newcollection.map((goods)=>{
                      return(
                        <div className="card ms-3 pb-2">
                          <div className="card-image"></div>
                          <div className="card-body">
                            <p style={{backgroundImage: `url("http://localhost:8000/${goods.picture}")`}} className="newgoods"></p>
                            <p>{goods.name}</p>
                            <p>{"#"+goods.price}</p>
                          </div>
                        </div>
                      )  
                  })
                }
    
              </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-2"><button className="btn btn-md outline-dark p-2 text-dark shopnowbutton bg-light" onClick={shopnow}>VIEW ALL COLLECTION</button></div>
          </div>
        </div>
       
        {/* Top Categories */}
        <div className="topcategories goodscard p-3 mt-3 ">
          <div className="container">
            <p className="text-center text-light">TOP CATEGORIES</p>
            <hr className="mx-auto w-25 bg-light"/>
              <div className="d-md-flex d-sm-block align-items-center justify-content-center">
                {
                  category.map((cat)=>{
                    return(
                      <div className="eachcat me-2 pb-2" key={cat.id}>
                        <div className="text-light cat align-items-center justify-content-center category_image" style={{backgroundImage: `url("http://localhost:8000/${cat.image}")`}}>
                          <span className="bg-dark p-1 mx-auto">{cat.category_name}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

          </div>
            <div className="d-flex align-items-center justify-content-center"><button className="btn btn-md outline-dark p-2 text-dark shopnowbutton bg-light" onClick={shopnow}>VIEW ALL CATEGORIES</button></div>
        </div >
  
        {/* Fashion Text */}
        <div className="fashiontext">
          <div className="container p-4 row">
              <q className="col-12 col-md-6 mx-auto font-weight-bold">
                <br/>Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br/>
                Rem perferendis id nisi libero? Nesciunt consequatur <br/>
                corporis itaque similique omnis. Maxime nemo a pariatur <br/>
                aut consequuntur necessitatibus quibusdam facere quasi quod!<br/>
              </q>
          </div>
        </div>
        {/* Footer */}
        <div className="footer bg-dark p-3">
          <div className="container ">
            <div className="row d-flex">
              <div className="col-md-3">
                <p className="text-light">INFORMATION</p>
                <ul className="list">
                  <li className="othertexts">Fashion</li>
                  <li className="othertexts">Blog</li>
                  <li className="othertexts">Design</li>
                  <li className="othertexts">Trendy News</li>
                </ul>
              </div>
              <div className="col-md-3">
                <p className="text-light">MY ACCOUNT</p>
                <ul className="list">
                  <li className="othertexts">Create account for free</li>
                  <li className="othertexts">Get latest updates</li>
                  <li className="othertexts">Sign up to newsletter</li>
                </ul>
              </div>
              <div className="col-md-3">
                <p className="text-light">USEFUL LINK</p>
                <small className="othertexts">www.nosite.com</small>
              </div>
              <div className="col-md-3">
                <p className="text-light">CONTACT</p>
              </div>
  
            </div>
            {/* Some images */}
            <div>
              <div className="image"><img src="" alt="" /></div>
              <div className="image"><img src="" alt="" /></div>
              <div className="image"><img src="" alt="" /></div>
              <div className="image"><img src="" alt="" /></div>
  
            </div>
            {/* Search and others */}
            <div className="d-flex pb-2">
              <input type="text" className="form-control w-50 search me-5" placeholder="Search for anything"/>
              <div><p className="othertexts me-3"> | All rights reserved</p></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
