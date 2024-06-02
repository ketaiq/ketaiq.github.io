function openPDF(url) {
    window.open(url, '_blank');
}

function adjustMainContentMargin() {
    var navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight;
    document.getElementsByTagName('main')[0].style.marginTop = (navbarHeight + 50) + 'px';
}

// Adjust margin on page load
window.addEventListener('load', adjustMainContentMargin);

// Adjust margin on window resize
window.addEventListener('resize', adjustMainContentMargin);

// Adjust margin if navbar height changes dynamically
var observer = new MutationObserver(adjustMainContentMargin);
observer.observe(document.getElementsByClassName('navbar')[0], { attributes: true, childList: true, subtree: true });