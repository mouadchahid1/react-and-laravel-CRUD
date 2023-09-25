import axios from 'axios';
import React, { useEffect, useState } from 'react' ;
import useCategory from '../../custom/useCategory';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router-dom';

export default function Task() {  

  const [tasks , setTasks] =useState([]) ;   

 const [category , setCategory] = useState([]) ;    
 const [page , setPage] = useState(1) ; 
 const [categoryId , setCategoryId] = useState(null) ;  
 const [orderby, setOrderby] = useState(null) ;   
 const [searchTerm , setSearchTerm]=useState("") ; 
 const debounceSearchTerm = useDebounce(searchTerm , 700) ;


  useEffect( () => { 
    if(!category.length) 
    { 
      fetchCategories() ;
    }
       
        fetchTask() ; 
      
  },[ page, categoryId , orderby , debounceSearchTerm[0] ]);  
 
  const fetchTask = async () => { 
    try {
      if(categoryId) {
        const reponse = await axios.get(`api/category/${categoryId}/tasks?page=${page}`) ;  
        setTasks(reponse.data) ;
      }  
      else if(orderby) {
        const reponse = await axios.get(`api/order/${orderby.column}/${orderby.direction}/tasks?page=${page}`) ;   
        setTasks(reponse.data) ;
      } 
      else if(searchTerm) {
        const reponse = await axios.get(`/api/search/${debounceSearchTerm[0]}/tasks?page=${page}`) ;   
        setTasks(reponse.data) ;
      }
      else {
        const reponse = await axios.get(`api/tasks?page=${page}`) ;  
      setTasks(reponse.data) ;
      }
    } 
    catch(error) {
      console.log(error);
    }
  } 
 
  const fetchNextPreviewsPage = (link) => {
     const   url =new URL(link) ; 
     setPage(url.searchParams.get("page")); 
     
  } 
  const fetchCategories = async () => {
      const fetchedCategory = await useCategory() ; 
      setCategory(fetchedCategory);
  } 
  const delteteTask = (taskId) => { 
    Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then( async (result) => {
  if (result.isConfirmed) {
    try { 
      const reponse = await axios.delete(`api/tasks/${taskId}`) ;
      Swal.fire(
      'Deleted!',
       reponse.data.message ,
      'success'
    ) 
    fetchTask() ;
    } catch (error) {
       console.log("Error deleting task") ;
    }
  }
})
  }

  /* pour la pagiantion */ 
  const renderPagination =() => (
    <ul className='pagination'>    
       {
        tasks.links?.map((link,index) => (
          <li key={index} className={`page-item ${link.active ? "active" : ""}`}> 
             <a className="page-link" onClick={()=>fetchNextPreviewsPage(link.url)} style={{cursor:"pointer"}}>{link.label.replace("&laquo;","").replace("&raquo;","")}</a> 
          </li>
         ))
       }
    </ul>
  ); // end methode 

  return (
    <div className='row mx-1 my-5'>   
     <div className="row my-5">
      <div className="col-md-4">
        <div className="form-group"> 
         <label htmlFor="">Search</label>
          <input type="text" placeholder='search...' name='term' className="form-control" value={searchTerm} 
           onChange={(e)=> { 
            setOrderby(null) ; 
            setCategoryId(null) 
            setPage(1) ;  
            console.log(searchTerm);
            setSearchTerm(e.target.value) ;
           }}
           />
        </div>
      </div>
     </div>
       <div className='col-9 card'> 
           <div className='card-body'> 
              <table className='table  table-responsive'>  
                 <thead> 
                      <tr> 
                         <th>Id</th> 
                         <th>Title</th>
                         <th>body</th>
                         <th>category</th>
                         <th>Done</th>
                         <th>created</th> 
                         <th>Action</th>
                      </tr>
                 </thead> 
                 <tbody>
                 {
                  tasks.data?.map((task)=> ( 
                     <tr key={task.id}>  
                       <td>{task.id}</td>
                       <td>{task.title}</td>
                       <td>{task.body}</td>
                       <td>{task.category.name}</td>
                       <td>{task.done ?  
                        <span className='badge bg-success'>Done</span> : 
                        <span className='badge bg-danger'>Processing</span>
                      }</td>
                       <td>{task.created_at}</td> 
                       <td className='d-flex gap-2'>  
                        <Link to={`edit/${task.id}`}><button className='btn btn-warning'>Edit</button></Link>
                       <button onClick={()=>delteteTask(task.id)} className="btn btn-danger">Del</button> 
                       </td>
                     </tr>
                   ))
                 }
                 </tbody>
              </table> 
              <div className='my-5 d-flex justify-content-between'> 
              <div> showing {tasks.from || 0} to {tasks.to || 0} from {tasks.total || 0} </div> 
              <div> {renderPagination()} </div>
              </div>
           </div>
       </div> 
       <div className="col-md-3"> 
        <div className='card'>  
         <div className='card-header text-center bg-ligh'> 
                 <h5 className='mt-2'>Filter By category </h5>         
         </div> 
         <div className='card-body'> 
         <div className="form-check">
              <input
                type="radio"
                checked={!categoryId ? true : false}
                className="form-check-input"
                name="category"
                onChange={() => {
                  setCategoryId(null);
                  setOrderby(null); // Réinitialiser le tri
                  setPage(1); 
                  
                }}
              />
              <label htmlFor="category" className="form-check-label">
                All
              </label>
            </div>

           {
            category?.map((category) => ( 
                 <div key={category.id} className="form-check">
                   <input type="radio"  
                   onChange={(event)=> { 
                    setPage(1)  
                    setCategoryId(event.target.value) ; 
                    
                   }} value={category.id} className='form-check-input' name="category" id={category.id}  /> 
                   <label htmlFor=  {category.id} className='form-check-label'>{category.name}</label>
                 </div>
              ))
            }
            
         </div>
        </div> 
        <div className='card mt-3'> 
          <div className="card-header text-center bg-light">
              <h5>Order by</h5>
          </div> 
          <div className="card-body">
          <h5>Id</h5>
          

<div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    name="id"
    value="asc"
    checked={orderby && orderby.column === "id" && orderby.direction === "asc" ? true : false}
    onChange={(event) => {
      setPage(1);
      setCategoryId(null); // Réinitialiser la catégorie sélectionnée
      setOrderby({
        column: "id",
        direction: event.target.value,
      });
       
    }}
  />
  <label htmlFor="category" className="form-check-label">
    ⬇
  </label>
</div>
<div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    name="id"
    value="desc"
    checked={orderby && orderby.column === "id" && orderby.direction === "desc" ? true : false}
    onChange={(e) => {
      setPage(1);
      setCategoryId(null); // Réinitialiser la catégorie sélectionnée
      setOrderby({
        column: "id",
        direction: e.target.value,
      });
    
    }}
  />
  <label htmlFor="category" className="form-check-label">
    ⬆
  </label>
</div>
 <hr />
<h5>Title</h5>
<div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    name="title"
    value="asc"
    checked={orderby && orderby.column === "title" && orderby.direction === "asc" ? true : false}
    onChange={(event) => {
      setPage(1);
      setCategoryId(null); // Réinitialiser la catégorie sélectionnée
      setOrderby({
        column: "title",
        direction: event.target.value,
      });
       
    }}
  />
  <label htmlFor="category" className="form-check-label">
    A-Z
  </label>
</div>
<div className="form-check">
  <input
    type="radio"
    className="form-check-input"
    name="title"
    value="desc" 
    checked={orderby && orderby.column === "title" && orderby.direction === "desc" ? true : false}
    onChange={(e) => {
      setPage(1);
      setCategoryId(null); // Réinitialiser la catégorie sélectionnée
      setOrderby({
        column: "title",
        direction: e.target.value,
      });
       
    }}
  />
  <label htmlFor="category" className="form-check-label">
    Z-A 
  </label>
</div>

 


          </div>
        </div>
       </div>
    </div> 
  )
}

