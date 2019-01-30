//click button in header to show/hide nav-menu
let cross = document.getElementById('cross');
let burger = document.getElementById('burger');
let dropDown = document.getElementById('drop-down');

document.getElementById('nav-btn').addEventListener('click', function () {
    if (cross.classList.contains('hide')) {
        burger.classList.replace('show', 'hide');
        cross.classList.replace('hide', 'show');
        dropDown.classList.replace('hide', 'show');
    } else {
        burger.classList.replace('hide', 'show');
        cross.classList.replace('show', 'hide');
        dropDown.classList.replace('show', 'hide');
    }
});

//open pop-up video
let player = document.getElementById('player');

document.getElementById('video-btn').addEventListener('click', function () {
    player.childNodes[1].allow = 'autoplay';
    player.classList.replace('hide-player', 'open-player');
    player.childNodes[1].src = 'https://www.youtube.com/embed/sDbmcPnzwy4?autoplay=1';
});

document.getElementById('exit').addEventListener('click', function () {
    player.classList.replace('open-player', 'hide-player');
    player.childNodes[1].src = 'https://www.youtube.com/embed/sDbmcPnzwy4';
});

//scroll to FC2 beta block
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

//show/hide action_bar_FC
let actionBar = document.getElementById('action-bar');
let heightBefore = document.getElementById('main-info').getBoundingClientRect().top + window.pageYOffset;
let heightAfter = document.getElementById('beta-testing-block').getBoundingClientRect().top + window.pageYOffset;
console.log(heightBefore, heightAfter);

window.onscroll = function () {
    if (window.pageYOffset > heightBefore && window.pageYOffset < heightAfter) {
        actionBar.classList.replace('hide-bar', 'show-bar');
    } else if (window.pageYOffset < heightBefore) {
        actionBar.classList.replace('show-bar', 'hide-bar');
    } else if (window.pageYOffset > heightAfter) {
        actionBar.classList.replace('show-bar', 'hide-bar');
    }
};