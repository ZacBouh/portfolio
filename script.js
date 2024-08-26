const body = document.body;

const btnTheme = document.querySelector(".fa-moon");
const btnHamburger = document.querySelector(".fa-bars");

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass);
  btnTheme.classList.add(btnClass);
};

const getBodyTheme = localStorage.getItem("portfolio-theme");
const getBtnTheme = localStorage.getItem("portfolio-btn-theme");

addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains("dark");

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem("portfolio-theme"));
  btnTheme.classList.remove(localStorage.getItem("portfolio-btn-theme"));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem("portfolio-theme", bodyClass);
  localStorage.setItem("portfolio-btn-theme", btnClass);
};

const toggleTheme = () =>
  isDark() ? setTheme("light", "fa-moon") : setTheme("dark", "fa-sun");

btnTheme.addEventListener("click", toggleTheme);

const displayList = () => {
  const navUl = document.querySelector(".nav__list");

  if (btnHamburger.classList.contains("fa-bars")) {
    btnHamburger.classList.remove("fa-bars");
    btnHamburger.classList.add("fa-times");
    navUl.classList.add("display-nav-list");
  } else {
    btnHamburger.classList.remove("fa-times");
    btnHamburger.classList.add("fa-bars");
    navUl.classList.remove("display-nav-list");
  }
};

btnHamburger.addEventListener("click", displayList);

const scrollUp = () => {
  const btnScrollTop = document.querySelector(".scroll-top");

  if (body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    btnScrollTop.style.display = "block";
  } else {
    btnScrollTop.style.display = "none";
  }
};

document.addEventListener("scroll", scrollUp);

/* Image viewer */

let imageState = {
  imagesUrl: "",
  currentImageIndex: 0,
};

const toggleImageContainer = (event) => {
  event.preventDefault();
  if (event.target.dataset.images) {
    imageState.imagesUrl = event.target.dataset.images.split(",");
    imageState.currentImageIndex = 0;
    refreshImage();
  }
  const imageContainer = document.getElementById("image-container");
  if (imageContainer.classList.contains("hidden")) {
    imageContainer.classList.remove("hidden");
  } else {
    imageContainer.classList.add("hidden");
  }
};

const refreshImage = () => {
  const image = document.getElementById("project-image");
  image.src = imageState.imagesUrl[imageState.currentImageIndex];
};

const nextImage = () => {
  console.log(imageState);
  if (imageState.currentImageIndex < imageState.imagesUrl.length - 1) {
    imageState.currentImageIndex = imageState.currentImageIndex + 1;
  } else {
    imageState.currentImageIndex = 0;
  }
  refreshImage();
};

const previousImage = () => {
  console.log(imageState);
  if (imageState.currentImageIndex > 0) {
    imageState.currentImageIndex = imageState.currentImageIndex - 1;
  } else {
    imageState.currentImageIndex = imageState.imagesUrl.length - 1;
  }
  refreshImage();
};

document
  .getElementById("close-button")
  .addEventListener("click", toggleImageContainer);

document.getElementById("next-button").addEventListener("click", nextImage);
document
  .getElementById("previous-button")
  .addEventListener("click", previousImage);

for (const button of document.getElementsByClassName("open-image")) {
  button.addEventListener("click", toggleImageContainer);
}
