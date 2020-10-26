
console.log('Javascript working')


   

    document.querySelector('button').addEventListener('click',()=>{
        const add =document.querySelector('input').value
        console.log(add)
        document.querySelector('#loc').textContent='Loading...'
        fetch(`/weather?loc=${add}`).then((data)=>{
          data.json().then((res)=>{
              if (res.error){
                  console.log(res.error)
                  document.querySelector('#loc').textContent=`${res.error}`
              }
              else{
            document.querySelector('#loc').textContent=`${res.location}`
            document.querySelector('#temp').textContent=`${res.temperature}`
              }
        })
    })
    

      

    })

