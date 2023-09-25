import React, { useEffect, useState } from 'react' ;
import useCategory from '../../custom/useCategory';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
 

export default function  Create  () {  
  const [title , setTitle] = useState("") ; 
  const [body ,setBody] = useState("") ; 
  const [categoryId , setCategoryId] = useState("") ; 
  const [category , setCategory] = useState([]) ;  
  const [loading , setLoading] = useState(false) ;  
  const navigate = useNavigate() ;  
  const [error , setError] = useState([]) ; 

 
 
  useEffect(() =>{ 
 fetchCategories() ; 
 },[])
  const fetchCategories = async () => {
      const fetchedCategory = await useCategory() ; 
      setCategory(fetchedCategory);
  } 
   const AddData = async (e) => {  
    setLoading(true); 
    e.preventDefault() ; 
    const task = { 
      title : title , 
      body : body , 
      category_id : categoryId
    }; 
    try { 
      
        await axios.post("/api/tasks",task)  ;
        Swal.fire({ 
          position : "top-end"  ,  
          icon : "success" , 
          title :" Task added successfully" ,  
          showConfirmButton : false ,
          timer : 1500
        }); 
        navigate("/") ; 
        setLoading(false) ; 
    } catch (error) {
        setError(error.response.data.errors) ; 
       setLoading(false) ;
    }
    
   } 
   const afficheError = (filed) => ( 
     error?.[filed]?.map((error,index)=>( 
       <span key={index} className='text-danger mt-2'>{error}</span>
     ))
   )

  return (
     <div className='row my-5'>  
     <div className="col-md-6 mx-auto">
      <div className="card">
        <div className="card-header bg-white text-center ">
          <h4>Add Task</h4> 
        </div>
          <div className="card-body"> 
           <form onSubmit={(e)=>AddData(e)} > 
           <div className="form-group"> 
             <label htmlFor="title">Title</label>
             <input type="text" name="title" id="title" value={title} 
             onChange={(e)=> setTitle(e.target.value)}
              className='form-control' placeholder='enter name ' /> 
            {afficheError("title")}
           </div> 

           <div className="form-group">
           
             <label htmlFor="body">Body</label> 
             <textarea name="body" id="body" value={body} 
             onChange={(e)=> setBody(e.target.value)}
              cols="30" rows="5" className='form-control' placeholder='Enter body'></textarea>
              {afficheError("body")}
           </div>  
            
          <div className='form-group'> 
          <label htmlFor="Category"> Category</label> 
            <select name="category_id" className='form-control' id="category_id" onChange={(e) => setCategoryId(e.target.value)}>  
            <option value=""  >choose Category</option>
            {  
              category?.map((cat)=>(   

                <option key={cat.id} value={cat.id}> {cat.name} </option>
              )) 
            } 

            </select> 
            {afficheError("category_id")}
          </div> 
          
          {
            loading  ? <button className="btn btn-primary mt-3" type="button" disabled>
                           <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                           <span role="status">Loading...</span>
                          </button>
                     : <button type='submit' className='btn btn-primary mt-3'>Add</button>
          }
           </form>
          </div>
       
      </div>
     </div>
    
    </div>
  
  )
}

