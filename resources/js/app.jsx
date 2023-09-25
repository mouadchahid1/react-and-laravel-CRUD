import './bootstrap'; 
import Task from './Component/Tasks/Task';
import Create  from './Component/Tasks/create'; 
import Edit from './Component/Tasks/edit';
import  ReactDOM  from 'react-dom/client';  
import { BrowserRouter,Route , Routes } from 'react-router-dom'; 
import Header from './Header';
 
 
 

ReactDOM.createRoot(document.getElementById("app")).render( 
 <div className='row'> 
    <div className='col-md-12'>  
   
       <BrowserRouter> 
       <Header />
         <Routes>
           <Route path='/'  exact    element = {<Task/>} /> 
           <Route path='/create' exact  element ={<Create/>} />
           <Route path='/edit/:taskId' exact   element = {<Edit />} />
           
         </Routes>
       </BrowserRouter>
    </div>
 </div>
);