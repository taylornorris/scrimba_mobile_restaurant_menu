import { menuArray } from "./data.js"

let orderStarted = false
let orderPriceArray = []
let orderTotal = 0

function getMenuHtml(menuArr) {
    return menuArr.map(item => {
        return `
        <div class="menu-item-card">
            <p class="menu-item-image">${item.emoji}</p>
            <div class="menu-item-desc">
                <h2 class="menu-item-name">${item.name}</h2>
                <p class="menu-item-ingredients">${item.ingredients}</p>
                <p class="menu-item-price">${item.price}</p>
            </div>
            <button class="menu-item-add-btn" data-add-item="${item.id}">+</button>
        </div>
        <div class="menu-item-divider"></div>
        `
    }).join("")
}

document.getElementById("menu-section").innerHTML = getMenuHtml(menuArray)

document.addEventListener("click", function(e) {
    if(e.target.dataset.addItem) {
        addMenuItemToCheckout(e.target.dataset.addItem)
    }
})

function addMenuItemToCheckout(itemId) {
    document.getElementById("checkout-items").innerHTML += renderCheckoutItemHtml(menuArray[itemId])
}

function renderCheckoutItemHtml(item) {
    renderCheckoutTotalPrice(item)
    return `
    <div id="checkout-item-${item.id}"class="checkout-item-div">
    <p class="checkout-item-name">${item.name}</p>
    <button class="checkout-item-remove-btn verdana" data-remove-item="${item.id}">remove</button>
    <p class="checkout-item-price">$${item.price}</p>
    </div>
    `    
}

function renderCheckoutTotalPrice(item) {
    orderPriceArray.push(item.price)

    orderTotal = orderPriceArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })
    
    document.getElementById("checkout-total-price").innerText = `$${orderTotal}`
}
