const url = window.location.href

const id = url.split('/')[3]

console.log(url,id)
async function getUserProjects(id){
    let res = await fetch(`http://localhost:3000/api/users/getUserProjects/${id}`)
    // console.log(res)
    let userdata = await res.json()
    // document.getElementById('item1').innerHTML = userdata[0].name
    return userdata
  }

async function addProject(d){
    let title = document.getElementById("project-name").value
    let details = document.getElementById("add-text").value
    await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'POST',headers: {
          'Content-type': 'application/json'
      },body:JSON.stringify({title:`${title}`,description:`${details}`})})
    document.getElementById("toast-body").innerHTML = `Project : ${title} Added!`
  
    $('.toast').toast('show')
    // return false
  }

async function updateProject(d){
    // console.log(d)
    let title = document.getElementById("edit-project-name").value
    let details = document.getElementById("edit-text").value
    await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'PUT',headers: {
          'Content-type': 'application/json'
      },body:JSON.stringify({title:`${title}`,description:`${details}`})})
  
    document.getElementById("toast-body").innerHTML = `Project : ${d.title} Updated!`
    // console.log('sdfghj')
    $('.toast').toast('show')
  }

async function deleteProject(d){
    await fetch(`http://localhost:3000/api/projects/${d.id}`,{method:'DELETE'})
  
    document.getElementById("toast-body").innerHTML = `Project: ${d.title} Deleted!`
    
    $('.toast').toast('show')
    
  }

  document.getElementById('moon').addEventListener('click',()=>{
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
    }
})
// console.log(data)
function projectLists(){

    getUserProjects(id).then((userdata)=>{
      document.getElementById('exampleModalLabel').innerHTML = `${userdata.user_name}`

      document.getElementById('project-name').value = ""
      document.getElementById('add-text').value = ""
      document.getElementById('addProject').addEventListener("click", () =>{
          
          $('#addProjectModal').modal('show');
          const y = function(e) {
          addProject(userdata)
          setTimeout(function(){projectLists()},100)
        }
        const docy = document.getElementById('new-project')
        docy.onclick = y;
      })
      


      LI = document.getElementById("items")

      while (LI.childElementCount > 0){
          LI.removeChild(LI.lastChild)
      }
      
      // $('#exampleModal').modal('show');
      
      // console.log(userdata)
      
      const U = Object.values(userdata.project)
      // console.log(userdata.project)
      for (let i=0; i<U.length; i++){
        const list_item = document.createElement('tr')
          const idx = document.createElement('th')
          // idx.setAttribute('scope','row') 
          idx.innerHTML = i+1
          const item = document.createElement('td')
          item.innerHTML = U[i].title
          const space = document.createElement('td')
          const images = document.createElement('td')
          const view = document.createElement('img')
          view.nodeType = "button"
          view.src = "../../eye-solid.svg"
          view.style.cursor = "pointer"
          images.appendChild(view)
          const edit = document.createElement('img')
          edit.nodeType = "button"
          edit.src = "../../edit.svg"
          edit.style.cursor = "pointer"
          images.appendChild(edit)
          const del = document.createElement('img')
          del.nodeType = "button"
          del.src = "../../trash.svg"
          del.style.cursor = "pointer"
          images.appendChild(del)
          list_item.appendChild(idx)
          list_item.appendChild(item)
          list_item.appendChild(space)
          list_item.appendChild(images)
          document.getElementById("items").appendChild(list_item)
        
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
        // 


        edit.addEventListener("click", () => {
          document.getElementById('edit-project-name').value = U[i].title
          document.getElementById('edit-text').value = U[i].description
          $('#editProjectModal').modal('show');
          let x = function(e){
            updateProject(U[i])
            setTimeout(function(){projectLists()},100)
          }

          let docx = document.getElementById('edit-project')
          docx.onclick = x
          
          
        })
        
      }
    
     
    })
  }

  projectLists()