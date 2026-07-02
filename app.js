const clips = [
  { title:"Funny Moment", url:"https://www.twitch.tv/hqsl__/clip/ZanyConcernedBeanPraiseIt-emTrWfZny57D1_PD" },
  { title:"Epic Reaction", url:"https://www.twitch.tv/hqsl__/clip/FrozenAmazonianYamTheRinger-xnxosX5_JfzHtuGs" },
  { title:"Best Play", url:"https://www.twitch.tv/hqsl__/clip/ToughTriangularPicklesTBCheesePull-InuVObTwwwKWOBBv" },
  { title:"Highlight #4", url:"https://www.twitch.tv/hqsl__/clip/CulturedFaintGoosePeteZarollTie-5gPWVrUX9gXiCSSk" },
  { title:"Highlight #5", url:"https://www.twitch.tv/hqsl__/clip/HeartlessMoistHawkHassaanChop-pcEfOODYUw9LGSQB" },
  { title:"Highlight #6", url:"https://www.twitch.tv/hqsl__/clip/JazzyHumbleLardNotLikeThis-e9tPFcd5Op32iJ6D" },
  { title:"Highlight #7", url:"https://www.twitch.tv/hqsl__/clip/EagerJazzyKleeDAESuppy--wjK_lvGQNeGZaav" },
  { title:"Highlight #8", url:"https://www.twitch.tv/hqsl__/clip/KitschyPlausibleFiddleheadsTebowing-1xsxBBDH6BRkGqrh" }
];

const container = document.getElementById("videos");
const search = document.getElementById("search");

function render(list){
  container.innerHTML = "";

  list.forEach(clip => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="thumb">🎬</div>
      <div class="info">
        <h3>${clip.title}</h3>
        <p>hqsl__ • Twitch Clip</p>
      </div>
    `;

    card.onclick = () => {
      window.location.href = `watch.html?clip=${encodeURIComponent(clip.url)}&title=${encodeURIComponent(clip.title)}`;
    };

    container.appendChild(card);
  });
}

search.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  render(clips.filter(c => c.title.toLowerCase().includes(value)));
});

render(clips);
