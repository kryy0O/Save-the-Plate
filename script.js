// ===== Shared script for all pages =====

// Hamburger menu (mobile)
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = function () {
    navbar.classList.toggle("open");
    menuIcon.classList.toggle("bx-x");
};

// Header shadow when scrolling + close menu
window.onscroll = function () {
    document.querySelector(".header").classList.toggle("sticky", window.scrollY > 50);
    navbar.classList.remove("open");
    menuIcon.classList.remove("bx-x");
};

// Fade-in elements when they scroll into view
function revealOnScroll() {
    document.querySelectorAll(".reveal").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            el.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
revealOnScroll();
