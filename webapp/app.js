// ================================
// EduVora Mini App
// app.js
// ================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 EduVora Mini App ishga tushdi");

    // Telegram WebApp
    const tg = window.Telegram?.WebApp;

    if (tg) {
        tg.ready();
        tg.expand();
    }

    // ================================
    // ELEMENTLAR
    // ================================

    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll("[data-page]");
    const searchInput = document.querySelector("#searchInput");

    // ================================
    // SAHIFA ALMASHTIRISH
    // ================================

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(pageId);

        if (target) {
            target.classList.add("active");
        }

        navItems.forEach(item => {
            item.classList.remove("active");

            if (item.dataset.page === pageId) {
                item.classList.add("active");
            }
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ================================
    // NAVIGATION
    // ================================

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.dataset.page;

            if (page) {
                showPage(page);
            }
        });
    });

    // ================================
    // QUICK ACTIONS
    // ================================

    document.querySelectorAll("[data-action]").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;

            if (action === "subjects") {
                showPage("subjectsPage");
            }

            if (action === "image") {
                showPage("imagePage");
            }

            if (action === "help") {
                showPage("helpPage");
            }

            if (action === "profile") {
                showPage("profilePage");
            }
        });
    });

    // ================================
    // FANLAR
    // ================================

    const subjects = [
        {
            id: "math",
            name: "Matematika",
            icon: "📐",
            description: "1–11-sinf matematika darsliklari"
        },
        {
            id: "uzbek",
            name: "Ona tili",
            icon: "📖",
            description: "1–11-sinf ona tili"
        },
        {
            id: "english",
            name: "Ingliz tili",
            icon: "🇬🇧",
            description: "Ingliz tili darsliklari"
        },
        {
            id: "physics",
            name: "Fizika",
            icon: "⚛️",
            description: "Fizika darsliklari"
        },
        {
            id: "chemistry",
            name: "Kimyo",
            icon: "🧪",
            description: "Kimyo darsliklari"
        },
        {
            id: "biology",
            name: "Biologiya",
            icon: "🧬",
            description: "Biologiya darsliklari"
        },
        {
            id: "history",
            name: "Tarix",
            icon: "🏛️",
            description: "O‘zbekiston va jahon tarixi"
        },
        {
            id: "informatics",
            name: "Informatika",
            icon: "💻",
            description: "Informatika va dasturlash"
        }
    ];

    // ================================
    // SINFLAR
    // ================================

    const grades = [];

    for (let i = 1; i <= 11; i++) {
        grades.push({
            id: i,
            name: `${i}-sinf`
        });
    }

    // ================================
    // SUBJECT CONTAINER
    // ================================

    const subjectContainer =
        document.querySelector("#subjectsContainer");

    if (subjectContainer) {
        subjectContainer.innerHTML = "";

        subjects.forEach(subject => {
            const card = document.createElement("div");

            card.className = "subject-card";
            card.dataset.subject = subject.name.toLowerCase();

            card.innerHTML = `
                <div class="subject-icon">
                    ${subject.icon}
                </div>

                <div class="subject-info">
                    <h3>${subject.name}</h3>
                    <p>${subject.description}</p>
                </div>

                <div class="subject-arrow">
                    ›
                </div>
            `;

            card.addEventListener("click", () => {
                openGrades(subject);
            });

            subjectContainer.appendChild(card);
        });
    }

    // ================================
    // GRADE PAGE
    // ================================

    function openGrades(subject) {
        const title = document.querySelector("#gradeTitle");
        const container = document.querySelector("#gradesContainer");

        if (title) {
            title.textContent = `${subject.name} — Sinflar`;
        }

        if (container) {
            container.innerHTML = "";

            grades.forEach(grade => {
                const card = document.createElement("button");

                card.className = "grade-card";

                card.innerHTML = `
                    <span class="grade-number">
                        ${grade.id}
                    </span>

                    <span>
                        ${grade.name}
                    </span>

                    <span class="grade-arrow">
                        ›
                    </span>
                `;

                card.addEventListener("click", () => {
                    openBooks(subject, grade.id);
                });

                container.appendChild(card);
            });
        }

        showPage("gradesPage");
    }

    // ================================
    // KITOBLAR
    // ================================

    function openBooks(subject, grade) {
        const title = document.querySelector("#booksTitle");
        const container = document.querySelector("#booksContainer");

        if (title) {
            title.textContent =
                `${grade}-sinf ${subject.name}`;
        }

        if (container) {
            container.innerHTML = "";

            // Hozircha demo ma'lumot.
            // Keyinchalik haqiqiy darslik cover URL'lari
            // backend/database orqali olinadi.

            const books = [
                {
                    title: `${grade}-sinf ${subject.name}`,
                    type: "Darslik"
                },
                {
                    title: `${grade}-sinf ${subject.name}`,
                    type: "Mashqlar to‘plami"
                },
                {
                    title: `${grade}-sinf ${subject.name}`,
                    type: "Qo‘shimcha material"
                }
            ];

            books.forEach(book => {
                const card = document.createElement("div");

                card.className = "book-card";

                card.innerHTML = `
                    <div class="book-cover placeholder-cover">
                        <span>📚</span>
                    </div>

                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p>${book.type}</p>

                        <button class="primary-btn">
                            📖 Ochish
                        </button>
                    </div>
                `;

                container.appendChild(card);
            });
        }

        showPage("booksPage");
    }

    // ================================
    // SEARCH
    // ================================

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query =
                searchInput.value.trim().toLowerCase();

            const cards =
                document.querySelectorAll(".subject-card");

            cards.forEach(card => {
                const text =
                    card.textContent.toLowerCase();

                if (!query || text.includes(query)) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // ================================
    // ORQAGA QAYTISH
    // ================================

    document.querySelectorAll("[data-back]").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.dataset.back;

            if (page) {
                showPage(page);
            }
        });
    });

    // ================================
    // RASM YUKLASH
    // ================================

    const imageInput =
        document.querySelector("#imageInput");

    const imagePreview =
        document.querySelector("#imagePreview");

    const solveButton =
        document.querySelector("#solveImage");

    if (imageInput) {
        imageInput.addEventListener("change", () => {
            const file = imageInput.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                showToast("Faqat rasm yuklang.");
                return;
            }

            const reader = new FileReader();

            reader.onload = event => {
                if (imagePreview) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = "block";
                }
            };

            reader.readAsDataURL(file);

            if (solveButton) {
                solveButton.style.display = "block";
            }
        });
    }

    // ================================
    // RASMNI YECHISH
    // ================================

    if (solveButton) {
        solveButton.addEventListener("click", () => {

            /*
             * Hozircha demo.
             *
             * Keyingi bosqichda:
             *
             * Rasm → Backend → AI Vision
             *                    ↓
             *              Masala javobi
             *
             * tizimi ulanadi.
             */

            const result =
                document.querySelector("#imageResult");

            if (result) {
                result.style.display = "block";

                result.innerHTML = `
                    <div class="result-card">
                        <div class="result-icon">
                            🧠
                        </div>

                        <h3>AI tizimi tayyorlanmoqda</h3>

                        <p>
                            Rasmni o‘qish va masalani yechish
                            funksiyasi keyingi bosqichda
                            AI backend bilan ulanadi.
                        </p>
                    </div>
                `;
            }
        });
    }

    // ================================
    // JAVOBNI NUSXALASH
    // ================================

    document.addEventListener("click", event => {

        const button =
            event.target.closest("[data-copy]");

        if (!button) return;

        const text =
            button.dataset.copy || "";

        navigator.clipboard.writeText(text)
            .then(() => {
                showToast("Javob nusxalandi 📋");
            })
            .catch(() => {
                showToast("Nusxalash amalga oshmadi.");
            });
    });

    // ================================
    // QADAMLARNI KO‘RSATISH
    // ================================

    document.addEventListener("click", event => {

        const button =
            event.target.closest("[data-steps]");

        if (!button) return;

        const steps =
            document.querySelector("#solutionSteps");

        if (!steps) return;

        steps.classList.toggle("show");

        if (steps.classList.contains("show")) {
            button.textContent =
                "🔽 Yechimni yashirish";
        } else {
            button.textContent =
                "📖 Qanday ishlanganini ko‘rish";
        }
    });

    // ================================
    // YORDAMCHI
    // ================================

    const helpInput =
        document.querySelector("#helpInput");

    const helpSend =
        document.querySelector("#helpSend");

    const helpMessages =
        document.querySelector("#helpMessages");

    function addHelpMessage(text, type = "bot") {

        if (!helpMessages) return;

        const message =
            document.createElement("div");

        message.className =
            `help-message ${type}`;

        message.textContent = text;

        helpMessages.appendChild(message);

        helpMessages.scrollTop =
            helpMessages.scrollHeight;
    }

    function eduVoraHelp(question) {

        const q = question.toLowerCase();

        if (
            q.includes("7-sinf") &&
            q.includes("matematika") &&
            (
                q.includes("darslik") ||
                q.includes("kitob") ||
                q.includes("bormi")
            )
        ) {
            return {
                text:
                    "📘 7-sinf Matematika darsligi EduVora’da mavjud.",
                button:
                    "📖 7-sinf Matematikani ochish"
            };
        }

        if (
            q.includes("premium") &&
            q.includes("eduvora")
        ) {
            return {
                text:
                    "⭐ EduVora Premium — platformadagi qo‘shimcha imkoniyatlardan foydalanish uchun mo‘ljallangan premium xizmat.",
                button: null
            };
        }

        if (
            q.includes("real madrid") ||
            q.includes("futbol") ||
            q.includes("gol") ||
            q.includes("ob-havo") ||
            q.includes("bitcoin")
        ) {
            return {
                text:
                    "ℹ️ Bu savol EduVora yordamchisi doirasiga kirmaydi.\n\nMen faqat EduVora platformasi, darsliklar, fanlar va xizmatlari haqida ma’lumot beraman.",
                button: null
            };
        }

        return {
            text:
                "🤖 Bu savol bo‘yicha hozircha EduVora ma’lumotlar bazasida tasdiqlangan ma’lumot topilmadi.",
            button: null
        };
    }

    if (helpSend && helpInput) {

        function sendHelp() {

            const question =
                helpInput.value.trim();

            if (!question) return;

            addHelpMessage(question, "user");

            helpInput.value = "";

            setTimeout(() => {

                const answer =
                    eduVoraHelp(question);

                addHelpMessage(
                    answer.text,
                    "bot"
                );

                if (answer.button) {

                    const button =
                        document.createElement("button");

                    button.className =
                        "primary-btn help-open-btn";

                    button.textContent =
                        answer.button;

                    button.addEventListener(
                        "click",
                        () => {
                            openGrades(
                                subjects[0],
                                7
                            );
                        }
                    );

                    helpMessages.appendChild(button);
                }

            }, 500);
        }

        helpSend.addEventListener(
            "click",
            sendHelp
        );

        helpInput.addEventListener(
            "keydown",
            event => {
                if (event.key === "Enter") {
                    sendHelp();
                }
            }
        );
    }

    // ================================
    // BOOK CAROUSEL
    // ================================

    const carousel =
        document.querySelector(".books-carousel");

    if (carousel) {

        let autoSlide;

        function startAutoSlide() {

            clearInterval(autoSlide);

            autoSlide = setInterval(() => {

                const maxScroll =
                    carousel.scrollWidth -
                    carousel.clientWidth;

                if (carousel.scrollLeft >= maxScroll - 10) {

                    carousel.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                } else {

                    carousel.scrollBy({
                        left: 220,
                        behavior: "smooth"
                    });
                }

            }, 3500);
        }

        startAutoSlide();

        carousel.addEventListener(
            "touchstart",
            () => {
                clearInterval(autoSlide);
            },
            { passive: true }
        );

        carousel.addEventListener(
            "touchend",
            () => {
                startAutoSlide();
            },
            { passive: true }
        );
    }

    // ================================
    // TOAST
    // ================================

    function showToast(message) {

        let toast =
            document.querySelector("#toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id = "toast";
            toast.className = "toast";

            document.body.appendChild(toast);
        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    // ================================
    // TELEGRAM USER
    // ================================

    if (tg?.initDataUnsafe?.user) {

        const user =
            tg.initDataUnsafe.user;

        const nameElement =
            document.querySelector("#profileName");

        if (nameElement) {
            nameElement.textContent =
                user.first_name || "Foydalanuvchi";
        }
    }

    // ================================
    // DEFAULT PAGE
    // ================================

    showPage("homePage");
});
