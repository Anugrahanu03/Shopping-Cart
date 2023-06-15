
const itemsInCart = JSON.parse(localStorage.getItem("cart")) || [];
// console.log(itemsInCart);

MenuToggle();
IsCartEmpty();
LoadCart();
QuantityChange();
CalculateTotal();
Checkout();
RemoveItem();


function IsCartEmpty(){
  const cartCount = JSON.parse(localStorage.getItem("cart")) || []
  const cart = document.querySelector(".cart");
  const emptyCart = document.querySelector(".cart-empty");
  if(cartCount.length === 0){
    cart.classList.add("hide")
    emptyCart.classList.remove("hide");
  }else{
    cart.classList.remove("hide");
    emptyCart.classList.add("hide");
  }
}

function QuantityChange(){
  const qtyBtn = document.querySelectorAll(".qty-btn");
  qtyBtn.forEach(button => {
    button.addEventListener('click', (e) => {
      const qty = e.target;
      // console.log(qty.parentElement.childNodes[1].innerText)
      if (qty.dataset.operation === "1" && qty.parentElement.childNodes[1].innerText < 100) {
        const value = ++qty.parentElement.childNodes[1].innerText;
        UpdateQuantity(qty, value);
      } else if (qty.dataset.operation === "-1" && qty.parentElement.childNodes[1].innerText > 1) {
        const value = --qty.parentElement.childNodes[1].innerText;
        UpdateQuantity(qty, value);
      }
      CalculateTotal();
    })
  })
}

function LoadCart() {

  const cartGrid = document.querySelector(".loadout-grid");

  itemsInCart.forEach(item => {

    const response = GetItemById(item.id);
    if (response === undefined) return;

    const newItemElement = document.createElement("div");
    newItemElement.setAttribute("data-item-id", item.id)
    newItemElement.classList.add("loadout-item", "table");
    newItemElement.innerHTML =
      `<div>
      <img class ="item-image" src="./assets/items/${response.img}" alt="">
      <p>${response.name}</p>
    </div>
    <p class = "item-price">${response.currPrice}</p>
    <p class = "item-qty"><span class="qty-btn minus" data-operation = "-1">-</span><span class = "qty-value">${item.qty}</span><span class="qty-btn plus" data-operation = "1">+</span></p>
    <p class = "item-total">${response.currPrice * item.qty}$</p>
    <p class = "remove-item" aria-label = "remove item">X</p>`
    // console.log(newItemElement);
    cartGrid.append(newItemElement);
  });
}


function CalculateTotal() {

  let cartTotal = 0;
  const items = document.querySelectorAll(".loadout-item");
  items.forEach(item => {
    const itemPrice = item.querySelector(".item-price").innerText;
    const itemQty = item.querySelector(".item-qty").innerText.match(/\d+/)[0];
    const itemTotal = itemPrice * itemQty;
    item.querySelector(".item-total").innerText = itemTotal + "$";
    cartTotal += itemTotal;
    // console.log(itemTotal);
  })

  document.querySelector(".total").innerText = cartTotal + " $";
}

function Checkout() {
  const total = document.querySelector(".total").innerText;
  if (total <= 0) return;

  const checkoutButton = document.querySelector(".checkout-btn");
  checkoutButton.addEventListener('click', () => {
    alert("Thank you for your order!")
    //Clear the cart
    localStorage.removeItem("cart");
    IsCartEmpty();
  })
}

function UpdateQuantity(element, qty) {

  const itemId = element.closest("[data-item-id]").getAttribute("data-item-id");
  const itemIndex = itemsInCart.findIndex((item)=>{
    return item.id === itemId;
  });
  itemsInCart[itemIndex].qty = qty;
  localStorage.setItem("cart", JSON.stringify(itemsInCart));
}


function RemoveItem(){
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  const removeBtn = document.querySelectorAll(".remove-item");
  removeBtn.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.parentElement;
      const itemId = item.dataset.itemId;
      const itemIndex = cartItems.findIndex((x)=>{
        return x.id === itemId;
      });
      console.log(cartItems)
      console.log(itemIndex)
      cartItems.splice(itemIndex, 1);// Remove from database
      console.log(cartItems)
      localStorage.setItem("cart", JSON.stringify(cartItems));
      item.remove(); // Remove from dom
      CalculateTotal();
      IsCartEmpty();
    })
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
