import React, { useState, useEffect } from 'react'
import axios from 'axios';
// import "App.css"
import swal from 'sweetalert';

export default function AddCategory() {
    const [info, setinfo] = useState({category: ""});
    const [image, setimage] = useState([]);
    const [categorylist, setcategorylist] = useState([])
    
    const setCategory = (e)=>{
        setinfo({...info, [e.target.name]: e.target.value})
    }
    const setImage=e=>{
        setimage({image: e.target.files[0]});
    }
    const addCategory =async()=>{
        let formdata = new FormData();
        formdata.append('category_name', info.category);
        formdata.append('image', image.image)
        axios.post("http://localhost:8000/api/addcategory", formdata).then(res=>{
            if(res.data.status === 200){
                swal("Success", res.data.message, 'success')

            }else{
                swal("Error", "", 'error')
            }
        });
    }
    useEffect(() =>{
        axios.get('http://localhost:8000/api/getCategory').then(res=>{
            if(res.data.status === 200){
                setcategorylist(res.data.category)
            }else{
                console.log("I no find am");
            }
        })
    }, [])

    const deleteCategory=(id)=>{
        
    }
  return (
    <div className="">
        <div className="card">
            <div className="card-header">
                <h4>Add Category</h4>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="">Category Name</label>
                    <input type="text" name="category" required className="form-control" onChange={setCategory}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Image</label>
                    <input type="file" name="image" required className="form-control" onChange={setImage}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-md addCategory mt-2 text-light" style={{background: '#D68689'}} onClick={addCategory}>Add</button>
                </div>

                {
                    categorylist.map((item)=>{
                        return(
                            <table key={item.id} className="table">
                                <tr  className="">
                                    <td>{item.id}</td>
                                    <td className="">{item.category_name}</td>
                                    <td ><button className="btn btn-sm text-light bg-danger" onClick={()=>deleteCategory(item.id)}>Delete</button></td>
                                </tr>
                            </table>
                        )})
                }
            </div>
        </div>
    </div>
  )
}
