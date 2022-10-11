import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import '../App.css'

export default function Sidebar() {
    const [category, setcategory] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/allGoods").then(res=>{
          if(res.data.status === 200){
            setcategory(res.data.category);
          }
        })
      }, []);

    return (
    <div className="progressBar">
        <ul class="nav flex-column ">
             {
                category.map((item)=>{
                    return (
                        <li class="nav-item">
                            <Link to={`/categories/${item.id}`}>
                                <a class="nav-link active text-dark sidebarItems fw-bold" aria-current="page" href="#">{item.category_name}</a>
                            </Link>
                        </li>
                    )
                })
            }        
        </ul>
    </div>
)
}
