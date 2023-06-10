// HeaderScrollShadow();

const navbar = document.querySelector(".nav-list");
const menuButton = document.querySelector(".menu");

// console.log("clicked")
menuButton.addEventListener('click', ()=>{

  const visibility = navbar.getAttribute("data-visible");
  if(visibility === "false"){
    navbar.setAttribute("data-visible", true);
    menuButton.children[0].src = "./assets/icons/close.png";
  }else if(visibility === "true"){
    navbar.dataset.visible = false;
    menuButton.children[0].src = "./assets/icons/menu.png";
  }

})


function HeaderScrollShadow(){
  window.addEventListener('scroll', () => {
    let scroll = this.scrollY;
    if (scroll > 10) {
      document.querySelector("header").classList.add("shadow");
    } else {
      document.querySelector("header").classList.remove("shadow");
    }
  })
}