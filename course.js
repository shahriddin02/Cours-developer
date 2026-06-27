let allCards = document.querySelector(".allCards")

let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses"

async function get() {
    let response = await fetch(url)
    let data = await response.json()

    data.forEach((card) => {
        let cardDiv = document.createElement("div")
        cardDiv.className = "cardDiv"
        cardDiv.innerHTML = `
        <img class="imgLogo" src="${card.logo}" alt="">
                <div class="mainRight"> 
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
                            <p>🏗</p>
                        </a>
                    </div>

        `
        allCards.append(cardDiv)
    });
}
get()