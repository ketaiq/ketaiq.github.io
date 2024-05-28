const PAGES = ["index.html", "publications.html", "teaching.html", "services.html", "awards.html"]

document.addEventListener("DOMContentLoaded", () => {
    fetch_includes();
    if (window.location.pathname.endsWith('publications.html')) {
        fetch_publications();
    }
});

function fetch_includes() {
    fetch('includes/head.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('head').innerHTML = data;
        });

    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            highlightCurrentPage();
        });

    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

function highlightCurrentPage() {
    // Get the current page's filename (e.g., "publications.html")
    const currentPage = window.location.pathname.split('/').pop();
    if (!PAGES.includes(currentPage)) {
        // Skip external resources
        return;
    }
    
    // Get all the navigation links in the navbar
    const navLinks = document.querySelectorAll('.nav-link');

    // Loop through each link and check if it matches the current page
    navLinks.forEach(navLink => {
        if (navLink.href.endsWith(currentPage)) {
            navLink.classList.add("active");
            navLink.setAttribute('aria-current', 'page');
        }
    });
}

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