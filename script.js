let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

let save = document.querySelector(".save");

save.onclick = async () => {

    let newCourse = {

        name: document.querySelector(".name").value,
        description: document.querySelector(".description").value,
        logo: document.querySelector(".logo").value,
        module: document.querySelector(".module").value,
        lessons: document.querySelector(".lessons").value,
        mentorName: document.querySelector(".mentorName").value,
        mentorAvatar: document.querySelector(".mentorAvatar").value,

        status: true,
        mentorNumberPhone: "",
        category: "",
        certificate: false

    };

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    });

    alert("Курс успешно добавлен!");

    window.location.href = "index.html";
};