async function getUserData()
{
  let response = await fetch(`https://gorest.co.in/public/v2/users`)
//   console.log(response)
  let data = response.json()

  return data;
}

async function getUser(d){
  let res = await fetch(`https://gorest.co.in/public/v2/users/${d.id}`)
  // console.log(res)
  let userdata = await res.json()
  // document.getElementById('item1').innerHTML = userdata[0].name
  return userdata
}

getUserData()
  .then(
    (data) => {
      console.log(data)
      let User = []
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
        if (LI.childElementCount > 1){
        LI.removeChild(LI.lastChild)
        }
        if (LI.childElementCount>1){
          LI.removeChild(LI.lastChild)
          }
        if (LI.childElementCount>1){
          LI.removeChild(LI.lastChild)
          }
        if (LI.childElementCount>1){
          LI.removeChild(LI.lastChild)
          }
        
      for (let d=t;d<t+4 ; d++){

        console.log(d)
        getUser(data[d]).then((userdata)=>{
          User.push(userdata)
          const list_item = document.createElement('li')
          list_item.classList.add("list-group-item", "m-4", "d-flex", "justify-content-between", "align-items-start")
          list_item.id = "list-group-item"
          const item = document.createElement('div')
          item.style.color = "#0d6efd"
          item.style.fontWeight = 500   
          item.innerHTML = userdata.name
          const image = document.createElement('img')
          // image.nodeType = "button"
          image.src = "eye-solid.svg"
          image.style.cursor = "pointer"
          
          image.addEventListener("click", ()=> {
          $('#exampleModal').modal('show');
          document.getElementById('modal-body').innerHTML = `1.) Username - ${userdata.name}<br> 2.) Email - ${userdata.email}<br> 3.)Gender - ${userdata.gender}<br> 4.) Status - ${userdata.status}`
          });
          
          list_item.appendChild(item)
          list_item.appendChild(image)
          document.getElementById("items").appendChild(list_item)
          // document.getElementsByClassName.innerHTML = userdata
          // t += 1
          console.log(userdata.name)
        }
        
        
        )
      }
    }
    userLists(t)
    }
  )
  


