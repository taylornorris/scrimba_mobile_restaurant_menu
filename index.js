import { menuArray } from "./data.js"

let orderStarted = false

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
            <button class="menu-item-add-btn" data-id="${item.id}">+</button>
        </div>
        <div class="menu-item-divider"></div>
        `
    }).join("")
}

document.getElementById("menu-section").innerHTML = getMenuHtml(menuArray)

document.addEventListener("click", function(e) {
    addMenuItemToCheckout(e.target.dataset.id)
})

function addMenuItemToCheckout(itemId) {
    document.getElementById("checkout-items").innerHTML +=
    renderCheckoutItemHtml(menuArray[itemId])
}

function renderCheckoutItemHtml(menuItem) {
    return `
    <div class="checkout-item-div">
    <p class="checkout-item-name">${menuItem.name}</p>
    <button class="checkout-item-remove-btn verdana">remove</button>
    <p class="checkout-item-price">$${menuItem.price}</p>
    </div>
    `
}