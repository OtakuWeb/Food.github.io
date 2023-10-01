"use strict";

/*PRELOAD LOADING WILL END AFTER DOCUMENT IS LOADED*/ 
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function (){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

/*ADD EVENT LISTENER FOR MULTIPLE ELEMENTS*/

const addEventOnElements = function(elements, eventType, callback){
    for(let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/*HEADER / BACK-TOP*/


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function (){
   
}

window.addEventListener("scroll", function (){
    if(this.window.scrollY > 50){
        header.classList.add("active");
        backTopBtn.classList.add("active");
       
    }else{
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
})

/*HERO SLIDER*/

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function (){
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const sliderNext = function (){
    if(currentSlidePos > heroSliderItems.length -1){
        currentSlidePos = 0;
    }else{
        currentSlidePos ++;
    }
    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", sliderNext);

const sliderPrev = function(){
    if(currentSlidePos < 0){
        currentSlidePos = heroSliderItems.length -1;
}else{
    currentSlidePos--;
}

updateSliderPos();

}

heroSliderPrevBtn.addEventListener("click", sliderPrev);

/*AUTO SLIDE*/

let autoSlideInterval;

const autoSlide = function (){
    autoSlideInterval = setInterval(function () {
        sliderNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function (){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/*PARALLAX*/

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
    x = (event.clientX / window.innerWidth * 10) -5;
    y = (event.clientY / window.innerWidth * 10) -5;

    //REVERSE THE NUMBER

    x = x- (x *2);
    y = y- (y *2);

    for(let i=0, len = parallaxItems.length; i < len; i++){
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});

//REVIEWS
let reviews =[
   
    {
        id:1,
        name:"Johnson Smith",
        img: "./img/w2.jpg",
        info:" adipisicing elit. Aperiam quisquam libero amet ratione ex numquam quas facilis consectetur corrupti error?"
    },
    {
        id:2,
        name:"Arthur Curry",
        img: "./img/w7.jpg",
        info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam libero amet ratione ex numquam quas facilis consectetur corrupti error?"
    },
    {
        id:3,
        name:"Dumebi Emeka",
        img: "./img/w10.jpg",
        info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam libero amet "
    }
];

let img = document.getElementById("profile-pic");  
let author = document.getElementById("author");
let info = document.getElementById("text");
let bg = document.getElementById("bg");


let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");

//set starting item
let currentItem = 0;

//load initial item
window.addEventListener("DOMContentLoaded", function (){
    showPerson(currentItem);
});

function showPerson(person){
    let item = reviews[person];
    img.src = item.img;
    author.textContent = item.name;
    info.textContent = item.info;
}

//nextBtn
nextBtn.addEventListener("click", function() {
   currentItem++;
   if(currentItem > reviews.length - 1){
    currentItem = 0;
   }
   showPerson(currentItem);
});

//prevBtn
prevBtn.addEventListener("click", function() {
    currentItem--;
    if(currentItem < 0){
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);
 });

 /*SCROLL EFFECT */

 window.addEventListener("scroll", reveal);

 function reveal(){
   let reveals = document.querySelectorAll(".reveal");

   for(let i = 0; i < reveals.length; i++){
       
       let windowheight = window.innerHeight;
       let revealtop = reveals[i].getBoundingClientRect().top;
       let revealpoint = 70;

       if(revealtop < windowheight - revealpoint){
           reveals[i].classList.add("active");
       }else{
           reveals[i].classList.remove("active");
       }
   }
 }