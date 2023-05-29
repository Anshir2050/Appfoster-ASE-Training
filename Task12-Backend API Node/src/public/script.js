async function getUserData()
{
  let response = await fetch(`http://localhost:3000/api/users`)
//   console.log(response)
  let data = response.json()

  return data;
}

async function getUserProjects(d){
  let res = await fetch(`http://localhost:3000/api/users/getUserProjects/${d.id}`)
  
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
    
    document.getElementById("toast-body").innerHTML = `User: ${d.user_name} deleted!`
  
  $('.toast').toast('show')
    
  
  })
  setTimeout(function(){UL()},100)
  // UL()
}

async function updateUser(d){
  const user_name = document.getElementById("edit-user-name").value
  const email = document.getElementById("edit-email").value
  await fetch(`http://localhost:3000/api/users/${d.id}`,{method:'PUT',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({user_name:`${user_name}`,email:`${email}`})})

    
    document.getElementById("toast-body").innerHTML = `User: ${d.user_name} Updated!`
    $('.toast').toast('show')

    UL()
    
  
}

async function addUser(){
  // console.log(d)
  const user_name = document.getElementById("add-user-name").value
  const email = document.getElementById("add-email").value
  await fetch(`http://localhost:3000/api/users/`,{method:'POST',headers: {
        'Content-type': 'application/json'
    },body:JSON.stringify({user_name:`${user_name}`,email:`${email}`})})
  
    document.getElementById("toast-body").innerHTML = `User: ${user_name} Added!`
    
    $('.toast').toast('show')
  UL()
  
  
}


async function getProject(d){
  let res = await fetch(`http://localhost:3000/api/projects/${d.id}`)
  console.log(res)
  let userdata = await res.json()
  // document.getElementById('item1').innerHTML = userdata[0].name
  return userdata
}

async function deleteProject(d){
  await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'DELETE'})

  document.getElementById("toast-body").innerHTML = `Project: ${d.title} Deleted!`
  
  $('.toast').toast('show')
  
}


document.getElementById('addUser').addEventListener("click", () =>{
  document.getElementById('add-user-name').value = ""
  document.getElementById('add-email').value = ""
  $('#addUserModal').modal('show');
  let a = function(){
    addUser()
  }
  document.getElementById('new-user').onclick = a
  
})
// document.getElementById('addProject').addEventListener("click", () =>{
//   addProject()
// })
function UL() {
  getUserData()
  .then(
    (data) => {
      // console.log(data)
      // let t = 0
      // // pagination
      // let curr = '1'
      // const page1 = document.getElementById('1')
      // const page2 = document.getElementById('2')
      // const page3 = document.getElementById('3')
      // const next = document.getElementById('next')
      // const prev = document.getElementById('prev')
      // prev.classList.add('disabled')

      // page2.addEventListener("click",()=>{
      //   t=4
      //   page2.classList.add('active')
      //   if (curr==1 || curr==3){
      //   document.getElementById(curr).classList.remove('active')
      //   }
      //   curr = '2'
      //   next.classList.remove('disabled')
      //   prev.classList.remove('disabled')
      //   userLists(t)
      // })

      // page1.addEventListener("click",()=>{
      //   t=0
      //   page1.classList.add('active')
      //   if (curr==2 || curr==3){
      //   document.getElementById(curr).classList.remove('active')
      //   }
      //   curr = '1'
      //   prev.classList.add('disabled')
      //   next.classList.remove('disabled')
      //   userLists(t)
      // })

      // page3.addEventListener("click",()=>{
      //   t=8
      //   page3.classList.add('active')
      //   if (curr==1 || curr==2){
      //   document.getElementById(curr).classList.remove('active')
      //   }
      //   curr = '3'
      //   next.classList.add('disabled')
      //   prev.classList.remove('disabled')
      //   userLists(t)
      // })
      // next.addEventListener("click",()=>{
      //   if (curr==1 || curr==2){
      //     t += 4
          
      //     document.getElementById(curr).classList.remove('active')
      //     if (curr==2){
      //       page3.classList.add('active')
      //       next.classList.add('disabled')
      //       curr = '3'
      //     }
      //     else if(curr==1){
      //       page2.classList.add('active')
      //       next.classList.remove('disabled')
      //       prev.classList.remove('disabled')
      //       curr = '2'
      //     }
      //   }
      //   userLists(t)
      // })

      // prev.addEventListener("click",()=>{
      //   if (curr==2 || curr==3){
      //     t -= 4
          
      //     document.getElementById(curr).classList.remove('active')
      //     if (curr==2){
      //       page1.classList.add('active')
      //       prev.classList.add('disabled')
      //       curr = '1'
      //     }
      //     else if(curr==3){
      //       page2.classList.add('active')
      //       next.classList.remove('disabled')
      //       prev.classList.remove('disabled')
      //       curr = '2'
      //     }
      //   }
      //   userLists(t)
      // })


        LI = document.getElementById("items")
        while (LI.childElementCount > 0){
        LI.removeChild(LI.lastChild)
        }
        
        
      for (let d=0;d<data.length ; d++){

        
          // User.push(userdata)
          const list_item = document.createElement('tr')
          const idx = document.createElement('th')
          idx.scope = "row"
          idx.innerHTML = d+1
          const item = document.createElement('td')
          item.innerHTML = data[d].user_name
          const e_mail = document.createElement('td')
          e_mail.innerHTML = data[d].email
          const images = document.createElement('td')
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
          list_item.appendChild(idx)
          list_item.appendChild(item)
          list_item.appendChild(e_mail)
          list_item.appendChild(images)
          document.getElementById("items").appendChild(list_item)
          // let D = 0
          del.addEventListener("click", () => {
                  
                  deleteUser(data[d])
                  
              })
          
          edit.addEventListener("click", () =>{
            document.getElementById('edit-user-name').value = data[d].user_name
            document.getElementById('edit-email').value = data[d].email
            $('#editUserModal').modal('show');
            let b = function() {
              updateUser(data[d])
            }
            document.getElementById('edit-user').onclick = b
          })

          view.addEventListener("click", ()=> {
            // window.open("./index2")
            window.location.href = "./index2"
            // window.location.href = "./index2"
            localStorage.clear()
            // console.log(data[d])
            localStorage.setItem("data",JSON.stringify(data[d]))
        
      
          });
          
          
          // document.getElementsByClassName.innerHTML = userdata
          // t += 1
          // console.log(userdata.name)
        
      }
    
    }
  ) 
}

UL()
// module.exports = {
//   getUserProjects,
//   getProject,
//   addProject,
//   updateProject,
//   deleteProject
// }