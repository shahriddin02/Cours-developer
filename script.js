// let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

// let form = document.querySelector(".course_form");

// save.onclick = async () => {

//     let newCourse = {
//         name: document.querySelector(".name").value,
//         description: document.querySelector(".description").value,
//         logo: document.querySelector(".logo").value,
//         module: document.querySelector(".module").value,
//         lessons: document.querySelector(".lessons").value,
//         mentorName: document.querySelector(".mentorName").value,
//         mentorAvatar: document.querySelector(".mentorAvatar").value,

//         category: document.querySelector(".category").value,
//         certificate: document.querySelector(".certificate").checked,
//         status: document.querySelector(".status").checked,
//     };

//     let res = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newCourse)
//     });

//     alert("Курс успешно добавлен!");

//     window.location.href = "index.html";
// };

let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

let form = document.getElementById("courseForm");
let cancelBtn = document.getElementById("cancelBtn");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let newCourse = {
        name: document.querySelector(".name").value.trim(),
        description: document.querySelector(".description").value.trim(),
        logo: document.querySelector(".courseLogo").value.trim(),
        module: document.querySelector(".module").value.trim(),
        lessons: document.querySelector(".lessons").value.trim(),
        mentorName: document.querySelector(".mentorName").value.trim(),
        mentorAvatar: document.querySelector(".mentorAvatar").value.trim(),
        mentorNumberPhone: document.querySelector(".mentorNumberPhone").value.trim(),
        category: document.querySelector(".category").value,
        certificate: document.querySelector(".certificate").checked,
        status: document.querySelector(".status").checked
    };

    if (newCourse.name === "") {
        alert("Введите название курса");
        return;
    }

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCourse)
        });

        if (!res.ok) {
            alert("Ошибка сервера: " + res.status);
            return;
        }

        await res.json();

        alert("Курс успешно добавлен!");

        window.location.href = "./pages/course.html";

    } catch (err) {
        alert("Не удалось сохранить: " + err.message);
    }
});

cancelBtn.addEventListener("click", function () {
    form.reset();
});