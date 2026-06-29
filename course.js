let allCards = document.querySelector(".allCards")

let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses"

let close = document.querySelector(".close")
let modal = document.querySelector(".modelOkna")


async function get() {
    let response = await fetch(url)
    let data = await response.json()

    data.forEach((card) => {
        let cardDiv = document.createElement("div")
        cardDiv.className = "cardDiv"
        cardDiv.innerHTML = `
        <img class="imgLogo" src="${card.logo}" alt="">
                <div class=""cardDiv> 
                    <h1>${card.name}</h1>
                    <div class="modul">
                        <p>🧾Модули: ${card.module}</p>
                        <hr>
                        <p>⚡Уроки: ${card.lessons}</p>
                    </div>
                    <div class="Journal">
                        <a class="hrefMenu" href="">
                            <p>🧾Журнал</p>
                        </a>
                        <a class="hrefMenu" href="">
                            <p>🖌</p>
                        </a>
                    </div>
                    </div>

        `
        cardDiv.onclick = () => {
            modal.style.display = "flex";
            infoUser(card)
        };
        allCards.append(cardDiv)
    });
}
get()

function infoUser(info) {
    modal.innerHTML = ""
    let modelOknoLeft = document.createElement("div")
    modelOknoLeft.className = "modelOknoLeft"

    let div = document.createElement("div");
    div.className = "course-card";

    div.innerHTML = ` 

    <div class="course-header">
                <p class="close">X</p>
                <span class="title">Курс</span>
            </div>

            <div class="course-body">
                <div class="course-info">
                    <h2>${info.name}</h2>

                    <div class="course-details">
                        <span>📄 Модули: ${info.module}</span>
                        <span>📋 Уроки: ${info.lessons}</span>
                    </div>

                    <div class="actions">
                        <button class="edit-btn">✏ Изменить</button>

                        <button class="eye-true">${info.status ? '👁' : '🚫'}</button>

                        <span class="level">Basic</span>
                    </div>
                </div>

                <div class="course-image">
                    <img src="${info.logo}" alt="C++" />
                </div>
            </div>

            <div class="journal">
                <div class="journal-icon">📋</div>
                <div>
                    <h3>Журнал</h3>
                </div>
            </div>

            <div class="menu">

    <div class="menu-item">
        <span>Чему вы научитесь?</span>
        <span class="arrow">›</span>
    </div>

    <div class="menu-item">
        <span>Программа курса</span>
        <span class="arrow">›</span>
    </div>

    <div class="menu-item">
        <span>Подписки</span>
        <span class="arrow">›</span>
    </div>

    <div class="menu-item reviews">
        <span>Отзывы (8)</span>

        <div class="reviews-right">
            <span class="stars">★★★★☆</span>
            <span class="rating">3.5</span>
            <span class="arrow">›</span>
        </div>
    </div>

</div>

<div class="teachers">

    <div class="teachers-header">
        <h3>Преподаватели</h3>
        <button>+ Добавить</button>
    </div>

    <div class="teacher-card">

        <div class="teacher-left">
            <img src="${info.mentorAvatar}" alt="">
            <div>
                <h4>${info.mentorName}</h4>
                <p>${info.mentorNumberPhone}</p>
            </div>
        </div>

        <span class="arrow">›</span>

    </div>

</div>
`

    let close = div.querySelector('.close');
    close.onclick = () => {
        modal.style.display = "none";
    }
    modal.appendChild(div)
}