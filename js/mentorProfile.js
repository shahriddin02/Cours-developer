const API_URL = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Mentors";

const form = document.getElementById("mentorForm");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const backBtn = document.getElementById("backBtn");
const formMsg = document.getElementById("formMsg");

const photoUrlInput = document.getElementById("photoUrl");
const photoPreview = document.getElementById("photoPreview");
const photoPlaceholder = document.getElementById("photoPlaceholder");
const photoRemove = document.getElementById("photoRemove");

// --- Photo preview logic ---
function updatePhotoPreview() {
  const url = photoUrlInput.value.trim();
  if (url) {
    photoPreview.src = url;
    photoPreview.hidden = false;
    photoPlaceholder.hidden = true;
    photoRemove.hidden = false;
  } else {
    photoPreview.src = "";
    photoPreview.hidden = true;
    photoPlaceholder.hidden = false;
    photoRemove.hidden = true;
  }
}

photoUrlInput.addEventListener("input", updatePhotoPreview);

photoPreview.addEventListener("error", () => {
  // if the URL is broken, fall back to placeholder text
  photoPreview.hidden = true;
  photoPlaceholder.hidden = false;
  photoPlaceholder.textContent = "Не удалось загрузить фото";
});

photoPreview.addEventListener("load", () => {
  photoPlaceholder.textContent = "Нет фото";
});

photoRemove.addEventListener("click", () => {
  photoUrlInput.value = "";
  updatePhotoPreview();
});

// --- Message helper ---
function showMsg(text, type) {
  formMsg.textContent = text;
  formMsg.className = "form-msg " + (type || "");
}

// --- Collect form data into one object ---
function collectFormData() {
  const data = new FormData(form);

  return {
    name: data.get("name").trim(),
    surname: data.get("surname").trim(),
    birthDate: data.get("birthDate"),
    gender: data.get("gender"),
    country: data.get("country"),
    email: data.get("email").trim(),
    phone: data.get("phone").trim(),
    position: data.get("position").trim(),
    description: data.get("description").trim(),
    photo: photoUrlInput.value.trim(),
    skills: [
      data.get("skill1").trim(),
      data.get("skill2").trim(),
      data.get("skill3").trim(),
      data.get("skill4").trim()
    ].filter(Boolean)
  };
}

// --- Reset form (Отменить) ---
function resetForm() {
  form.reset();
  updatePhotoPreview();
  showMsg("", "");
}

cancelBtn.addEventListener("click", resetForm);

backBtn.addEventListener("click", () => {
  history.back();
});

// --- Submit (Сохранить) ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mentor = collectFormData();

  if (!mentor.name || !mentor.surname) {
    showMsg("Заполните имя и фамилию", "error");
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = "Сохранение...";
  showMsg("", "");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mentor)
    });

    if (!res.ok) throw new Error("Ошибка сервера: " + res.status);

    await res.json();

    showMsg("Ментор успешно добавлен", "success");
    resetForm();
  } catch (err) {
    console.error(err);
    showMsg("Не удалось сохранить. Попробуйте снова.", "error");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Сохранить";
  }
});

// initial state
updatePhotoPreview();
