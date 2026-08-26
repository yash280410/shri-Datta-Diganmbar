/* =========================================================
   PREMIUM LOCATION WEBSITE
   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initTheme();

    initMobileMenu();

    initNavbar();

    initScrollProgress();

    initRevealAnimations();

    initBackToTop();

    initSmoothScroll();

    initImageFallbacks();

    initCurrentYear();

});


/* =========================================================
   02. PAGE LOADER
========================================================= */

function initLoader() {

    const loader =
        document.querySelector(".page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 500);

    });

}


/* =========================================================
   03. DARK / LIGHT MODE
========================================================= */

function initTheme() {

    const html =
        document.documentElement;

    const toggle =
        document.querySelector(".theme-toggle");

    if (!toggle) return;


    /* -----------------------------------------
       Load saved theme
    ----------------------------------------- */

    const savedTheme =
        localStorage.getItem("location-theme");


    /* -----------------------------------------
       Detect system preference
    ----------------------------------------- */

    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    if (savedTheme === "dark") {

        html.setAttribute(
            "data-theme",
            "dark"
        );

    } else if (savedTheme === "light") {

        html.setAttribute(
            "data-theme",
            "light"
        );

    } else {

        html.setAttribute(
            "data-theme",
            systemDark
                ? "dark"
                : "light"
        );

    }


    /* -----------------------------------------
       Toggle theme
    ----------------------------------------- */

    toggle.addEventListener("click", () => {

        const currentTheme =
            html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        html.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "location-theme",
            newTheme
        );


        /* Small visual feedback */

        toggle.classList.add("theme-changing");

        setTimeout(() => {

            toggle.classList.remove(
                "theme-changing"
            );

        }, 350);

    });

}


/* =========================================================
   04. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;


    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");

        menuButton.classList.toggle(
            "active",
            isOpen
        );

        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );

    });


    /* -----------------------------------------
       Close menu when clicking a link
    ----------------------------------------- */

    const links =
        navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuButton.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        });

    });


    /* -----------------------------------------
       Close menu when clicking outside
    ----------------------------------------- */

    document.addEventListener("click", event => {

        if (
            !navLinks.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            navLinks.classList.remove("open");

            menuButton.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        }

    });

}


/* =========================================================
   05. NAVBAR SCROLL EFFECT
========================================================= */

function initNavbar() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;


    const updateNavbar =
        () => {

            if (window.scrollY > 40) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );

}


/* =========================================================
   06. SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.querySelector(
            ".scroll-progress span"
        );

    if (!progress) return;


    const updateProgress =
        () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight;

            const windowHeight =
                window.innerHeight;

            const scrollable =
                documentHeight -
                windowHeight;


            if (scrollable <= 0) {

                progress.style.width =
                    "100%";

                return;

            }


            const percentage =
                (scrollTop / scrollable) *
                100;


            progress.style.width =
                `${Math.min(
                    percentage,
                    100
                )}%`;

        };


    updateProgress();


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );

}


/* =========================================================
   07. SCROLL REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;


    /* -----------------------------------------
       Fallback for old browsers
    ----------------------------------------- */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   08. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-top"
        );

    if (!button) return;


    const updateButton =
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        };


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   09. SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight -
                    15;


                window.scrollTo({

                    top:
                        Math.max(
                            targetPosition,
                            0
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   10. IMAGE FALLBACK SYSTEM
========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                 * If an image fails,
                 * use a neutral gradient
                 * instead of showing the
                 * ugly broken-image icon.
                 */

                image.style.display =
                    "none";


                const parent =
                    image.parentElement;


                if (parent) {

                    parent.classList.add(
                        "image-failed"
                    );

                }

            }
        );

    });

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const year =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            year;

    });

}


/* =========================================================
   12. ESC KEY
   Close mobile navigation
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        const navLinks =
            document.querySelector(
                ".nav-links"
            );

        const menuButton =
            document.querySelector(
                ".mobile-menu"
            );


        if (navLinks) {

            navLinks.classList.remove(
                "open"
            );

        }


        if (menuButton) {

            menuButton.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "no-scroll"
        );

    }
);


/* =========================================================
   13. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        !sections.length ||
        !links.length
    ) {

        return;

    }


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const id =
                        entry.target.id;


                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
        );

    });

}


/* =========================================================
   14. BUTTON RIPPLE EFFECT
========================================================= */

function initButtonRipple() {

    const buttons =
        document.querySelectorAll(
            ".primary-button, .outline-button, .white-button, .cta-outline"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.classList.add(
                    "button-ripple"
                );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX -
                    rect.left -
                    size / 2}px`;

                ripple.style.top =
                    `${event.clientY -
                    rect.top -
                    size / 2}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });

}


/* =========================================================
   15. IMAGE PARALLAX
========================================================= */

function initParallax() {

    const visual =
        document.querySelector(
            ".hero-image-wrapper"
        );


    if (!visual) return;


    /*
     * Keep parallax subtle.
     * Humans apparently require motion
     * before deciding a website is expensive.
     */

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.innerWidth < 900
            ) {

                return;

            }


            const rect =
                visual.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight;


            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {

                return;

            }


            const center =
                viewportHeight / 2;


            const offset =
                (rect.top +
                    rect.height / 2 -
                    center) *
                0.025;


            visual.style.transform =
                `translateY(${offset}px)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   16. INITIALIZE EXTRA FEATURES
========================================================= */

initActiveNavigation();

initButtonRipple();

initParallax();


/* =========================================================
   17. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cPremium Location Website",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "Website initialized successfully."
);