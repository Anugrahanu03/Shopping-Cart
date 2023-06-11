// import { dataItems } from "./database"

const dataItems = [...dataItemMap.values()]
const savedItems = [];

HeaderScrollShadow();
MenuToggle();
FormSubmit();
AddItemsToShop();

const addToCartButton = document.querySelectorAll(".cart-btn");
addToCartButton.forEach(button => {
  button.addEventListener('click', AddItemToCart)
})

/////////////////////////////////////////////////////////////////


function AddItemToCart(e) {
  AddedCartButtonStyles(e);
  IncrementCartCount(e.target);
  SaveAddedItems(e.target);
}


function SaveAddedItems(element) {
  // console.log(element.parentElement) //Both Works

  const itemId = element.closest("[data-item-id]").getAttribute("data-item-id");
  savedItems.push({ id: itemId, qty: 1 });
  console.log(savedItems);
  localStorage.setItem("cart", JSON.stringify(savedItems));  ///Stringify for localStorage
}


function AddedCartButtonStyles(button) {
  button.target.style.backgroundColor = "#FF5E0E"
  button.target.style.paddingInline = "4em"
  button.target.style.pointerEvents = "none"
  button.target.innerText = "Added"
}


function IncrementCartCount(button) {
  const cartButton = document.querySelector("[data-shopping-cart]");
  let currVal = cartButton.getAttribute("data-cart-items").match(/\d+/)[0];
  cartButton.setAttribute("data-cart-items", `${++currVal}`);
  if (currVal > 99) {
    cartButton.setAttribute("data-cart-items", "99+");
  }
  // console.log(currVal);
}


function FormSubmit() {
  const formSubmit = document.querySelector(".form-submit");
  formSubmit.addEventListener('click', () => {
    const inputField = formSubmit.nextElementSibling;
    if (inputField.value) {
      inputField.value = "";
      inputField.placeholder = " Thank You!"
      inputField.readOnly = true;
    } else {
      inputField.placeholder = " Please enter your email!"
    }
  })
}


function HeaderScrollShadow() {
  window.addEventListener('scroll', () => {
    let scroll = this.scrollY;
    if (scroll > 10) {
      document.querySelector("header").classList.add("shadow");
    } else {
      document.querySelector("header").classList.remove("shadow");
    }
  })
}


function MenuToggle() {
  const navbar = document.querySelector(".nav-list");
  const menuButton = document.querySelector(".menu");

  // console.log("clicked")
  menuButton.addEventListener('click', () => {

    const visibility = navbar.getAttribute("data-visible");
    if (visibility === "false") {
      navbar.setAttribute("data-visible", true);
      menuButton.children[0].src = "./assets/icons/close.png";
    } else if (visibility === "true") {
      navbar.dataset.visible = false;
      menuButton.children[0].src = "./assets/icons/menu.png";
    }
  })
}


function AddItemsToShop() {
  const values = GetItemsAsHtml();
  // console.log(values);
  const shoppingGrid = document.querySelector(".shopping-grid");
  shoppingGrid.innerHTML = values;
}
function GetItemsAsHtml() {
  return dataItems.map(item => {
    let { id, name, oldPrice, currPrice, img } = item;
    return (
      `<div class="item" data-item-id = ${id}>
          <div class="item-image"><img src="./assets/items/${img}" alt=""></div>
          <h3 class="item-name">${name}</h3>
          <p class="price"><span class="old-price">${oldPrice}</span>${currPrice}$</p>
          <button class="cart-btn">Add to Cart</button>
      </div>
      `)
  }).join("")
}