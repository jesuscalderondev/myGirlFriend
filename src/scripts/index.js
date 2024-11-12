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
    monthObj.setAttribute("class", "calendar bg-transluce bg-transluce-primary hidden");
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

buildCalendar(0, { "29": "" })

buildCalendar(1, { "25": "" });

buildCalendar(3, {"14" : "", "21" : "", "28" : ""})

buildCalendar(9, {"6" : ""})

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