window.addEventListener('DOMContentLoaded', function() {
    loadContentFromURL();

    // Add an event listener for the hashchange event
    window.addEventListener('hashchange', loadContentFromURL);
});

function loadContentFromURL() {
    var urlFragment = window.location.hash.substr(1);
    if (urlFragment) {
        loadContent(urlFragment + '.html', document.querySelector('.sidebar a[href="#' + urlFragment + '"]'));
    } else {
        loadContent('about-me.html', document.querySelector('.sidebar ul li:first-child a'));
    }
}

function toggleSubmenu(event) {
    event.preventDefault();
    var submenu = event.target.nextElementSibling;
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
}

function loadContent(url, clickedElement) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mainContent").innerHTML = this.responseText;
            var sidebarItems = document.querySelectorAll('.sidebar ul li');
            sidebarItems.forEach(function(item) {
                item.classList.remove('active');
            });
            if (clickedElement) {
                clickedElement.parentElement.classList.add('active');
            }
            MathJax.typeset();
            document.getElementById("mainContent").scrollTop = 0;
            MathJax.startup.promise.then(() => {
               MathJax.texReset();
            });
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
