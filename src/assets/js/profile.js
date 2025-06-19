document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    const avatarImg = document.getElementById("avatar");
    const avatarUpload = document.getElementById("avatar-upload");
    const usernameInput = document.getElementById("username");
    // Для email, если нужно отобразить
    // const emailInput = document.getElementById("email");

    if (!user) {
        alert("Вам нужно зарегистрироваться!");
        window.location.href = "index.html";
        return;
    }

    // Отобразить имя и email
    if (usernameInput) usernameInput.value = user.username || "";
    // if (emailInput) emailInput.value = user.email || "";

    // Отобразить аватарку, если есть
    if (user.avatar && avatarImg) {
        avatarImg.src = user.avatar;
    }

    // Смена аватарки
    if (avatarUpload && avatarImg) {
        avatarUpload.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImg.src = e.target.result;
                    user.avatar = e.target.result;
                    localStorage.setItem("user", JSON.stringify(user));
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Смена имени
    if (usernameInput) {
        usernameInput.addEventListener("input", function() {
            user.username = this.value;
            localStorage.setItem("user", JSON.stringify(user));
        });
    }

    // Если нужно добавить email для отображения и редактирования, раскомментировать выше
    renderLikedReviews();
    renderLikedArts();
    renderLikedFacts();

    // Автоматическое обновление при изменении localStorage (например, лайк в другой вкладке)
    window.addEventListener('storage', function(e) {
        if (e.key === 'likedReviews') renderLikedReviews();
        if (e.key === 'likedArts') renderLikedArts();
        if (e.key === 'likedFacts') renderLikedFacts();
    });
});

function renderLikedReviews() {
    const reviewList = document.getElementById("review-list");
    if (reviewList) {
        const liked = JSON.parse(localStorage.getItem("likedReviews") || "[]");
        reviewList.innerHTML = "";
        if (liked.length > 0) {
            liked.forEach(review => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${review.name}</strong>: ${review.comment}`;
                reviewList.appendChild(li);
            });
        } else {
            reviewList.innerHTML = '<li>Нет лайкнутых отзывов</li>';
        }
    }
}

function renderLikedArts() {
    const artGallery = document.querySelector('.art-gallery');
    if (artGallery) {
        const likedArts = JSON.parse(localStorage.getItem('likedArts') || '[]');
        artGallery.innerHTML = '';
        if (likedArts.length > 0) {
            likedArts.forEach(art => {
                const img = document.createElement('img');
                img.src = art.src;
                img.alt = 'Мой арт';
                artGallery.appendChild(img);
            });
        } else {
            artGallery.innerHTML = '<p>Нет лайкнутых артов</p>';
        }
    }
}

function renderLikedFacts() {
    const factList = document.getElementById("fact-list");
    if (factList) {
        const liked = JSON.parse(localStorage.getItem("likedFacts") || "[]");
        factList.innerHTML = "";
        if (liked.length > 0) {
            liked.forEach(fact => {
                const li = document.createElement("li");
                li.textContent = fact.text;
                factList.appendChild(li);
            });
        } else {
            factList.innerHTML = '<li>Нет лайкнутых фактов</li>';
        }
    }
} 
