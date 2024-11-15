const navItems = document.querySelectorAll(".nav-link");
let locationPrincipal = window.pageYOffset;
let nav = document.querySelector("nav");
const btnClose = document.querySelector(".navbar-toggler");

window.addEventListener("scroll", () => {
    let locationNow = window.pageYOffset;

    if (locationPrincipal >= locationNow) {
        nav.style.top = "0px";
    } else {

        nav.style.top = "-100px";
    }

    if (locationPrincipal >= 80) {
        nav.setAttribute("class", "navbar navbar-expand-lg bg-transluce bg-transluce-white");
    }
    else {
        nav.setAttribute("class", "navbar navbar-expand-lg bg-transluce bg-transluce-primary");
    }

    locationPrincipal = locationNow;
})

const width = window.innerWidth;
console.log(width);


if (width < 800) {
    document.querySelectorAll("iframe").forEach(element => {
        element.style.height = "152px";
    })
}

navItems.forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        item.setAttribute("class", "nav-link active");

        if (width < 800) {
            btnClose.click();
        }
    })

});

const calendars = document.querySelector(".calendars");

const myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {
    keyboard: false
});

document.addEventListener("keydown", (key) => {
    if (key.key === "Escape") {
        myModal.hide();
    }
})

function buildCalendar(month, specialDays = {}, year=2024) {

    const w31 = [0, 2, 4, 6, 7, 9, 11];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const daysWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const w30 = [3, 5, 8, 10];

    const monthObj = document.createElement("div");
    monthObj.setAttribute("class", "calendar bg-transluce bg-transluce-rose hidden");
    calendars.appendChild(monthObj);
    const title = document.createElement("h1");
    title.textContent = `${months[month]}`;
    monthObj.appendChild(title);

    const listCalendar = document.createElement("ol");

    for (let index = 0; index < 7; index++) {
        const dayLetter = document.createElement("li");
        dayLetter.textContent = daysWeek[index].substring(0, 3)
        dayLetter.classList.add("day-head");
        listCalendar.appendChild(dayLetter);
    }

    const dayNow = new Date(year, month, 1).getDay();

    monthObj.appendChild(listCalendar);

    const firstDay = document.createElement("li");
    firstDay.setAttribute("class", "dayMonth");
    firstDay.textContent = "1";
    firstDay.style = `grid-column-start: ${dayNow + 1}`;

    listCalendar.appendChild(firstDay);

    let limit = 0;

    if (w31.includes(month)) {
        limit = 31;
    }
    if (w30.includes(month)) {
        limit = 30;
    }
    else {
        limit = 29;
    }

    for (let index = 1; index < limit; index++) {
        const newDay = document.createElement("li");
        newDay.setAttribute("class", "dayMonth");
        newDay.textContent = index + 1;

        if (Object.keys(specialDays).includes((index + 1).toString())) {
            newDay.classList.add("special");
            newDay.addEventListener("click", () => {
                document.getElementById('exampleModalToggle').querySelector("#dateDescription").textContent = specialDays[(index + 1).toString()];
                myModal.show()
            })
        }
        listCalendar.appendChild(newDay);
    }
}

buildCalendar(0, { "29": "Recuerdo el primer mensaje, ese día estaba decidido a escribirle porque tus ojos me tenían encantado, desde antes de entablar las primeras conversaciones, la había visto un par de veces, como 3 o 4 tal vez. siempre tenía una cara muy seria y pensaba que me gustaba mucho ese carácter fuerte, que me gustaba esa mirada fría que tenía, casi siempre dando la impresión de ser muy malgeniada, quién pensaría que detrás de esa mirada escondía tantas cosas." })

buildCalendar(1, { "25": "Este día nos dimos nuestro primer beso, recuerdo que estaba muy nervioso, cuando me acerqué a besarla, pero tenía los ojos tan brillantes, que simplemente no podía dejar de mirarla antes de acerlo, me acerqué y sólo pasó, sin duda alguna uno de nuestros mis momentos favoritos." });

buildCalendar(3,
    {
        "14" : "Comenzamos a vernos más seguido y con planes más tranquilos.",
        "21" : "Las veces que nos veíamos comenzabamos a hablar, estar sentados y no hacer más nada que reirnos.",
        "28" : "Aunque no eramos nada, pasabamos un poco más de tiempo, algo más de tiempo de calidad y ratos muy tranquilos."})

buildCalendar(9, {"6" : "Fue el primero de mis cumpleaños que pasaba con ella, casi nunca me gusta estar rodeado de personas, pero ella, ella ha sido la excepción en muchas cosas y eso lo amerita, realmente la extraño cuando no está y quisiera que de ahora en adelante, pasaramos mucho tiempo juntos."})

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showElem');
        }
        else {
            entry.target.classList.remove('showElem');
        }
    });
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

var musicPlay = null;

const musics = {
    "propuesta" : new Audio("./src/music/propuesta.m4a"),
    "cuidas" : new Audio("./src/music/cuidas.m4a")
}
const secctionsMusic = document.querySelectorAll('.music');

const listened = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            if(musicPlay != null){
                musicPlay.pause();
            }
            
            musicPlay = musics[entry.target.id];
            musicPlay.play();
            console.log("Play");
            
        }
    })
})

secctionsMusic.forEach((el) => listened.observe(el));