import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let orderArray = []
let orderStarted = false

const menuSection = document.getElementById("menu-section")
const waitingForOrder = document.getElementById("waiting-for-order")
const orderSection = document.getElementById("order-section")
const orderBtn = document.getElementById("order-btn")
const modal = document.getElementById("modal")
const modalCloseBtn = document.getElementById("modal-close-btn")
const orderCompleteSection = document.getElementById("order-complete-section")
const orderCompleteSummaryDiv = document.getElementById("order-complete-summary-div")

// EVENT LISTENERS
document.addEventListener("click", (e) => {
    if (e.target.dataset.addItem) {
        addItemToOrder(menuArray[e.target.dataset.addItem]) 
    }
    if (e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
    }
})

orderBtn.addEventListener("click", () => renderModal())

modalCloseBtn.addEventListener("click", () => {
    modal.reset()
    modal.style.display = "none"
})

modal.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(modal)
    const name = formData.get("name")
    document.getElementById("customer-name").innerText = name
    completeOrder()
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

// SHOW OR HIDE ORDER DEPENDING ON ORDER STATE
function handleOrderState() {
    if (orderArray.length >= 1) {
        renderOrderHtml()
        orderStarted = true
    }
    else orderStarted = false
    
    waitingForOrder.classList.toggle("hidden", orderStarted)
    orderSection.classList.toggle("hidden", !orderStarted)
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
    document.getElementById("total-price").innerText = getOrderTotalPrice()
    modal.style.display = "block"
}

//COMPLETE ORDER
function completeOrder() {
    menuSection.style.display = "none"
    modal.style.display = "none"
    waitingForOrder.style.display = "none"
    orderSection.style.display = "none"

    orderCompleteSection.style.display = "inline"
    orderCompleteSummaryDiv.innerHTML = `
    ${getCompletedOrderHtml()}
    <div class="order-divider"></div>
    <div class="order-total-div">
        <p class="order-total-text">Total price:</p>
        <p class="order-total-price">$${getOrderTotalPrice()}</p>
    </div>
    `
    
}

function getCompletedOrderHtml() {
    const orderItem = orderArray.map(item => {
        const {
            name,
            price
        } = item
        
        return `
        <div id="completed-order-item" class="completed-order-item">
            <p class="completed-order-item-name">${name}</p>
            <p class="completed-order-item-price">$${price}</p>
        </div>
        `
    }).join("")
    
    return orderItem
}

// RENDER MENU
menuSection.innerHTML = getMenuHtml()

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
