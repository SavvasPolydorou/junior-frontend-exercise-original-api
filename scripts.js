//variable declarations
const menuIcon = document.getElementById("menuIcon");
const articles = document.getElementsByTagName("article");
const futureOfWebLogo = document.getElementById("futureOfWebLogo");
const apiURL = "https://6380ce5a786e112fe1ba951e.mockapi.io/Articles";
let apiData = [];
const loader = document.getElementById("loader");
//grab the <a>, <p> and <hr> tags inside the secondArticle
const secondArticleAnchorTags = document
  .getElementById("secondArticle")
  .getElementsByTagName("a");
const secondArticleParagraphs = document
  .getElementById("secondArticle")
  .getElementsByTagName("p");
const hrs = document.getElementsByTagName("hr");

fetchAPIData()
  .then((data) => {
    //since we only care about the first three objects, assign only them
    if (data != undefined) for (let i = 0; i < 3; i++) apiData.push(data[i]);
  })
  .catch((err) => console.error(err))
  .finally(() => {
    //this finally block will always execute (UI content assignment)
    Array.from(secondArticleAnchorTags).forEach(
      (a, i) => (a.innerHTML = apiData[i].title)
    );
    Array.from(secondArticleParagraphs).forEach(
      (p, i) => (p.innerHTML = apiData[i].description)
    );
  });

menuToggler.addEventListener("click", (ev) => {
  menu.classList.toggle("open");
  toggleMenuIcon();
  menuToggler.classList.toggle("open");
  document.body.classList.toggle("frozen");
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
  if (mq.matches) console.log("match");
  mq.matches
    ? (futureOfWebLogo.src = "./assets/images/image-web-3-desktop.jpg")
    : (futureOfWebLogo.src = "./assets/images/image-web-3-mobile.jpg");
});

async function fetchAPIData() {
  //add loading spinner until data is fetched
  loader.classList.add("waiting");
  Array.from(hrs).forEach((hr) => hr.classList.add("waiting"));
  //if for whatever reason the data can't be fetched, then set default data
  let response = await fetch(apiURL)
    .then((data) => {
      if (!data.ok) assignDefaultSecondArticleData();
      return data.json();
    })
    .catch((error) => {
      assignDefaultSecondArticleData();
    });
  loader.classList.remove("waiting");
  Array.from(hrs).forEach((hr) => hr.classList.remove("waiting"));
  return response;
}

function assignDefaultSecondArticleData() {
  //default data (same as design screenshots)
  apiData = [
    {
      title: "Hydrogen VS Electric Cars",
      description: "Will hydrogen-fueled cars ever catch up to EVs?",
    },
    {
      title: "The Downsides of AI Artistry",
      description:
        "What are the possible adverse effects of on-demands AI image generation?",
    },
    {
      title: "Is VC Funding Drying Up?",
      description:
        " Private funding by VC firms is down 50% YOY. We take a look at what that means.",
    },
  ];
}
