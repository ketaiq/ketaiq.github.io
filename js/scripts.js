document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith('publications.html')) {
        fetch_publications();
    }
});

function fetch_publications() {
    fetch('resources/publications.json')
        .then(response => response.json())
        .then(publications => {
            const publicationsList = document.getElementById('publications-list');
            publications.forEach(pub => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = pub.link;
                link.textContent = pub.title;
                link.target = "_blank";
                link.classList.add("custom-link");
                listItem.appendChild(link);
                const description = document.createElement('p');
                description.textContent = pub.description;
                listItem.appendChild(description);
                publicationsList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching publications:', error);
        });
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