/*======================================================
                    HQSL.TV
                    app.js
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();
    initializeAnimations();
    initializeNavigation();
    loadClips();

});

/*======================================================
                    SEARCH
======================================================*/

function initializeSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", () => {

        const value = input.value.toLowerCase();

        document.querySelectorAll(".clip-card").forEach(card => {

            const title = card.innerText.toLowerCase();

            card.style.display =
                title.includes(value) ? "block" : "none";

        });

    });

}

/*======================================================
                SCROLL ANIMATION
======================================================*/

function initializeAnimations() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: .15
    });

    document.querySelectorAll(".fade-up").forEach(item => {

        observer.observe(item);

    });

}

/*======================================================
                    NAVBAR
======================================================*/

function initializeNavigation() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20)
            navbar.classList.add("scrolled");
        else
            navbar.classList.remove("scrolled");

    });

}

/*======================================================
                    LOAD CLIPS
======================================================*/

async function loadClips() {

    const container =
        document.getElementById("clipsContainer");

    if (!container) return;

    try {

        const response =
            await fetch("clips/clips.json");

        const clips =
            await response.json();

        container.innerHTML = "";

        clips.forEach(clip => {

            container.innerHTML += `

<a class="clip-card fade-up"
href="watch.html?id=${clip.id}">

<div class="thumbnail">

<img
src="${clip.thumbnail}"
alt="${clip.title}"
loading="lazy">

<span class="duration">

${clip.duration}

</span>

</div>

<div class="clip-info">

<h3>${clip.title}</h3>

<p>${clip.category}</p>

</div>

</a>

`;

        });

        initializeAnimations();

    }

    catch (err) {

        console.error(err);

    }

}
