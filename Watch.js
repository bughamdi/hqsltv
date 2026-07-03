/*======================================================
                    HQSL.TV
                    watch.js
======================================================*/

const params = new URLSearchParams(window.location.search);

const clipId = parseInt(params.get("id"));

async function loadClip() {

    try {

        const response =
            await fetch("clips/clips.json");

        const clips =
            await response.json();

        const clip =
            clips.find(item => item.id === clipId);

        if (!clip) {

            document.getElementById("clipTitle").textContent =
                "Clip Not Found";

            return;

        }

        document.title =
            clip.title + " | HQSL.TV";

        document.getElementById("clipTitle").textContent =
            clip.title;

        document.getElementById("clipCategory").textContent =
            clip.category;

        document.getElementById("clipDuration").textContent =
            clip.duration;

        document.getElementById("watchButton").href =
            clip.url;

        /*
        سيتم استبدال هذا لاحقاً
        بـ Twitch Embed الحقيقي
        */

        document.getElementById("clipFrame").src =
            "about:blank";

        loadRelated(clips);

    }

    catch (err) {

        console.error(err);

    }

}

function loadRelated(clips) {

    const container =
        document.getElementById("relatedClips");

    container.innerHTML = "";

    clips
        .filter(item => item.id !== clipId)
        .slice(0, 6)
        .forEach(item => {

            container.innerHTML += `

<a class="clip-card"
href="watch.html?id=${item.id}">

<div class="thumbnail">

<img
src="${item.thumbnail}"
alt="${item.title}"
loading="lazy">

<span class="duration">

${item.duration}

</span>

</div>

<div class="clip-info">

<h3>${item.title}</h3>

<p>${item.category}</p>

</div>

</a>

`;

        });

}

loadClip();
