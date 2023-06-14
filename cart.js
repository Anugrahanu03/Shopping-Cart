
LoadCart();
CalculateTotal();


//Need to add cart empty message and goto home

const qtyBtn = document.querySelectorAll(".qty-btn");
qtyBtn.forEach(button => {
  button.addEventListener('click', (e) => {
    const qty = e.target;
    // console.log(qty.parentElement.childNodes[1].innerText)
    if (qty.dataset.operation === "1" && qty.parentElement.childNodes[1].innerText < 100) {
      ++qty.parentElement.childNodes[1].innerText;
    } else if (qty.dataset.operation === "-1" && qty.parentElement.childNodes[1].innerText > 1) {
      --qty.parentElement.childNodes[1].innerText;
    }
    CalculateTotal();
  })
})


function LoadCart() {
  const itemsInCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartGrid = document.querySelector(".loadout-grid");

  itemsInCart.forEach(item => {

    const response = GetItemById(item.id);
    if (response === undefined) return;

    const newItemElement = document.createElement("div");
    newItemElement.classList.add("loadout-item", "table");
    newItemElement.innerHTML =
      `<div>
      <img class ="item-image" src="./assets/items/${response.img}" alt="">
      <p>${response.name}</p>
    </div>
    <p class = "item-price">${response.currPrice}</p>
    <p class = "item-qty"><span class="qty-btn minus" data-operation = "-1">-</span><span class = "qty-value">${item.qty}</span><span class="qty-btn plus" data-operation = "1">+</span></p>
    <p class = "item-total">${response.currPrice * item.qty}$</p>`
    // console.log(newItemElement);
    cartGrid.append(newItemElement);
  });
}

function Checkout() {
  const total = document.querySelector(".total").innerText;
  if (total <= 0) return;

  const checkoutButton = document.querySelector(".checkout-btn");
  checkoutButton.addEventListener('click', () => {
    alert("Thank you for your order!")

    //Clear the cart
    
  })
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