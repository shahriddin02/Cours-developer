let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";
let course = JSON.parse(localStorage.getItem("courseEdit"));



let nameInput = document.querySelector(".name");
let descriptionInput = document.querySelector(".description");
let logoInput = document.querySelector(".logoInput");
let moduleInput = document.querySelector(".module");
let lessonsInput = document.querySelector(".lessons");
let mentorNameInput = document.querySelector(".mentorName");
let mentorAvatarInput = document.querySelector(".mentorAvatar");
let categoryInput = document.querySelector(".category");
let statusInput = document.querySelector(".status");
let certificateInput = document.querySelector(".certificate");

let saveBtn = document.querySelector(".saveBtn");
let cancelBtn = document.querySelector(".cancelBtn");


nameInput.value = course.name || "";
descriptionInput.value = course.description || "";
logoInput.value = course.logo;
moduleInput.value = course.module;
lessonsInput.value = course.lessons
mentorNameInput.value = course.mentorName;
mentorAvatarInput.value = course.mentorAvatar;
categoryInput.value = course.category;
statusInput.checked = course.status ;
certificateInput.checked = course.certificate;


let learn = course.learn;

let learnItems = document.querySelector(".learnItems");
let learnText = document.querySelector(".learnText");
let addLearn = document.querySelector(".addLearn");

function solution() {

    learnItems.innerHTML = "";

    learn.forEach((item, index) => {

        let div = document.createElement("div");
        div.className = "learnItem";

        div.innerHTML = `
            <span>${item}</span>
            <button class="deleteBtn">❌</button>
        `;

        div.querySelector(".deleteBtn").onclick = () => {
            learn.splice(index, 1);
        solution();
        }

        learnItems.append(div);

    });

}

solution();



addLearn.onclick = () => {
    if (learnText.value.trim() == "") return;
    learn.push(learnText.value);
    learnText.value = "";
    solution();
}


saveBtn.onclick = async () => {

    let editCourse = {

        ...course,

        name: nameInput.value,
        description: descriptionInput.value,
        logo: logoInput.value,
        module: moduleInput.value,
        lessons: lessonsInput.value,
        mentorName: mentorNameInput.value,
        mentorAvatar: mentorAvatarInput.value,
        category: categoryInput.value,
        status: statusInput.checked,
        certificate: certificateInput.checked,
        learn: learn

    };
    await fetch(`${url}/${course.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editCourse)
    });


    alert("Курс успешно изменён!");
    localStorage.removeItem("courseEdit");
    window.location.href = "index.html";
}


cancelBtn.onclick = () => {
    window.location.href = "index.html";
}