import axios from "axios";

const useCategory = async () => {
 try {
     const reponse = await axios.get("/api/categories"); 
     return reponse.data ;
 } catch (error) { 
     alert(error);
 }
} 
export default useCategory ; 