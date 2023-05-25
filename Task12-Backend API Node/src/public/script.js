async function getUserData()
{
  let response = await fetch(`http://localhost:3000/api/users`)
//   console.log(response)
  let data = response.json()

  return data;
}

async function getUserProjects(d){
  let res = await fetch(`http://localhost:3000/api/users/getUserProjects/${d.id}`)
  console.log(res)
  let userdata = await res.json()
  // document.getElementById('item1').innerHTML = userdata[0].name
  return userdata
}

async function deleteUser(d){
  // console.log(d)
  
  getUserProjects(d).then((projects) =>{
    // console.log(projects)
    const P = Object.values(projects.project)
    
    for (let p in P){
      deleteProject(P[p])
    }
    fetch(`http://localhost:3000/api/users/${d.id}`,{method:'DELETE'})
    document.location.reload();
  })
  

  
}

async function updateUser(d){
  console.log(d)
  let user_name = document.getElementById("user-name").value
  await fetch(`http://localhost:3000/api/users/${d.id}`,{method:'PUT',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({user_name:`${user_name}`,description:"Anshir has beautiful Projects"})})
  document.location.reload();
}

async function addUser(){
  // console.log(d)
  let user_name = document.getElementById("user-name").value
  await fetch(`http://localhost:3000/api/users/`,{method:'POST',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({user_name:`${user_name}`,description:"Anshir has beautiful Projects",published:true})})
  document.location.reload()
}


async function getProject(d){
  let res = await fetch(`http://localhost:3000/api/projects/${d.id}`)
  console.log(res)
  let userdata = await res.json()
  // document.getElementById('item1').innerHTML = userdata[0].name
  return userdata
}

async function deleteProject(d){
  return await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'DELETE'})
}

async function updateProject(d){
  console.log(d)
  let title = document.getElementById("edit-project-name").value
  let details = document.getElementById("edit-text").value
  return await (await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'PUT',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({title:`${title}`,description:`${details}`})})).json()
  
}

async function addProject(d){
  let title = document.getElementById("project-name").value
  let details = document.getElementById("add-text").value
  return await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'POST',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({title:`${title}`,description:`${details}`})})
}

document.getElementById('addUser').addEventListener("click", () =>{
  $('#addUserModal').modal('show');
  document.getElementById('new-user').addEventListener("click", () => {
    addUser()
  })
  
})
// document.getElementById('addProject').addEventListener("click", () =>{
//   addProject()
// })

getUserData()
  .then(
    (data) => {
      // console.log(data)
      let t = 0
      // pagination
      let curr = '1'
      const page1 = document.getElementById('1')
      const page2 = document.getElementById('2')
      const page3 = document.getElementById('3')
      const next = document.getElementById('next')
      const prev = document.getElementById('prev')
      prev.classList.add('disabled')

      page2.addEventListener("click",()=>{
        t=4
        page2.classList.add('active')
        if (curr==1 || curr==3){
        document.getElementById(curr).classList.remove('active')
        }
        curr = '2'
        next.classList.remove('disabled')
        prev.classList.remove('disabled')
        userLists(t)
      })

      page1.addEventListener("click",()=>{
        t=0
        page1.classList.add('active')
        if (curr==2 || curr==3){
        document.getElementById(curr).classList.remove('active')
        }
        curr = '1'
        prev.classList.add('disabled')
        next.classList.remove('disabled')
        userLists(t)
      })

      page3.addEventListener("click",()=>{
        t=8
        page3.classList.add('active')
        if (curr==1 || curr==2){
        document.getElementById(curr).classList.remove('active')
        }
        curr = '3'
        next.classList.add('disabled')
        prev.classList.remove('disabled')
        userLists(t)
      })
      next.addEventListener("click",()=>{
        if (curr==1 || curr==2){
          t += 4
          
          document.getElementById(curr).classList.remove('active')
          if (curr==2){
            page3.classList.add('active')
            next.classList.add('disabled')
            curr = '3'
          }
          else if(curr==1){
            page2.classList.add('active')
            next.classList.remove('disabled')
            prev.classList.remove('disabled')
            curr = '2'
          }
        }
        userLists(t)
      })

      prev.addEventListener("click",()=>{
        if (curr==2 || curr==3){
          t -= 4
          
          document.getElementById(curr).classList.remove('active')
          if (curr==2){
            page1.classList.add('active')
            prev.classList.add('disabled')
            curr = '1'
          }
          else if(curr==3){
            page2.classList.add('active')
            next.classList.remove('disabled')
            prev.classList.remove('disabled')
            curr = '2'
          }
        }
        userLists(t)
      })

      function userLists(t){

        LI = document.getElementById("items")
        while (LI.childElementCount > 1){
        LI.removeChild(LI.lastChild)
        }
        
        
      for (let d=t;d<t+4 ; d++){

        
          // User.push(userdata)
          const list_item = document.createElement('li')
          list_item.classList.add("list-group-item", "m-4", "d-flex", "justify-content-between", "align-items-start")
          list_item.id = "list-group-item"
          const item = document.createElement('div')
          item.style.color = "#0d6efd"
          item.style.fontWeight = 500   
          item.innerHTML = data[d].user_name
          const images = document.createElement('div')
          const view = document.createElement('img')
          view.nodeType = "button"
          view.src = "./eye-solid.svg"
          view.style.cursor = "pointer"
          images.appendChild(view)
          const edit = document.createElement('img')
          edit.nodeType = "button"
          edit.src = "./edit.svg"
          edit.style.cursor = "pointer"
          images.appendChild(edit)
          const del = document.createElement('img')
          del.nodeType = "button"
          del.src = "./trash.svg"
          del.style.cursor = "pointer"
          images.appendChild(del)
          list_item.appendChild(item)
          list_item.appendChild(images)
          document.getElementById("items").appendChild(list_item)
          del.addEventListener("click", () => {
                  
                  deleteUser(data[d])
              })
          edit.addEventListener("click", () =>{
            $('#addUserModal').modal('show');
            document.getElementById('new-user').addEventListener("click", () => {
                updateUser(data[d])
            })
          })
          view.addEventListener("click", ()=> {

        function projectLists(){
          getUserProjects(data[d]).then((userdata)=>{

            document.getElementById('addProject').addEventListener("click", () =>{
                
                $('#addProjectModal').modal('show');
                const y = function(e) {
                  // console.log(userdata)
                  addProject(userdata)
                  setTimeout(function(){projectLists()},100)
                  
                  // addProject(userdata)
              }
              const docy = document.getElementById('new-project')
              docy.onclick = y;
              // docy.addEventListener("click",()=>{projectLists()})
                // document.getElementById('new-project').removeEventListener("click",y)
                
            })
            
            // var newHandle = function(event) { handle(event, myArgument); };

            // el.addEventListener("click", newHandle, false);


            LI = document.getElementById("mod-items")

            while (LI.childElementCount > 1){
                LI.removeChild(LI.lastChild)
            }

            $('#exampleModal').modal('show');
            document.getElementById('exampleModalLabel').innerHTML = `${userdata.user_name}`
            // console.log(userdata)
            
            const U = Object.values(userdata.project)
            // console.log(userdata.project)
            for (let i=0; i<U.length; i++){
              const list_item = document.createElement('li')
              list_item.classList.add("list-group-item", "m-4", "d-flex", "justify-content-between", "align-items-start", "mod")
              list_item.id = "list-group-item-mod"
              const item = document.createElement('div')
              item.style.color = "#0d6efd"
              item.style.fontWeight = 500   
              item.innerHTML = U[i].title
              const images = document.createElement('div')
              const view = document.createElement('img')
              view.nodeType = "button"
              view.src = "./eye-solid.svg"
              view.style.cursor = "pointer"
              view.style.margin
              images.appendChild(view)
              const edit = document.createElement('img')
              edit.nodeType = "button"
              edit.src = "./edit.svg"
              edit.style.cursor = "pointer"
              images.appendChild(edit)
              const del = document.createElement('img')
              del.nodeType = "button"
              del.src = "./trash.svg"
              del.style.cursor = "pointer"
              images.appendChild(del)
              list_item.appendChild(item)
              list_item.appendChild(images)
              document.getElementById("mod-items").appendChild(list_item)
              
              view.addEventListener("click", () =>{
                document.getElementById('modal-project-title').innerText = U[i].title
                document.getElementById('modal-project').innerText = U[i].description
                $('#ProjectModal').modal('show');
              }
              )
              let z = function(e){
                deleteProject(U[i])
                setTimeout(function(){projectLists()},100)
              }
              del.onclick = z;
              // del.onclick = projectLists()
            //   $("#myModal1").on("show.bs.modal", function(e) {
            //     var link = $(e.relatedTarget);
            // $(this).find(".modal-body").load(link.attr("href"));
            // });

              // del.on("show.bs.modal", function(e){
              //   deleteProject(U[i])
              //   let link = $(e.relatedTarget);
              //   $(this).find(".modal-body").load(link.attr("#exampleModal"));
              // })


              edit.addEventListener("click", () => {
                $('#editProjectModal').modal('show');
                let x = function(e){
                  updateProject(U[i])
                  setTimeout(function(){projectLists()},100)
                }

                const docx = document.getElementById('edit-project')
                docx.onclick = x
                // docx.addEventListener(()=>{
                //   projectLists()
                // })
                // docx.onclick = projectLists()
                
                
              })
              console.log(userdata)
              
              
              



            }
            // document.getElementById('modal-body').innerHTML += `<table> <tr> <th>Email </th> <td>${userdata.email}</td></tr><tr> <th>Gender </th> <td>${userdata.gender}</td></tr> <tr><th> Status </th> <td>${userdata.status}</td></tr></table>`
          })
        }
        projectLists()
          
          });
          
          
          // document.getElementsByClassName.innerHTML = userdata
          // t += 1
          // console.log(userdata.name)
        
      }
    }
    userLists(t)
    }
  ) 