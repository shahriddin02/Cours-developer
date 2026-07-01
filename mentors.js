let all_Cards = document.querySelector(".all_Cards");
let hero = document.querySelector(".hero_Okna");
let mentorWindow = document.querySelector(".mentorWindow");
let overlay = document.querySelector(".overlay");

let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Mentors";

// function getInitials(name = "", surname = "") {
//     return `${name[0] || ""}${surname[0] || ""}`.toUpperCase();
// }

function avatarHTML(avatarUrl, initials, size = "small") {
    let cls = size === "big" ? "imgLogo big" : "imgLogo";
    if (avatarUrl) {
        return `<img class="${cls}" src="${avatarUrl}"
                     onerror="this.outerHTML = '<div class=\\'${cls} avatarInitials\\'>${initials}</div>'">`;
    }
    return `<div class="${cls} avatarInitials">${initials}</div>`;
}

async function get() {
    let response = await fetch(url);
    let data = await response.json();

    data.forEach((card) => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "cardDiv";

        let initials = getInitials(card.name, card.surname);
        let isBlocked = card.Status === false;

        cardDiv.innerHTML = `
            ${avatarHTML(card.avatar, initials)}

            <div class="cardInfo">
                <h3>${card.name} ${card.surname}</h3>
                <p class="position">${card.Position || "Backend"}</p>
                <p class="contact">✉ ${card.email}</p>
            </div>

            ${isBlocked ? `<span class="lockIcon">🔒</span>` : ""}
            <div class="arrow">➜</div>
        `;

        cardDiv.onclick = () => {
            hero.style.display = "flex";
            infoUser(card);
        };

        all_Cards.append(cardDiv);
    });
}

get();

function infoUser(info) {
    let initials = getInitials(info.name, info.surname);
    let isBlocked = info.Status === false;

    let skills = [info["Skil-1"], info["Skil-2"], info["Skil-3"], info["Skil-4"]]
        .filter(Boolean)
        .map((s) => `<div class="skill">${s}</div>`)
        .join("");

    mentorWindow.innerHTML = `
        <div class="windowHeader">
            <p class="close">✕</p>
            <h2>Ментор</h2>
        </div>

        <div class="topInfo">
            ${avatarHTML(info.avatar, initials, "big")}
            <h2>${info.name} ${info.surname}</h2>
            <p class="position">${info.Position || "Backend"}</p>
        </div>

        <div class="info">
            <p><b>Телефон:</b> ${info.phoneNumber}</p>
            <p><b>E-mail:</b> ${info.email}</p>
            <p><b>Дата рождения:</b> ${info.birthday}</p>
            <p><b>Пол:</b> ${info.gender}</p>
        </div>

        <button class="editBtn">✏ Изменить</button>

        <div class="skills">
            <h3>Навыки</h3>
            <div class="course-details">${skills}</div>
            <p style="margin-top:15px; color:#374151; line-height:1.5;">
                ${info.description}
            </p>
        </div>

        <div class="blockRow">
            <div>
                <b>Заблокировать аккаунт</b>
                <p style="color:#6B7280; font-size:13px;">Полностью блокирует действия ментора</p>
            </div>
            <label class="switch">
                <input type="checkbox" class="blockToggle" ${isBlocked ? "checked" : ""}>
                <span class="slider"></span>
            </label>
        </div>

        <div class="course">
            <h3>Курсы</h3>
            <p><b>${info.activeCourseName}</b></p>
            <p>📦 Модули: ${info.activeCourseModule}</p>
            <p>📖 Уроки: ${info.activeCourseLesson}</p>
            <p>⭐ Рейтинг: ${info.activeCourseAverageReview}</p>
        </div>
    `;

    mentorWindow.querySelector(".close").onclick = () => {
        hero.style.display = "none";
    };

   

    overlay.onclick = () => {
        hero.style.display = "none";
    };
}