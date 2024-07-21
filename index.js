import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const waitingForOrder = document.getElementById("waiting-for-order")
const checkout = document.getElementById("order-section")


let orderArray = []
let orderStarted = false

// LISTEN FOR CLICKS AND CALL FUNCTIONS
document.addEventListener("click", function(e) {
    if (e.target.dataset.addItem) {
        addItemToOrder(menuArray[e.target.dataset.addItem]) 
    }
    if (e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
    }
    if (e.target.dataset.orderBtn) {
        document.getElementById("modal").classList.toggle("hidden")
    }
})

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

// SHOW / HIDE ORDER DEPENDING ON ORDER STATE
function handleOrderState() {
    if (orderArray.length >= 1) {
        orderStarted = true
        renderOrderHtml()
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

// RENDER MENU HTML
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
