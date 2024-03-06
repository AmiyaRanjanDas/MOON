//Preloader
TweenMax.staggerFrom(".block", 0.8, {
    width: "5.1%",
    ease: Power1.easeIn,
    delay: 1
}, 0.04);
TweenMax.staggerFrom("#moonImg , #nav", 1.5, {
    opacity:0,
    y:30,
    ease: Expo.easeInOut,
    delay: 2
}, 0.09);
TweenMax.staggerFrom("#up", 1.5, {
    opacity: 0,
    y: -30, // Change y value to move text downwards
    ease: Expo.easeInOut,
    delay: 2.5
}, 0.09);

// sec2
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    gsap.registerPlugin(ScrollTrigger);

    let workInfoItems = document.querySelectorAll('.work_photo-item');
    workInfoItems.forEach(function (item, index) {
        item.style.zIndex = workInfoItems.length - index;
        console.log(index);
    });

    gsap.set(".work_photo-item", {
        clipPath: function () {
            return "inset(0px 0px 0px 0px)"
        }
    });

    const animation = gsap.to(".work_photo-item:not(:last-child)", {
        clipPath: function () {
            return "inset(0px 0px 100% 0px)"
        },
        stagger: .5,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: '.work',
        start: 'top top',
        end: 'bottom bottom',
        animation: animation,
        scrub: 1

    });
});

// sec3
gsap.to(".letters:first-child", {
    x: () => -innerWidth * 3,
    scale: 10,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".sec3",
        start: "top top",
        end: `+=200%`,
        scrub: 0.5
    }
})
gsap.to(".letters:last-child", {
    x: () => innerWidth * 3,
    scale: 10,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".sec3",
        start: "top top",
        end: `+=200%`,
        scrub: 0.5
    }
})
gsap.to(".img-cont", {
    rotation: 0,
    clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)',
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".sec3",
        start: "top top",
        end: `+=200%`,
        scrub: 0.5
    }
})
gsap.to(".img-cont img", {
    scale: 1,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".sec3",
        start: "top top",
        end: `+=200%`,
        scrub: 0.5
    }
})

// sec4
var cursor = document.querySelector("#mask"),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                maskPosition: mouseX + "px " + mouseY + "px",
                transition: "0.2s"
            }
        })
    }
})
window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX - 40,
        mouseY = e.clientY - 40
})
document.querySelector(".sec4 h3").addEventListener("mouseover", function () {
    cursor.style.maskSize = "23vw";
});
// Event listener for mouse leaving the <h3> element
document.querySelector(".sec4 h3").addEventListener("mouseleave", function () {
    cursor.style.maskSize = "5vw";
});

// sec5

const track = document.querySelector(".img-track");
const sec5 = document.querySelector(".sec5");

sec5.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
sec5.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
sec5.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -70;
    const nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -100);
    track.dataset.percentage = nextPercentage;
    // track.style.transform=`translate(${nextPercentage}% , -50%)`;
    track.animate({
        transform: `translate(${nextPercentage}% , -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("trackImg")) {
        // image.style.objectPosition=`${nextPercentage+100}% 50%`;
        image.animate({
            objectPosition: `${nextPercentage + 100}% 50%`
        }, { duration: 1200, fill: "forwards" });
    }
}


// sec6
let elements = document.querySelectorAll(".fLink");
elements.forEach((element) => {
    let innerText = element.innerText;
    element.innerHTML = "";

    let textContainer = document.createElement("div");
    textContainer.classList.add("blocks");

    for (let letter of innerText) {
        let span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        textContainer.appendChild(span);
    }
    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));
});
elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.classList.remove("play");
    });
});