var task = []
var update_id;
var input = document.getElementById("task-input")
var create_btn = document.getElementById("create-btn")
var task_list_box = document.getElementById("task-list-box")
var modal_box  = document.getElementById("modal-box")
var overlay   = document.getElementById("overlay")
var cancel_modal = document.getElementById("cancel-modal")
var update_input = document.getElementById("update-input")
var update_btn = document.getElementById("update")
var no_task = document.getElementById("no-task")


create_btn.addEventListener("click",()=>{

    if(input.value != ""){
    task.unshift({
        id:task.length+1,
        task:input.value,
        complete:false
    })
}
    input.value="";
    task_update();
})

function task_update(){

    task_list_box.innerHTML = "";
    task.forEach(e => {
        if(e.complete==false){
       task_list_box.innerHTML +=`
       <div class="task-list" >
       <h1>${e.task}</h1>
       <button id="delete" onclick="deletetask(${e.id})">Delete</button>
       <button id="edit" onclick="edittask(${e.id},'${e.task}')" >Edit</button>
       <button id="complete" onclick="completetask(${e.id})" >Complete</button>
       </div>	
       `
        }
        
    });

    is_task_empty();
   
}

function deletetask(id){

    task.some((e,i)=>{

        if(e.id==id){
            delete task[i];
            return true;
        }
    })

    task_update();
}

function completetask(id){

   task.some((e)=>{

       if(e.id==id){
           e.complete = true;
           return true;
       }
   })
    task_update();
}



function edittask(id,task){
    show_modal();

    update_input.value = task;
    update_id = id;

}

overlay.addEventListener("click",()=>{

    hide_modal();
})

cancel_modal.addEventListener('click',()=>{
    hide_modal();
})

update_btn.addEventListener("click",(e)=>{

    var updated_value = update_input.value;

    if(updated_value.length !=0){

    task.some((e,i)=>{
        
        if(e.id==update_id){

            e.task = updated_value; 
            hide_modal();
            return true;

        }
    })
}

else{
   update_input.style.border="3px solid red";
}

    task_update();

   

})


function show_modal(){ 
    
    update_input_border();
    modal_box.style.display="block";
    overlay.style.display="block";
}

function hide_modal(){
    modal_box.style.display="none";
    overlay.style.display="none";
}

update_input.addEventListener("keypress",()=>{
    update_input_border();
})

function update_input_border(){
    update_input.style.border="2px solid blue";
}



function is_task_empty(){
 if(task_list_box.innerHTML.length==0){
    no_task.style.display="block";
 }
 else{
     no_task.style.display="none";
 }
}