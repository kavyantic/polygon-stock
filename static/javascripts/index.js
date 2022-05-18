// function addRemoverButton(){
//     var scripRemoverButton = document.querySelectorAll('#remove-scrip')
//     scripRemoverButton.forEach(btn=>{
//         btn.addEventListener('click',(e)=>{
//             scripValue = e.target.value
//             fetch(`/removescrip/${scripValue}`).then(res=>{
//                 if(res.status==200){
//                 e.target.parentElement.parentElement.remove()
//                 console.log("remove clicked")
//                 }
//             })

//         })
//     })

// }


socket = io()

socket.on('stockdata',(data)=>{
    data = JSON.parse(data)

    data.forEach(stock=>{
        console.log(stock.sym);
        var symbol_row = document.getElementById(stock.sym)
        console.log(symbol_row)

        symbol_row.querySelector(".openingToday").innerText = stock.op?stock.op:"N/A"
        symbol_row.querySelector(".opening").innerText = stock.o
        symbol_row.querySelector(".closing").innerText = stock.c
        symbol_row.querySelector(".volumePrice").innerText = stock.a
        symbol_row.querySelector(".high").innerText = stock.h
        symbol_row.querySelector(".tradeSize").innerText = stock.z
    })
    
    console.log((data))
})

socket.on('disconnectAPI',function(data){
})








var tbody = document.querySelector("table tbody")


function createTbody(data){
    console.log(data);
    data.forEach((scrip,idx)=>{
        elementIndex = idx+1
       
        var tr =  document.querySelector(`body > div.script-container > table > tbody > tr:nth-child(${elementIndex})`)
        if(scrip.Act==true){
            tr.classList.add('k')
        }
        var tdList = tr.querySelectorAll('td')
        tdList[0].innerText = scrip.name
        tdList[1].innerText = scrip.current

        
        tdList[2].innerText = scrip.open_comparision
        tdList[3].innerText = scrip.tbq_tsq
        act_idx=5
        nameID = scrip.name.replaceAll(' ','-')
        tdList[act_idx].querySelector('.ant-web-form-button').setAttribute('data-target','#'+nameID)
        tdList[act_idx].querySelector('h5').innerText = `${scrip.name}`
        tdList[act_idx].querySelector('.mody').setAttribute('id',nameID)
        tdList[act_idx].querySelectorAll(".hidden-scripcode").forEach(e=>{
            e.setAttribute('value',scrip.name)
        })
        if(scrip.bought){
            tr.classList.remove('sold')
            tr.classList.add('bought')
            tdList[4].innerText = scrip.profit_loss
        }  else if(scrip.sold){
            tr.classList.remove('bought')
            tr.classList.add('sold')
            tdList[4].innerText = scrip.profit_loss
        }


       
    }  )


        // let td = document.createElement("td")
        // let select_field = document.createElement("select")
        // select_field.setAttribute('class',"form-select form-select-sm mb-3")
        // select_field.setAttribute('aria-label',".form-select-sm example")
        // h3 = document.createElement('option')
        // h3.innerText = "hello"
        // select_field.appendChild(h3)
        // td.appendChild(select_field)
        // tr.appendChild(td)
        // tbody.appendChild(tr)
    
        
}




// makeRequest()


// /html/body/div[2]/table/tbody/tr[2]
// 

