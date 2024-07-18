// IM STUCK REMOVING ITEMS FROM ORDER
// CREATE NEW OBJECTS TO RENDER ORDER, USING OBJECT INDEX LINKED TO REMOVE BUTTON?
// ALSO NEED TO CONSIDER REMOVING PRICE FROM PRICE ARRAY. MAYBE SUMMING NEW OBJECT KEY:VALUES INSTEAD OF STORING IN VARIABLE?


import { menuArray } from "./data.js"

let orderStarted = false
let orderArray = []
let orderTotal = 0

// LISTEN FOR CLICKS AND CALL FUNCTIONS
document.addEventListener("click", function(e) {
    if(e.target.dataset.addItem) {
        addItemToOrder(e.target.dataset.addItem) // -> LINE 50
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
    orderArray.push(menuArray[itemId])
    renderOrderHtml()
}

function renderOrderHtml() {
    document.getElementById("checkout-items").innerHTML = getOrderHtml()
}

function getOrderHtml() {
    
    const orderItem = orderArray.map(item => {
        const {
            name,
            price
        } = item;
        
        return `
        <div id="checkout-item" class="checkout-item-div">
        <p class="checkout-item-name">${name}</p>
        <button class="checkout-item-remove-btn verdana" data-remove-item="">remove</button>
        <p class="checkout-item-price">$${price}</p>
        </div>
        `
    }).join("")
    
    return orderItem
}


// function addMenuItemToCheckout(itemId) {
//     document.getElementById("checkout-items").innerHTML += renderCheckoutItemHtml(menuArray[itemId])
// }

// function renderCheckoutItemHtml(item) {
//     renderCheckoutTotalPrice(item)
    
//     return `
//     <div id="checkout-item" class="checkout-item-div">
//     <p class="checkout-item-name">${item.name}</p>
//     <button class="checkout-item-remove-btn verdana" data-remove-item="">remove</button>
//     <p class="checkout-item-price">$${item.price}</p>
//     </div>
//     `    
// }

// function renderCheckoutTotalPrice(item) {
//     orderPriceArray.push(item.price)

//     orderTotal = orderPriceArray.reduce((total, currentValue) => {
//         return total + currentValue
//     })
    
//     document.getElementById("checkout-total-price").innerText = `$${orderTotal}`
// }
