const menuItem = document.querySelectorAll(".header-nav li");
const courses = document.getElementById("courses");
const subMenuCourses = document.querySelector(".sub-nav");
const loginBtn = document.querySelector(".header-button");
const loginModal = document.querySelector(".login-modal");
const modalTimes = document.getElementById("modal-times");
const overlay = document.querySelector(".overlay");
const modalForm = document.getElementById("form");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const recaptchaBox = document.getElementById("recaptcha-box");
const openSideBarMenuIcon = document.querySelector(".fa-bars");
const closeSideBarMenuIcon = document.querySelector(
  ".side-bar-menu-icon .fa-times"
);
const sideBarMenuBox = document.querySelector(".side-bar-menu-box");
const globalHeader = document.querySelector(".global-header");
const container = document.querySelector(".container");
const sideBarCourses = document.querySelector(".side-bar-courses");
const sideBarCoursesAngleIcon = document.querySelector(".side-bar-courses i");
const sideBarSubCourses = document.querySelector(".side-bar-sub-courses");
const topBar = document.querySelector(".top-bar");
const dayCounter = document.querySelector(".day span");
const hourCounter = document.querySelector(".hour span");
const minuteCounter = document.querySelector(".minute span");
const secondCounter = document.querySelector(".second span");
const topBarSearchIcon = document.getElementById("topBarSearchIcon");
const headerSearchBar = document.querySelector(".header_search_bar");
const backToTop = document.querySelector(".back-to-top");
const seprator = document.querySelector(".seprator-container");
const topBarShoppingBag = document.querySelector(".top-bar .shopping-bag");
const shoppingCartBox = document.querySelector(".shopping-cart-box");
const featuredCourseContainer = document.querySelector(
  ".featured-course-container"
);
const newestCourseContainer = document.querySelector(
  ".newest-course-container"
);
const freeCourseContainer = document.querySelector(".free-course-container");

const itemCartNumberWebView = document.querySelector(".item-cart-number");
const itemCartNumberTabletView = document.querySelector(
  ".top-bar-items-mobile .item-cart-number"
);
const itemCartNumberSideBar = document.querySelector(".studiare-cart-number");
const shoppingCartItems = document.querySelector(".shopping-cart-items");

// onload

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// onload

// event listeners

courses.addEventListener("mouseenter", showMenu);
subMenuCourses.addEventListener("mouseleave", hideMenu);
loginBtn.addEventListener("click", showModal);
modalTimes.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  checkInputs();
});

openSideBarMenuIcon.addEventListener("click", showSideBarMenu);
closeSideBarMenuIcon.addEventListener("click", closeSideBarMenu);
sideBarCourses.addEventListener("click", showSideBarCorses);
backToTop.addEventListener("click", backToTopFun);

window.addEventListener("scroll", function () {
  if (globalHeader.offsetTop + globalHeader.offsetHeight < window.scrollY) {
    globalHeader.style.position = "fixed";
  } else {
    globalHeader.style.position = "relative";
  }

  if (this.window.scrollY > 100) {
    backToTop.classList.add("active");
  } else if (this.window.scrollY < 100) {
    backToTop.classList.remove("active");
  }
  // console.log(this.scrollY)

  const featuredCourseContainerOpacity = getElementProperty(
    featuredCourseContainer,
    "opacity"
  );
  const newestCourseContainerOpacity = getElementProperty(
    newestCourseContainer,
    "opacity"
  );
  const freeCourseContainerOpacity = getElementProperty(
    freeCourseContainer,
    "opacity"
  );

  const featuredCourseContainerHeight = getElementProperty(
    featuredCourseContainer,
    "height"
  );
  const newestCourseContainerHeight = getElementProperty(
    newestCourseContainer,
    "height"
  );
  const freeCourseContainerHeight = getElementProperty(
    freeCourseContainer,
    "height"
  );

  const featuredCourseContainerHeightValue = Number(
    featuredCourseContainerHeight.match(/\d+/)
  );
  const newestCourseContainerHeightValue = Number(
    newestCourseContainerHeight.match(/\d+/)
  );
  const freeCourseContainerHeightValue = Number(
    freeCourseContainerHeight.match(/\d+/)
  );

  // console.log(featuredCourseContainerHeightValue);
  const rectFeature = featuredCourseContainer.getBoundingClientRect();
  const rectNew = newestCourseContainer.getBoundingClientRect();
  const rectFree = freeCourseContainer.getBoundingClientRect();

  const slideAtFeature =
    this.window.scrollY +
    this.window.innerHeight -
    featuredCourseContainerHeightValue / 2;
  const slideAtNewest =
    this.window.scrollY +
    this.window.innerHeight -
    newestCourseContainerHeightValue / 2;
  const slideAtFree =
    this.window.scrollY +
    this.window.innerHeight -
    freeCourseContainerHeightValue / 2;

  // console.log(slideAt , rect.top);

  if (slideAtFeature > rectFeature.top && featuredCourseContainerOpacity < 1) {
    featuredCourseContainer.classList.add("active");
  }
  if (newestCourseContainerOpacity < 1 && slideAtNewest < rectNew.top) {
    newestCourseContainer.classList.add("active");
  }
  if (freeCourseContainerOpacity < 1 && rectFree.top < slideAtFree) {
    freeCourseContainer.classList.add("active");
  }
});

topBarSearchIcon.addEventListener("click", topBarSearchIconHandler);
topBarShoppingBag.addEventListener("click", function () {
  shoppingCartBox.classList.toggle("active");
});

// event listeners

//functions
function showMenu() {
  subMenuCourses.style.display = "flex";
}

function hideMenu() {
  subMenuCourses.style.display = "none";
}

function showModal() {
  if (loginBtn.innerText === "ورود و ثبت نام") {
    loginModal.classList.add("active");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  loginModal.classList.remove("active");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

function checkInputs() {
  const userNameValue = userName.value.trim();
  const passwordValue = password.value.trim();
  if (userNameValue === "") {
    setErrorFor(userName, "نام کاربری حتما باید وارد شود");
  } else if (!checkUserNameWithRegex(userNameValue)) {
    setErrorFor(userName, "نام کاربری معتبر نمی باشد");
  } else {
    setSuccessFor(userName);
  }
  if (passwordValue === "") {
    setErrorFor(password, "رمز عبور باید حتما وارد شود");
  } else if (passwordValue.length < 6) {
    setErrorFor(password, "تعداد کاراکترهای رمز عبور باید بیشتر از 6 باشد");
  } else {
    setSuccessFor(password);
    checkRecaptcha();
  }
}

function setErrorFor(input, message) {
  const modalInputParentElement = input.parentElement;
  const small = modalInputParentElement.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible";
  modalInputParentElement.classList.remove("success");
  modalInputParentElement.classList.add("error");
  return false;
}

function setSuccessFor(input) {
  const modalInputParentElement = input.parentElement;
  const small = modalInputParentElement.querySelector("small");
  small.style.visibility = "hidden";
  modalInputParentElement.classList.remove("error");
  modalInputParentElement.classList.add("success");
}

function checkUserNameWithRegex(email) {
  const pattern = /^([a-zA-Z0-9\.-]+)@([a-z0-9]+).([a-z]{2,5})(.[a-z{2,5}])?$/;
  if (pattern.test(email)) {
    return true;
  }
}

function checkRecaptcha() {
  const recaptchaResponse = grecaptcha.getResponse();
  // console.log(recaptchaResponse);
  if (recaptchaResponse.length === 0) {
    setErrorFor(recaptchaBox, "من روبات نیستم را تیک بزنید");
  } else {
    closeModal();
    const span = loginBtn.querySelector("span");
    span.innerText = "حساب کاربری";
  }
}

function showSideBarMenu() {
  sideBarMenuBox.style.transform = `translate(0 , 0)`;
  openSideBarMenuIcon.style.display = "none";
  closeSideBarMenuIcon.style.display = "block";
  const sideBarMenuWidth =
    getComputedStyle(sideBarMenuBox).getPropertyValue("width");
  globalHeader.style.transform = `translateX(${sideBarMenuWidth})`;
  container.style.transform = `translateX(${sideBarMenuWidth})`;
  document.body.style.overflow = "hidden";
  topBar.style.transform = `translateX(${sideBarMenuWidth})`;
}

function closeSideBarMenu() {
  document.body.style.overflow = "auto";
  sideBarMenuBox.style.transform = `translateX(${-100}%)`;
  globalHeader.style.transform = `translateX(${0})`;
  container.style.transform = `translateX(${0})`;
  topBar.style.transform = `translateX(${0})`;
  openSideBarMenuIcon.style.display = "block";
  closeSideBarMenuIcon.style.display = "none";
}

function showSideBarCorses() {
  if (sideBarCoursesAngleIcon.className == "fa fa-angle-left") {
    sideBarCoursesAngleIcon.className = "fa fa-angle-down";
    sideBarSubCourses.style.opacity = 1;
    sideBarSubCourses.style.height = `${160}px`;
  } else {
    sideBarCoursesAngleIcon.className = "fa fa-angle-left";
    sideBarSubCourses.style.opacity = 0;
    sideBarSubCourses.style.height = `${0}px`;
  }
}

function counter() {
  const releaseTime = "17 feb 2024";
  const targetDate = new Date(releaseTime);
  const currentTime = new Date();

  const timeToRealeaseSecond = (targetDate - currentTime) / 1000;

  const day = Math.floor(timeToRealeaseSecond / 3600 / 24);
  const hour = Math.floor((timeToRealeaseSecond / 3600) % 60);
  const minute = Math.floor((timeToRealeaseSecond / 60) % 60);
  const second = Math.floor(timeToRealeaseSecond % 60);
  dayCounter.innerHTML = day;
  hourCounter.innerHTML = hour;
  minuteCounter.innerHTML = minute;
  secondCounter.innerHTML = second;

  // console.log(day, hour, min, sec);
}

setInterval(counter, 1000);

function topBarSearchIconHandler() {
  if (topBarSearchIcon.className === "fa fa-search") {
    globalHeader.classList.add("disable");
    headerSearchBar.classList.add("active");
    topBarSearchIcon.className = "fa fa-times";
  } else {
    globalHeader.classList.remove("disable");
    headerSearchBar.classList.remove("active");
    topBarSearchIcon.className = "fa fa-search";
  }
}

function backToTopFun() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getElementProperty(element, property) {
  return getComputedStyle(element).getPropertyValue(property);
}

//functions

//creating menuitems underline
const highlightSpan = document.createElement("span");
highlightSpan.classList.add("highlightSpan");
document.body.appendChild(highlightSpan);

menuItem.forEach((item) => {
  item.addEventListener("mouseenter", highlight);
});

function highlight() {
  const itemCordinate = this.getBoundingClientRect();
  // console.log(itemCordinate)
  const { left, width, bottom } = itemCordinate;
  highlightSpan.style.width = `${width}px`;
  highlightSpan.style.transform = `translate(${left}px , ${bottom}px)`;
}

//creating menuitems underline

// shopping Cart

//update shoppingCard items numbers

function updateShoppingCardItemsNum() {
  let numberOfShoppingItems = 0;
  const allShoppingItems = shoppingCartBox.querySelectorAll(
    ".shopping-cart-item"
  );
  numberOfShoppingItems = allShoppingItems.length;
  itemCartNumberWebView.innerText = numberOfShoppingItems;
  itemCartNumberTabletView.innerText = numberOfShoppingItems;
  itemCartNumberSideBar.innerText = numberOfShoppingItems;
}

//update shoppingCard items numbers

//update-price
function updateShoppingCartBoxPrice() {
  const shoppingPrice = document.querySelectorAll(
    ".shopping-cart-items .shopping-cart-item .item-price"
  );
  const shoppingCartTotal = document.querySelector(
    ".shopping-cart-total strong"
  );
  let sumPrice = 0;
  shoppingPrice.forEach((item) => {
    const innerTextPrice = item.innerText;
    const priceValue = Number(innerTextPrice.match(/\d+/));
    sumPrice += priceValue;
  });
  shoppingCartTotal.innerText = `جمع کل  ${sumPrice} تومان`;
}

//update-price

updateShoppingCartBoxPrice();
updateShoppingCardItemsNum();

//delete items

shoppingCartBox.addEventListener("click", function (e) {
  // console.log(e.target);
  e.preventDefault();
  const clickedItem = e.target;
  if (clickedItem.className === "fa fa-times shopping-cart-item-times") {
    const clickedItemParent = clickedItem.parentElement;
    clickedItemParent.remove();
    updateShoppingCartBoxPrice();
    updateShoppingCardItemsNum();
  }
});

//delete items

//add to shoppingCard
let itemLists = [];
const addToShoppingCard = document.querySelectorAll(
  ".featured-course-container .course .course-pic .add-to-cart"
);

// console.log(addToShoppingCard.parentElement)
addToShoppingCard.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const courseContainer = e.target.parentElement.parentElement;

    const courseImage = courseContainer.querySelector("img").src;
    // console.log(courseImage);
    const courseTitle =
      courseContainer.querySelector(".course-title").innerText;
    // console.log(courseTitle);
    let coursePrice = courseContainer.querySelector(".amount").innerText;

    if (coursePrice === "رایگان") {
      coursePrice = 0;
    } else {
      coursePrice = Number(coursePrice);
    }

    // console.log(coursePrice);

    const shoppingCartItemChild = document.createElement("div");
    shoppingCartItemChild.className = "shopping-cart-item";

    shoppingCartItemChild.innerHTML = `<i class="fa fa-times shopping-cart-item-times"></i>
    <div class="item-details">
        <strong class="item-description">${courseTitle}</strong>
        <strong class="item-price">${coursePrice}</strong>
    </div>
    <div class="img-shopping-cart">
        <img src="${courseImage}"
            alt="course">
    </div>`;
    shoppingCartItems.appendChild(shoppingCartItemChild);
    updateShoppingCartBoxPrice();
    updateShoppingCardItemsNum();
  });
});

// function addToCardFunc(e) {

// }

//add to shoppingCard

// shopping Cart

// courses container

const slider = document.querySelector(".discount-courses");
const carousel = document.querySelector(".discount-courses-slide-container");
const next = document.querySelector(
  ".discount-courses-container .fa-angle-right"
);
const prev = document.querySelector(
  ".discount-courses-container .fa-angle-left"
);

const courseItems = document.querySelectorAll(
  ".discount-courses-container .course"
);
const courseWith = window
  .getComputedStyle(courseItems[0])
  .getPropertyValue("width");

let direction;

// console.log(courseWith);

next.addEventListener("click", function () {
  direction = -1;
  carousel.style.justifyContent = "flex-start";
  slider.style.transform = `translateX(-${courseWith})`;
});

prev.addEventListener("click", function () {
  if (direction === -1) {
    direction = 1;
    slider.appendChild(slider.firstElementChild);
  }
  carousel.style.justifyContent = "flex-end";
  slider.style.transform = `translateX(${courseWith})`;
});

slider.addEventListener(
  "transitionend",
  function () {
    if (direction === 1) {
      slider.prepend(slider.lastElementChild);
    } else {
      slider.appendChild(slider.firstElementChild);
    }
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";

    setTimeout(() => {
      slider.style.transition = "all 500ms";
    });
  },
  false
);

// courses container

//comment-section

const comments = document.querySelectorAll(".user-comments-container .comment");
const dotContainer = document.querySelector(".dot-container");
const userCommentsContainer = document.querySelector(
  ".user-comments-container"
);
const commentWidth = window
  .getComputedStyle(comments[0])
  .getPropertyValue("width");

const commentWidthValue = Number(commentWidth.match(/\d+/));
// console.log(comments);

comments.forEach((item, index) => {
  const span = document.createElement("span");
  span.classList.add("dots");
  span.setAttribute("position", index);
  span.addEventListener("click", moveCommentSlider);

  dotContainer.appendChild(span);
});

function moveCommentSlider(e) {
  let commentPosition = e.target.getAttribute("position");
  console.log(commentPosition);

  userCommentsContainer.style.transform = `translateX(-${
    commentPosition * commentWidthValue
  }px)`;
}

//comment-section
