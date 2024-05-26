document.addEventListener("DOMContentLoaded", () => {
    const publications = [
        {
            title: "Publication Title 1",
            link: "https://example.com/publication1",
            description: "Description of the first publication."
        },
        {
            title: "Publication Title 2",
            link: "https://example.com/publication2",
            description: "Description of the second publication."
        }
        // Add more publications as needed
    ];

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


    // Get all navbar links
    var navLinks = document.querySelectorAll('.nav-link');

    // Add click event listeners to each navbar link
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function() {
            // Remove active class from all navbar links
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            });

            // Add active class to the clicked navbar link
            this.classList.add('active');
            this.setAttribute('aria-current', 'page');
        });
    });

    // Highlight nav-link based on scroll position
    window.addEventListener('scroll', function() {
        var scrollPos = window.scrollY;
        navLinks.forEach(function(navLink) {
            var sectionId = navLink.getAttribute('href').slice(1);
            var section = document.getElementById(sectionId);
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                // Remove active class from all navbar links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                // Add active class to the navbar link corresponding to the section in view
                navLink.classList.add('active');
                this.setAttribute('aria-current', 'page');
            }
        });
    });
});



