// Next step > Add remove button functionality
// Can I use the orderArray index #?
// I would need to add the index # to the remove button dataset
// Will this update automatically after removing an item from the array?
// I think if I remove the item from the array and then loop back through the render function it will work. 

import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let orderStarted = false
let orderArray = []

// LISTEN FOR CLICKS AND CALL FUNCTIONS
document.addEventListener("click", function(e) {
    if (e.target.dataset.addItem) {
        addItemToOrder(e.target.dataset.addItem) // -> LINE 44
    }
    if (e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
    }
})

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

// ADD ITEM TO ORDER
function addItemToOrder(itemId) {
    menuArray[itemId].uuid = uuidv4()
    orderArray.push(menuArray[itemId])
    renderOrderHtml()
    renderOrderTotalPrice(orderArray)
}

function renderOrderHtml() {
    document.getElementById("checkout-items").innerHTML = getOrderHtml()
}

function getOrderHtml() {
    const orderItem = orderArray.map(item => {
        return `
        <div id="checkout-item" class="checkout-item-div">
        <p class="checkout-item-name">${item.name}</p>
        <button class="checkout-item-remove-btn verdana" data-remove-item="${item.uuid}">remove</button>
        <p class="checkout-item-price">$${item.price}</p>
        </div>
        `
    }).join("")
    
    return orderItem
}

function renderOrderTotalPrice() {
    document.getElementById("checkout-total-price").innerText = `$${getOrderTotalPrice()}`
}

function getOrderTotalPrice() {
    const orderTotalPrice = orderArray.reduce(function(total, currentValue) {
        return total + currentValue.price
    }, 0)
    return orderTotalPrice
}

// REMOVE ITEM FROM ORDER
function removeItemFromOrder(value) {
    orderArray = orderArray.filter(item => item.uuid != value)
    renderOrderHtml()
    renderOrderTotalPrice(orderArray)
}
