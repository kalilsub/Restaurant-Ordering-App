import {menuArray} from "./data.js"

let orderList = []
const paymentForm = document.getElementById("payment-form")

document.addEventListener("click", (e)=> {
    if(e.target.id === "add-item") {
        addItem(e.target.dataset.id)
    }
    if(e.target.id=== "remove-item") {
        removeItem(e.target.dataset.id)
    }
    if (e.target.id === "complete-btn") {
        document.getElementById("modal").style.display = "block" 
    }
})

paymentForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get("fullName")

    // setTimeout(()=>document.getElementById("modal").innerHTML = `<div class="loader"></div>`,100)

    setTimeout(()=>displayMessage(name), 500)
    
})

function displayMessage(name) {
    document.getElementById("modal").style.display = "none"
    paymentForm.reset()

    document.getElementById("checkout-outer").style.display = "none"
    orderList = [] // reset checkout items for next order

    document.getElementById("success-message").innerHTML = 
    `<p>Thanks, ${name}! Your order is on its way!</p>
    `
    document.getElementById("success-message").style.display = "block"



}



function addItem(itemId) {
    
    const itemObject = menuArray.filter(function(obj){
        return obj.id === itemId
    })[0]
    
     
    orderList.unshift(
        {
            name: itemObject.name,
            price: itemObject.price,
            id: itemObject.id
        }
    )

    displayCheckout(orderList)
}

function removeItem(itemId) {
    const itemObject = orderList.filter(obj=> obj.id === itemId)[0]
    const removeIndex = orderList.indexOf(itemObject)
    orderList.splice(removeIndex,1)
    displayCheckout(orderList)
}

function displayCheckout(order) {
    let sum = 0
    order.forEach(obj => sum += obj.price)

    let counts = {}
    order.forEach(item=>{
        counts[item.name] = (counts[item.name] || 0) + 1
    })
    
    
    let checkOutHtml = ``
    for (const key in counts) {
        const item = menuArray.filter(obj => obj.name === key)[0]

        checkOutHtml += 
        `
    <div class="order-item">
        <div class="order-info">
          <h2>${item.name} x${counts[key]}</h2>
          <button class="btn remove-btn" 
            id="remove-item" data-id="${item.id}">remove</button>
        </div>
        <h3>$${item.price}</h3>
    </div>
        `
    }

    checkOutHtml += `
    <div class="order-item total">
        <h2>Total price</h2>
        <h3>$${sum}</h3>
      </div>
      `

    document.getElementById("checkout").innerHTML = checkOutHtml
    document.getElementById("checkout-outer").style.display = "block"

    document.getElementById("success-message").style.display = "none" //if message from prev order is active

}




function displayItems() {
    let itemsHtml = ``

    menuArray.forEach(obj =>{
        itemsHtml +=
        `
        <div class="item-card">
        <div class="cont">
            <h1 class="icon">${obj.emoji}</h1>
          <div class="item-info">
            <h2>${obj.name}</h2>
            <p>${obj.ingredients}</p>
            <h4>$${obj.price}</h4>
          </div>
        </div>
        <button class="btn add-item-btn" 
                id="add-item" 
                data-id= "${obj.id}">+</button>
      </div>
      `
    })
    return itemsHtml
}

function render() {
    document.getElementById("items-section").innerHTML = displayItems()
}

render()