import React, { useEffect, useState} from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default function AddProduct() {
    const [productInfo, setproductInfo] = useState({category_id: 0, productname: "", price: 0, units: 0, description: ""});
    const [categorylist, setcategorylist] = useState([]);
    const [errorlist, setError] = useState([]);

    const [picture, setPicture] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:8000/api/getCategory').then(res=>{
            if(res.data.status === 200){
                setcategorylist(res.data.category)
            }else{
                console.log("I no find am");
            }
        })
    }, []); 
    const setproduct = e=>{
        setproductInfo({...productInfo, [e.target.name]: e.target.value});
    }
    const handleImage=e=>{
        setPicture({image: e.target.files[0]})
    }
    
    const addProduct=async(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        let {category_id, productname, price, units, description} =productInfo;
        formdata.append('category_id', category_id);
        formdata.append('name', productname);
        formdata.append('price', price);
        formdata.append("units", units);
        formdata.append('description', description);
        formdata.append('image', picture.image);
        
        const res = await axios.post("http://localhost:8000/api/addGoods", formdata);
        if(res.data.status === 200) {
            swal("Success", res.data.message, 'success')
            setError([]);
        }
        else if(res.data.status === 422){
            swal("All fields are required","","error");
            setError(res.data.error);
        }

    }
  return (
    <div>
        <div>
                <div className="card">
                    <div className="card-header">
                        <h4>Add available Goods</h4> 
                    </div>
                    <div className="card-body">
                    <form encType="multipart/form-data">
                        <div className="form-group">
                            <label htmlFor="category">Select Category</label> <br />
                            <select name="category_id" onChange={setproduct} id="" value={productInfo.category_id} className="form-control">
                                <option value="">Select Category</option>
                                {
                                    categorylist.map((item)=>{
                                        return(
                                            <option value={item.id} key={item.id}>{item.category_name}</option>
                                        )
                                    })
                                }
                                <small className="text-danger">{errorlist.category_id}</small>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Product Name</label>
                            <input type="text" placeholder="Product Name" name="productname" onChange={setproduct} className="form-control" required/>
                            <small className="text-danger">{errorlist.name}</small>

                        </div>
                        <div className="form-group">
                            <label htmlFor="">Product Price</label>
                            <input type="number" placeholder="Product Price" name="price" onChange={setproduct} className="form-control" required/>
                            <small className="text-danger">{errorlist.price}</small>

                        </div>
                        <div className="form-group">
                            <label htmlFor="">Units available</label>
                            <input type="number" placeholder="Product Units" name="units" onChange={setproduct} className="form-control" required/>
                            <small className="text-danger">{errorlist.price}</small>

                        </div>
                        <div className="form-group">
                            <label htmlFor="">Product Description</label>
                            <input type="text" placeholder="Product Description" name="description" onChange={setproduct} className="form-control" required/>
                            <small className="text-danger">{errorlist.description}</small>

                        </div>
                        <div className="form-group">
                            <label htmlFor="">Product Image</label>
                            <input type="file"  name="image" onChange={handleImage} className="form-control" required/>
                            <small className="text-danger">{errorlist.image}</small>
                        </div>
                        <div className="form-group">
                            <button onClick={addProduct} className=" btn btn-md mt-2" style={{background: '#D68689'}}>Add Product</button>       
                        </div>
                    </form>
                    </div>
                </div>
        </div>
    </div>
  )
}
