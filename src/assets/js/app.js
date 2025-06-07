//= components/test.js
document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("register-form");
    const loginBtn = document.getElementById("login-btn");

    // 📌 Проверяем, зарегистрирован ли пользователь
    function checkUser() {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            document.querySelector(".register-card").innerHTML = `
                <h2>Привет, ${userData.username}!</h2>
                <p>Вы уже вошли в систему.</p>
                <button id="logout-btn">Выйти</button>
            `;

            // Добавляем обработчик выхода
            document.getElementById("logout-btn").addEventListener("click", function() {
                localStorage.removeItem("user");
                location.reload();
            });
        }
    }

    // 📌 Регистрация нового пользователя
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !email || !password) {
            alert("Заполните все поля!");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ username, email, password }));
        alert(`Регистрация успешна! Добро пожаловать, ${username}.`);
        location.reload();
    });

    // 📌 Вход в аккаунт
    loginBtn.addEventListener("click", function() {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
            window.location.href = "personal.html";
        } else {
            alert("Нет сохранённого аккаунта. Зарегистрируйтесь!");
        }
    });

    // 📌 Проверяем состояние входа
    checkUser();
});


/* document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Вы поставили лайк!");
        });
    });

    document.querySelectorAll(".dislike-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Вы поставили дизлайк!");
        });
    });

    document.querySelectorAll(".report-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Ваш отзыв на модерации.");
        });
    });
}); */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".review-form");
    const reviewList = document.querySelector(".review-list");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const comment = document.getElementById("comment").value;

        if (name.trim() === "" || comment.trim() === "") {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        // Создание нового элемента отзыва
        const newReview = document.createElement("div");
        newReview.classList.add("review");
        newReview.innerHTML = `
            <h3>${name}</h3>
            <p>${comment}</p>
            <div class="review-actions">
                <button class="like-btn">👍</button>
                <button class="dislike-btn">👎</button>
                <button class="report-btn">🚨</button>
            </div>
        `;

        // Добавление отзыва в список
        reviewList.appendChild(newReview);

        // Очистка формы после отправки
        form.reset();
    });

    // Лайки, дизлайки и жалобы для динамических отзывов
    reviewList.addEventListener("click", function (event) {
        if (event.target.classList.contains("like-btn")) {
            alert("Вы поставили лайк!");
        } else if (event.target.classList.contains("dislike-btn")) {
            alert("Вы поставили дизлайк!");
        } else if (event.target.classList.contains("report-btn")) {
            alert("Хуйня переделывай.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.querySelector(".gallery");
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.querySelector(".upload-form");

    // Закрытие окна просмотра
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // 📌 Вместо привязки к каждому изображению — вешаем обработчик на `.gallery`
    gallery.addEventListener("click", function(event) {
        if (event.target.classList.contains("preview")) {
            modal.style.display = "flex";
            modalImg.src = event.target.src;
        }

        if (event.target.classList.contains("like-btn")) {
            alert("Вы поставили лайк!");
        }
    });

    // 📌 Исправление двойной загрузки арта
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("upload-file");

        if (fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const newArt = document.createElement("div");
            newArt.classList.add("art");
            newArt.innerHTML = `
                <img src="${e.target.result}" alt="Ваш арт" class="preview">
                <div class="art-actions">
                    <button class="like-btn">👍</button>
                    
                </div>
            `;

            gallery.appendChild(newArt);
        };

        reader.readAsDataURL(fileInput.files[0]);
        fileInput.value = "";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close-btn");
    const closeModalBtn = document.querySelector(".close-modal");

    // 📌 Открытие арта
    document.querySelector(".gallery").addEventListener("click", function(event) {
        if (event.target.classList.contains("preview")) {
            modal.style.display = "flex";
            modalImg.src = event.target.src;
        }
    });

    // 📌 Закрытие окна по `×`
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // 📌 Закрытие окна по кнопке "Закрыть"
    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // 📌 Также закрываем модальное окно при клике ВНЕ изображения
    modal.addEventListener("click", function(event) {
        if (!event.target.closest(".modal-content-wrapper")) {
            modal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const theoryList = document.querySelector(".theory-list");
    const form = document.querySelector(".theory-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const imageInput = document.getElementById("image");

        if (!title.trim() || !content.trim()) {
            alert("Заполните все поля!");
            return;
        }

        const newTheory = document.createElement("div");
        newTheory.classList.add("theory");
        newTheory.innerHTML = `<h3>${title}</h3>`;

        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newTheory.innerHTML += `<img src="${e.target.result}" alt="${title}">`;
            };
            reader.readAsDataURL(imageInput.files[0]);
        }

        newTheory.innerHTML += `<p>${content}</p>`;
        theoryList.appendChild(newTheory);

        form.reset();
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const factsList = document.querySelector(".facts-list");
    const form = document.querySelector(".fact-form");
    const factTextInput = document.getElementById("fact-text");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // 📌 Получаем текст без `.trim()`, а через `length`
        const factText = factTextInput.value;

        if (factText.length === 0) { // Проверка на пустоту
            alert("Введите текст факта!");
            return;
        }

        // 📌 Создаем новый факт
        const newFact = document.createElement("div");
        newFact.classList.add("fact");
        newFact.innerHTML = `
            <p>${factText}</p>
            <button class="like-btn">👍</button>
        `;

        factsList.appendChild(newFact);

        // 📌 Очистка поля после успешного добавления
        factTextInput.value = "";
    });

    // 📌 Лайки для фактов
    factsList.addEventListener("click", function(event) {
        if (event.target.classList.contains("like-btn")) {
            alert("Вы поставили лайк!");
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("click", function() {
        const userData = localStorage.getItem("user");

        if (userData) {
            window.location.href = "personal.html";
        } else {
            alert("Сначала зарегистрируйтесь!");
        }
    });
});
/* document.addEventListener("DOMContentLoaded", function () {
    const avatarUpload = document.getElementById("avatar-upload");
    const avatarImg = document.getElementById("avatar");
    const usernameInput = document.getElementById("username");

    // 📌 Загружаем сохранённые данные
    const savedAvatar = localStorage.getItem("avatar");
    const savedName = localStorage.getItem("username");

    if (savedAvatar) avatarImg.src = savedAvatar;
    if (savedName) usernameInput.value = savedName;

    // 📌 Обновление аватарки
    avatarUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarImg.src = e.target.result;
                localStorage.setItem("avatar", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // 📌 Сохранение имени пользователя
    usernameInput.addEventListener("input", function () {
        localStorage.setItem("username", this.value);
    });

    // 📌 Динамическое отображение теорий, артов и отзывов
    const theoryList = document.getElementById("theory-list");
    const artGallery = document.querySelector(".art-gallery");
    const reviewList = document.getElementById("review-list");

    const userData = JSON.parse(localStorage.getItem("userContent")) || { theories: [], arts: [], reviews: [] };

    userData.theories.forEach(theory => {
        const li = document.createElement("li");
        li.textContent = theory;
        theoryList.appendChild(li);
    });

    userData.arts.forEach(artSrc => {
        const img = document.createElement("img");
        img.src = artSrc;
        artGallery.appendChild(img);
    });

    userData.reviews.forEach(review => {
        const li = document.createElement("li");
        li.textContent = review;
        reviewList.appendChild(li);
    });
}); */
document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    // 📌 Проверяем, зарегистрирован ли пользователь
    if (!userData) {
        const redirect = confirm("Вам нужно зарегистрироваться, чтобы зайти в личный кабинет! Нажмите 'ОК' для перехода на главную.");
        if (redirect) {
            window.location.href = "index.html"; // Возвращает на главную
        }
        return;
    }

    const avatarUpload = document.getElementById("avatar-upload");
    const avatarImg = document.getElementById("avatar");
    const usernameInput = document.getElementById("username");

    // 📌 Загружаем сохранённые данные
    const savedAvatar = localStorage.getItem("avatar");
    const savedName = localStorage.getItem("username");

    if (savedAvatar) avatarImg.src = savedAvatar;
    if (savedName) usernameInput.value = savedName;

    // 📌 Обновление аватарки
    avatarUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarImg.src = e.target.result;
                localStorage.setItem("avatar", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // 📌 Сохранение имени пользователя
    usernameInput.addEventListener("input", function () {
        localStorage.setItem("username", this.value);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.querySelector(".review-form");
    const reviewList = document.querySelector(".review-list");
    const factForm = document.querySelector(".fact-form");
    const factTextInput = document.getElementById("fact-text");
    const factsList = document.querySelector(".facts-list");
    const uploadForm = document.querySelector(".upload-form");
    const gallery = document.querySelector(".gallery");

    // 📌 Загружаем сохранённые отзывы
    const userReviews = JSON.parse(localStorage.getItem("userReviews")) || [];
    userReviews.forEach(review => addReviewToPage(review));

    // 📌 Загружаем сохранённые факты
    const userFacts = JSON.parse(localStorage.getItem("userFacts")) || [];
    userFacts.forEach(fact => addFactToPage(fact));

    // 📌 Загружаем сохранённые арты
    const userArts = JSON.parse(localStorage.getItem("userArts")) || [];
    userArts.forEach(artSrc => addArtToPage(artSrc));

    // 📌 Добавление нового отзыва
    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (!name || !comment) {
            alert("Заполните все поля!");
            return;
        }

        const newReview = { name, comment };
        userReviews.push(newReview);
        localStorage.setItem("userReviews", JSON.stringify(userReviews));
        addReviewToPage(newReview);
        reviewForm.reset();
    });

    // 📌 Добавление нового факта
    factForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const factText = factTextInput.value.trim();

        if (!factText) {
            alert("Введите текст факта!");
            return;
        }

        userFacts.push(factText);
        localStorage.setItem("userFacts", JSON.stringify(userFacts));
        addFactToPage(factText);
        factTextInput.value = "";
    });

    // 📌 Загрузка нового арта
    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("upload-file");

        if (fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            userArts.push(e.target.result);
            localStorage.setItem("userArts", JSON.stringify(userArts));
            addArtToPage(e.target.result);
        };

        reader.readAsDataURL(file);
        fileInput.value = "";
    });

    // 📌 Функция добавления отзыва
    function addReviewToPage(review) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `<h3>${review.name}</h3><p>${review.comment}</p>`;
        reviewList.appendChild(reviewElement);
    }

    // 📌 Функция добавления факта
    function addFactToPage(factText) {
        const factElement = document.createElement("div");
        factElement.classList.add("fact");
        factElement.innerHTML = `<p>${factText}</p>`;
        factsList.appendChild(factElement);
    }

    // 📌 Функция добавления арта
    function addArtToPage(artSrc) {
        const newArt = document.createElement("div");
        newArt.classList.add("art");
        newArt.innerHTML = `<img src="${artSrc}" alt="Загруженный арт" class="preview">`;
        gallery.appendChild(newArt);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
        setTimeout(() => {
            if (confirm("Вам нужно зарегистрироваться, чтобы зайти в личный кабинет!\nНажмите 'OK' для перехода на главную.")) {
                window.location.href = "index.html"; // ✅ Гарантированное перенаправление
            }
        }, 100);
        return;
    }

    const userReviews = JSON.parse(localStorage.getItem("userReviews")) || [];
    const reviewList = document.getElementById("review-list");
    userReviews.forEach(review => {
        const reviewItem = document.createElement("li");
        reviewItem.textContent = `${review.name}: ${review.comment}`;
        reviewList.appendChild(reviewItem);
    });

    const userFacts = JSON.parse(localStorage.getItem("userFacts")) || [];
    const factList = document.getElementById("fact-list");
    userFacts.forEach(fact => {
        const factItem = document.createElement("li");
        factItem.textContent = fact;
        factList.appendChild(factItem);
    });

    const userArts = JSON.parse(localStorage.getItem("userArts")) || [];
    const artGallery = document.querySelector(".art-gallery");
    userArts.forEach(artSrc => {
        const img = document.createElement("img");
        img.src = artSrc;
        img.alt = "Загруженный арт";
        artGallery.appendChild(img);
    });
});
