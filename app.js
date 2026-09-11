// =========================================================
// EDUVORA — APP.JS
// =========================================================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

// =========================================================
// DATA
// =========================================================

const subjects = [
    {
        id: "math",
        name: "Matematika",
        icon: "📐",
        topics: [
            "Natural sonlar",
            "Qo‘shish va ayirish",
            "Ko‘paytirish",
            "Bo‘lish",
            "Kasrlar"
        ]
    },
    {
        id: "uzbek",
        name: "Ona tili",
        icon: "📖",
        topics: [
            "So‘z va uning ma'nosi",
            "Ot",
            "Sifat",
            "Fe'l",
            "Gap"
        ]
    },
    {
        id: "english",
        name: "Ingliz tili",
        icon: "🇬🇧",
        topics: [
            "Alphabet",
            "To be",
            "Pronouns",
            "Present Simple",
            "Present Continuous"
        ]
    },
    {
        id: "physics",
        name: "Fizika",
        icon: "⚡",
        topics: [
            "Harakat",
            "Tezlik",
            "Kuch",
            "Energiya"
        ]
    },
    {
        id: "chemistry",
        name: "Kimyo",
        icon: "🧪",
        topics: [
            "Moddalar",
            "Atom",
            "Molekula",
            "Kimyoviy reaksiyalar"
        ]
    },
    {
        id: "biology",
        name: "Biologiya",
        icon: "🧬",
        topics: [
            "Tirik organizmlar",
            "Hujayra",
            "O‘simliklar",
            "Hayvonlar"
        ]
    },
    {
        id: "history",
        name: "Tarix",
        icon: "🏛️",
        topics: [
            "Qadimgi dunyo",
            "O‘rta asrlar",
            "Amir Temur",
            "O‘zbekiston tarixi"
        ]
    },
    {
        id: "informatics",
        name: "Informatika",
        icon: "💻",
        topics: [
            "Kompyuter",
            "Algoritm",
            "Dasturlash",
            "Internet"
        ]
    }
];

// =========================================================
// STATE
// =========================================================

let currentSubject = null;
let currentTopicIndex = 0;

let learnedTopics = 0;
let learnedSubjects = new Set();

let assistantStarted = false;

// =========================================================
// PAGE SYSTEM
// =========================================================

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    const navItem = document.querySelector(
        `.nav-item[data-page="${pageId}"]`
    );

    if (navItem) {
        navItem.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "assistantPage") {
        startAssistant();
    }
}

// =========================================================
// SUBJECT CARD
// =========================================================

function createSubjectCard(subject) {
    const card = document.createElement("button");

    card.className = "subject-card";

    card.innerHTML = `
        <div class="subject-icon">${subject.icon}</div>

        <div class="subject-name">
            ${subject.name}
        </div>

        <div class="subject-arrow">
            ›
        </div>
    `;

    card.addEventListener("click", () => {
        openSubject(subject.id);
    });

    return card;
}

// =========================================================
// SUBJECTS
// =========================================================

function renderSubjects() {
    const homeContainer =
        document.getElementById("homeSubjectsContainer");

    const subjectsContainer =
        document.getElementById("subjectsContainer");

    if (homeContainer) {
        homeContainer.innerHTML = "";

        subjects.forEach(subject => {
            homeContainer.appendChild(
                createSubjectCard(subject)
            );
        });
    }

    if (subjectsContainer) {
        subjectsContainer.innerHTML = "";

        subjects.forEach(subject => {
            const card = document.createElement("button");

            card.className = "subject-list-card";

            card.innerHTML = `
                <div class="subject-list-icon">
                    ${subject.icon}
                </div>

                <div class="subject-list-info">
                    <strong>${subject.name}</strong>
                    <span>
                        ${subject.topics.length} ta mavzu
                    </span>
                </div>

                <div class="subject-list-arrow">
                    ›
                </div>
            `;

            card.addEventListener("click", () => {
                openSubject(subject.id);
            });

            subjectsContainer.appendChild(card);
        });
    }
}

// =========================================================
// OPEN SUBJECT
// =========================================================

function openSubject(subjectId) {
    const subject = subjects.find(
        item => item.id === subjectId
    );

    if (!subject) return;

    currentSubject = subject;

    document.getElementById("topicsTitle").textContent =
        subject.name;

    renderTopics(subject);

    showPage("topicsPage");
}

// =========================================================
// RENDER TOPICS
// =========================================================

function renderTopics(subject) {
    const container =
        document.getElementById("topicsContainer");

    if (!container) return;

    container.innerHTML = "";

    subject.topics.forEach((topic, index) => {
        const card = document.createElement("button");

        card.className = "topic-card";

        card.innerHTML = `
            <div class="topic-number">
                ${index + 1}
            </div>

            <div class="topic-info">
                <strong>${topic}</strong>
                <span>
                    ${index + 1}-mavzu
                </span>
            </div>

            <div class="topic-arrow">
                ›
            </div>
        `;

        card.addEventListener("click", () => {
            openTopic(subject.id, index);
        });

        container.appendChild(card);
    });
}

// =========================================================
// OPEN TOPIC
// =========================================================

function openTopic(subjectId, topicIndex) {
    const subject = subjects.find(
        item => item.id === subjectId
    );

    if (!subject) return;

    currentSubject = subject;
    currentTopicIndex = topicIndex;

    const topic = subject.topics[topicIndex];

    document.getElementById("topicDetailTitle").textContent =
        topic;

    renderTopicContent(subject, topic, topicIndex);

    learnedTopics++;

    learnedSubjects.add(subject.id);

    updateProfile();

    showPage("topicDetailPage");
}

// =========================================================
// TOPIC CONTENT
// =========================================================

function renderTopicContent(subject, topic, index) {
    const content =
        document.getElementById("topicContent");

    if (!content) return;

    let explanation = `
        <h2>${topic}</h2>

        <p>
            Bu mavzuda <strong>${topic}</strong>
            haqida asosiy tushunchalarni o‘rganamiz.
        </p>

        <h3>📚 Mavzu haqida</h3>

        <p>
            Mavzuni bosqichma-bosqich o‘rganing.
            Avval asosiy tushunchalarni tushunib oling,
            keyin misollarni yeching.
        </p>

        <h3>💡 Eslab qoling</h3>

        <p>
            Muhim qoidalarni yozib oling va
            o‘zingiz mustaqil misollar ishlab ko‘ring.
        </p>
    `;

    if (subject.id === "math") {
        explanation = `
            <h2>${topic}</h2>

            <p>
                <strong>${topic}</strong> — matematikaning
                muhim mavzularidan biridir.
            </p>

            <h3>📌 Asosiy tushuncha</h3>

            <p>
                Matematik masalalarni yechishda avval
                berilgan ma'lumotlarni aniqlash,
                keyin kerakli amalni tanlash muhim.
            </p>

            <h3>🧮 Misol</h3>

            <p>
                Masalan:
                <strong>5 + 3 = 8</strong>
            </p>

            <p>
                Bu yerda 5 va 3 qo‘shiladi va natijada
                8 hosil bo‘ladi.
            </p>

            <h3>💡 Eslab qoling</h3>

            <p>
                Masalani shoshilmasdan bosqichma-bosqich
                yechish eng yaxshi usuldir.
            </p>
        `;
    }

    content.innerHTML = explanation;

    updateTopicButtons();
}

// =========================================================
// TOPIC NAVIGATION
// =========================================================

function updateTopicButtons() {
    const previous =
        document.getElementById("previousTopic");

    const next =
        document.getElementById("nextTopic");

    if (!currentSubject) return;

    previous.disabled =
        currentTopicIndex <= 0;

    next.disabled =
        currentTopicIndex >=
        currentSubject.topics.length - 1;

    previous.style.opacity =
        previous.disabled ? "0.45" : "1";

    next.style.opacity =
        next.disabled ? "0.45" : "1";
}

function openPreviousTopic() {
    if (!currentSubject) return;

    if (currentTopicIndex <= 0) return;

    openTopic(
        currentSubject.id,
        currentTopicIndex - 1
    );
}

function openNextTopic() {
    if (!currentSubject) return;

    if (
        currentTopicIndex >=
        currentSubject.topics.length - 1
    ) {
        return;
    }

    openTopic(
        currentSubject.id,
        currentTopicIndex + 1
    );
}

// =========================================================
// ASSISTANT
// =========================================================

function startAssistant() {
    const messages =
        document.getElementById("helpMessages");

    if (!messages) return;

    if (assistantStarted) return;

    assistantStarted = true;

    messages.innerHTML = "";

    addAssistantMessage(
        "Salom! 👋 Men EduVora Assistantman."
    );

    setTimeout(() => {
        addAssistantMessage(
            "Sizga masalalar, savollar va mavzularni tushuntirishda yordam beraman. Savolingizni yozing."
        );
    }, 450);
}

// =========================================================
// ASSISTANT MESSAGE
// =========================================================

function addAssistantMessage(text) {
    const container =
        document.getElementById("helpMessages");

    if (!container) return;

    const message =
        document.createElement("div");

    message.className =
        "help-message assistant";

    message.textContent = text;

    container.appendChild(message);

    scrollAssistant();
}

function addUserMessage(text) {
    const container =
        document.getElementById("helpMessages");

    if (!container) return;

    const message =
        document.createElement("div");

    message.className =
        "help-message user";

    message.textContent = text;

    container.appendChild(message);

    scrollAssistant();
}

function scrollAssistant() {
    const messages =
        document.getElementById("helpMessages");

    if (!messages) return;

    setTimeout(() => {
        messages.scrollTop =
            messages.scrollHeight;
    }, 50);
}

// =========================================================
// ASSISTANT RESPONSE
// =========================================================

function getAssistantResponse(question) {
    const text =
        question
            .toLowerCase()
            .trim();

    if (!text) {
        return "Savolingizni yozing, men yordam beraman. 😊";
    }

    // MATEMATIKA

    if (
        text.includes("2+2") ||
        text.includes("2 + 2")
    ) {
        return "2 + 2 = 4 ✅";
    }

    if (
        text.includes("5+5") ||
        text.includes("5 + 5")
    ) {
        return "5 + 5 = 10 ✅";
    }

    // EDUVERA

    if (
        text.includes("eduvora nima") ||
        text.includes("eduvora")
    ) {
        return "EduVora — fanlar va mavzularni bosqichma-bosqich o‘rganishga yordam beradigan ta’lim platformasi. 📚";
    }

    // SALOM

    if (
        text === "salom" ||
        text === "assalomu alaykum" ||
        text.includes("hello")
    ) {
        return "Salom! 👋 Qanday savolingiz bor?";
    }

    // YORDAM

    if (
        text.includes("yordam") ||
        text.includes("help")
    ) {
        return "Albatta! Savolingizni yozing. Masalan, matematika masalasini yuborsangiz, uni tushuntirishga harakat qilaman. 🤖";
    }

    // DEFAULT

    return "Savolingizni tushundim. 🤔 Hozircha men asosiy savollar va oddiy misollar bilan ishlayman. Savolni aniqroq yozib ko‘ring.";
}

// =========================================================
// SEND ASSISTANT MESSAGE
// =========================================================

function sendAssistantMessage() {
    const input =
        document.getElementById("helpInput");

    if (!input) return;

    const question =
        input.value.trim();

    if (!question) return;

    addUserMessage(question);

    input.value = "";

    // kichik typing effekt
    const typing =
        document.createElement("div");

    typing.className =
        "help-message assistant";

    typing.textContent =
        "Yozmoqda...";

    typing.id =
        "assistantTyping";

    document
        .getElementById("helpMessages")
        .appendChild(typing);

    scrollAssistant();

    setTimeout(() => {
        const oldTyping =
            document.getElementById(
                "assistantTyping"
            );

        if (oldTyping) {
            oldTyping.remove();
        }

        const answer =
            getAssistantResponse(question);

        addAssistantMessage(answer);
    }, 500);
}

// =========================================================
// PROFILE
// =========================================================

function updateProfile() {
    const topics =
        document.getElementById("profileTopics");

    const subjectsCount =
        document.getElementById("profileSubjects");

    if (topics) {
        topics.textContent =
            learnedTopics;
    }

    if (subjectsCount) {
        subjectsCount.textContent =
            learnedSubjects.size;
    }
}

// =========================================================
// TELEGRAM USER
// =========================================================

function loadTelegramUser() {
    const nameElement =
        document.getElementById("profileName");

    if (!nameElement) return;

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {
        const user =
            tg.initDataUnsafe.user;

        const fullName =
            [
                user.first_name,
                user.last_name
            ]
                .filter(Boolean)
                .join(" ");

        if (fullName) {
            nameElement.textContent =
                fullName;
        }
    }
}

// =========================================================
// SEARCH
// =========================================================

function setupSearch() {
    const input =
        document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("input", () => {
        const query =
            input.value
                .toLowerCase()
                .trim();

        const container =
            document.getElementById(
                "homeSubjectsContainer"
            );

        if (!container) return;

        container.innerHTML = "";

        if (!query) {
            subjects.forEach(subject => {
                container.appendChild(
                    createSubjectCard(subject)
                );
            });

            return;
        }

        const results =
            subjects.filter(subject => {
                const subjectMatch =
                    subject.name
                        .toLowerCase()
                        .includes(query);

                const topicMatch =
                    subject.topics.some(topic =>
                        topic
                            .toLowerCase()
                            .includes(query)
                    );

                return subjectMatch || topicMatch;
            });

        results.forEach(subject => {
            container.appendChild(
                createSubjectCard(subject)
            );
        });

        if (results.length === 0) {
            container.innerHTML = `
                <div class="empty-state"
                     style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">
                        🔎
                    </div>

                    <h3>Hech narsa topilmadi</h3>

                    <p>
                        Boshqa fan yoki mavzu nomini
                        yozib ko‘ring.
                    </p>
                </div>
            `;
        }
    });
}

// =========================================================
// NAVIGATION
// =========================================================

function setupNavigation() {
    document
        .querySelectorAll(".nav-item")
        .forEach(item => {
            item.addEventListener(
                "click",
                () => {
                    const page =
                        item.dataset.page;

                    showPage(page);
                }
            );
        });

    document
        .querySelectorAll("[data-back]")
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    showPage(
                        button.dataset.back
                    );
                }
            );
        });
}

// =========================================================
// ASSISTANT EVENTS
// =========================================================

function setupAssistant() {
    const sendButton =
        document.getElementById("helpSend");

    const input =
        document.getElementById("helpInput");

    if (sendButton) {
        sendButton.addEventListener(
            "click",
            sendAssistantMessage
        );
    }

    if (input) {
        input.addEventListener(
            "keydown",
            event => {
                if (event.key === "Enter") {
                    event.preventDefault();

                    sendAssistantMessage();
                }
            }
        );
    }
}

// =========================================================
// TOPIC BUTTONS
// =========================================================

function setupTopicNavigation() {
    const previous =
        document.getElementById("previousTopic");

    const next =
        document.getElementById("nextTopic");

    if (previous) {
        previous.addEventListener(
            "click",
            openPreviousTopic
        );
    }

    if (next) {
        next.addEventListener(
            "click",
            openNextTopic
        );
    }
}

// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {
        renderSubjects();

        setupNavigation();

        setupSearch();

        setupAssistant();

        setupTopicNavigation();

        loadTelegramUser();

        updateProfile();

        showPage("homePage");
    }
);
