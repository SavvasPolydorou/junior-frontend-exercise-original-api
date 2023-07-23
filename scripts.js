const menuIcon = document.getElementById("menuIcon");
// const images = document.getElementsByTagName("img");
// const readMoreBtn = document.getElementById("readMoreBtn");
const articles = document.getElementsByTagName("article");
const futureOfWebLogo = document.getElementById("futureOfWebLogo");
menuToggler.addEventListener("click", (ev) => {
  menu.classList.toggle("open");
  toggleMenuIcon();
  menuToggler.classList.toggle("open");
  document.body.classList.toggle("frozen");
  // Array.from(images).forEach((img) => img.classList.toggle("dim"));
  // readMoreBtn.classList.toggle("dim");
  Array.from(articles).forEach((article) => article.classList.toggle("dim"));
});

function toggleMenuIcon() {
  //depending on the class value of the menu, assign values accordingly
  menuIcon.src =
    menu.classList.value === "open"
      ? "./assets/images/icon-menu-close.svg"
      : "./assets/images/icon-menu.svg";

  menuIcon.alt =
    menu.classList.value === "open" ? "Close Menu Icon" : "Menu Icon";
}

const mq = window.matchMedia("(min-width: 1440px)");

window.addEventListener("resize", function () {
  mq.matches
    ? (futureOfWebLogo.src = "./assets/images/image-web-3-desktop.jpg")
    : (futureOfWebLogo.src = "./assets/images/image-web-3-mobile.jpg");
});
