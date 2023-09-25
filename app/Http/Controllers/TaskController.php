<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // 
    public function index() {
         return Task::with("category")->paginate(5);
    } 
    public function store (TaskRequest $request) {
        $task = Task::create([ 
            "title" => $request->title  , 
            "body" => $request->body  ,
            "category_id" => $request->category_id  ,
        ]); 
        return $task ; 
    } 
     public function show(Task $task) {
        return $task ; 
     } 
     public function update(Request $request , Task $task ) {
         $task->update([ 
            "title" => $request->title , 
            "body" => $request->body , 
            "category_id" => $request->category_id , 
            "done" => $task->done 
         ]); 
         return $task ; 
     } 
     public function destroy (Task $task) {
               $task->delete() ; 
               return array("message","task deleted successfully ✅") ;
     } 
     public function getTaskByCategory (Category $category) {
        return $category->tasks()->with("category")->paginate(5) ; 
     } 
     public function getTaskOrderBy($column, $order) {  
        return Task::with("category")->orderBy($column,$order)->paginate(5)  ; 
      }  
      public function getTaskByTerm ($term) { 
          return Task::with("category")->where("title" , "like" , "%".$term."%") 
                                       ->orWhere("body","like"  , "%".$term."%")  
                                       ->orWhere("id", "like" , "%".$term."%")
                                       ->paginate(5);
      }

}
