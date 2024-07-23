import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let orderArray = []
let orderStarted = false

const orderBtn = document.getElementById("order-btn")
const modalCloseBtn = document.getElementById("modal-close-btn")

// EVENT LISTENERS
document.addEventListener("click", function(e) {
    if (e.target.dataset.addItem) {
        addItemToOrder(menuArray[e.target.dataset.addItem]) 
    }
    if (e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
    }
    // if (e.target.dataset.modalCloseBtn) {
    //     document.getElementById("modal").classList.toggle("hidden")
    // }
    if (e.target.dataset.payBtn) {
        const formData = new FormData(document.getElementById("modal"))
        const name = formData.get("name")
        console.log(name)
    }
})

orderBtn.addEventListener("click", function() {
    renderModal()
})

// modalCloseBtn.addEventListener("click", function() {
//     document.getElementById("modal").classList.toggle("hidden")
// })

// ADD ITEM TO ORDER
function addItemToOrder(item) {
    orderArray.push({
        name: item.name,
        price: item.price,
        uuid: uuidv4()
    })
    handleOrderState()
}

// REMOVE ITEM FROM ORDER
function removeItemFromOrder(value) {
    orderArray = orderArray.filter(item => item.uuid != value)
    handleOrderState()
}

// SHOW OR HIDE ORDER DEPENDING ON ORDER STATE
function handleOrderState() {
    if (orderArray.length >= 1) {
        renderOrderHtml()
        orderStarted = true
    }
    else orderStarted = false
    
    document.getElementById("waiting-for-order").classList.toggle("hidden", orderStarted)
    document.getElementById("order-section").classList.toggle("hidden", !orderStarted)
}

// RENDER ORDER HTML AND TOTAL PRICE
function renderOrderHtml() {
    document.getElementById("order-items").innerHTML = getOrderHtml()
    renderOrderTotalPrice()
}

function getOrderHtml() {
    const orderItem = orderArray.map(item => {
        const {
            name,
            uuid,
            price
        } = item
        
        return `
        <div id="order-item" class="order-item-div">
        <p class="order-item-name">${name}</p>
        <button class="order-item-remove-btn verdana" data-remove-item="${uuid}">remove</button>
        <p class="order-item-price">$${price}</p>
        </div>
        `
    }).join("")
    
    return orderItem
}

function renderOrderTotalPrice() {
    document.getElementById("order-total-price").innerText = `$${getOrderTotalPrice()}`
}

function getOrderTotalPrice() {
    const orderTotalPrice = orderArray.reduce(function(total, currentValue) {
        return total + currentValue.price
    }, 0)
    
    return orderTotalPrice
}

// RENDER MODAL
function renderModal() {
    document.getElementById("modal").classList.toggle("hidden")
    document.getElementById("modal").innerHTML = `
    <div class="modal-div radius">
        <button id="modal-close-btn" class="modal-close-btn">x</button>
        <h4 class="verdana">Enter card details</h4>
        <div class="input-div">
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                pattern="[a-zA-Z ]{2,}"
                class="verdana radius"
                required
            >
            <input
                type="text"
                id="card-number"
                name="card-number"
                minlength="16"
                maxlength="16"
                placeholder="Enter card number"
                pattern="[0-9]{16}"
                class="verdana radius"
                required
            >
            <input
                type="text"
                id="cvv-number"
                name="cvv-number"
                minlength="3"
                maxlength="3"
                placeholder="Enter CVV"
                pattern="[0-9]{3}"
                class="verdana radius"
                required
            >
        </div>
        <button 
            type="submit" 
            class="pay-btn verdana green-btn radius" 
            data-pay-btn="1">
            Pay $${getOrderTotalPrice()}
        </button>
    </div>
    `
}

function completeOrder(name) {
    document.getElementById("waiting-for-order").classList.toggle("hidden")
}

// RENDER MENU
document.getElementById("menu-section").innerHTML = getMenuHtml()

function getMenuHtml() {
    const menuItem = menuArray.map(item => {
        const {
            emoji,
            name,
            ingredients,
            price,
            id
        } = item;
        
        return `
        <div class="menu-item-card">
        <p class="menu-item-image">${emoji}</p>
        <div class="menu-item-desc">
        <h2 class="menu-item-name">${name}</h2>
        <p class="menu-item-ingredients">${ingredients}</p>
        <p class="menu-item-price">$${price}</p>
        </div>
        <button class="menu-item-add-btn" data-add-item="${id}">+</button>
        </div>
        <div class="menu-item-divider"></div>
        `
    }).join("")
    
    return menuItem
}
