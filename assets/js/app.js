/*======================================================

HQSL.TV
Main JavaScript

======================================================*/

document.addEventListener("DOMContentLoaded",()=>{

initializeSearch();

initializeAnimations();

initializeNavigation();

});

/*======================================================
                    SEARCH
======================================================*/

function initializeSearch(){

const input=document.getElementById("searchInput");

const cards=document.querySelectorAll(".clip-card");

if(!input) return;

input.addEventListener("input",()=>{

const value=input.value.toLowerCase();

cards.forEach(card=>{

const title=card.innerText.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

/*======================================================
                SCROLL ANIMATION
======================================================*/

function initializeAnimations(){

const elements=document.querySelectorAll(".fade-up");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

elements.forEach(element=>{

observer.observe(element);

});

}

/*======================================================
                    NAVBAR
======================================================*/

function initializeNavigation(){

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>20){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

}

/*======================================================
                SMOOTH LINKS
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*======================================================
                SCROLL TO TOP
======================================================*/

window.onbeforeunload=function(){

window.scrollTo(0,0);

};

/*======================================================

End Part 1

======================================================*/

/*======================================================
                LOAD CLIPS
======================================================*/

async function loadClips(){

    const container=document.getElementById("clipsContainer");

    if(!container) return;

    try{

        const response=await fetch("clips/clips.json");

        const clips=await response.json();

        container.innerHTML="";

        clips.forEach((clip,index)=>{

            container.innerHTML+=`

            <a class="clip-card fade-up"
               href="watch.html?id=${index}">

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

    }

    catch(error){

        console.error("Unable to load clips.",error);

    }

}

loadClips();
