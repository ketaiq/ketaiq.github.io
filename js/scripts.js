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
});



