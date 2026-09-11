// ========================================
// EduVora Mini App
// app.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 EduVora ishga tushdi");


    // ========================================
    // TELEGRAM WEB APP
    // ========================================

    const tg = window.Telegram?.WebApp;

    if (tg) {
        tg.ready();
        tg.expand();
    }


    // ========================================
    // RANDOM BACKGROUND
    // ========================================

    const backgrounds = [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80"
    ];

    const randomBackground =
        backgrounds[
            Math.floor(Math.random() * backgrounds.length)
        ];

    document.documentElement.style.setProperty(
        "--edu-bg",
        `url("${randomBackground}")`
    );


    // ========================================
    // ELEMENTS
    // ========================================

    const pages =
        document.querySelectorAll(".page");

    const navItems =
        document.querySelectorAll(".nav-item");

    const searchInput =
        document.querySelector("#searchInput");


    // ========================================
    // DATA
    // ========================================

    const subjects = [

        {
            id: "math",
            name: "Matematika",
            icon: "📐",
            description: "Matematika fanini bosqichma-bosqich o‘rganing."
        },

        {
            id: "uzbek",
            name: "Ona tili",
            icon: "📖",
            description: "Ona tili bo‘yicha mavzular."
        },

        {
            id: "english",
            name: "Ingliz tili",
            icon: "🇬🇧",
            description: "Ingliz tilini o‘rganish uchun mavzular."
        },

        {
            id: "physics",
            name: "Fizika",
            icon: "⚛️",
            description: "Fizika asoslari va mavzular."
        },

        {
            id: "chemistry",
            name: "Kimyo",
            icon: "🧪",
            description: "Kimyo fanining asosiy mavzulari."
        },

        {
            id: "biology",
            name: "Biologiya",
            icon: "🧬",
            description: "Biologiya fanini o‘rganing."
        },

        {
            id: "history",
            name: "Tarix",
            icon: "🏛️",
            description: "O‘zbekiston va jahon tarixi."
        },

        {
            id: "informatics",
            name: "Informatika",
            icon: "💻",
            description: "Informatika va dasturlash asoslari."
        }

    ];


    // ========================================
    // TOPICS
    // ========================================

    const topics = {

        math: [
            {
                title: "1-mavzu",
                name: "Natural sonlar",
                content: `
                    <h3>Natural sonlar</h3>

                    <p>
                        Natural sonlar sanashda ishlatiladigan
                        musbat butun sonlardir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            1, 2, 3, 4, 5, 6, ...
                        </p>
                    </div>

                    <p>
                        Natural sonlar odatda N harfi bilan
                        belgilanadi.
                    </p>
                `
            },

            {
                title: "2-mavzu",
                name: "Qo‘shish va ayirish",
                content: `
                    <h3>Qo‘shish va ayirish</h3>

                    <p>
                        Qo‘shish ikki yoki undan ortiq sonlarni
                        birlashtirish amalidir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            5 + 3 = 8
                        </p>
                    </div>

                    <p>
                        Ayirish esa bir sondan boshqa sonni
                        ayirish amalidir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            9 − 4 = 5
                        </p>
                    </div>
                `
            },

            {
                title: "3-mavzu",
                name: "Ko‘paytirish",
                content: `
                    <h3>Ko‘paytirish</h3>

                    <p>
                        Ko‘paytirish bir xil sonni bir necha
                        marta qo‘shishning qisqa ko‘rinishidir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            4 × 3 = 12
                        </p>
                    </div>
                `
            },

            {
                title: "4-mavzu",
                name: "Bo‘lish",
                content: `
                    <h3>Bo‘lish</h3>

                    <p>
                        Bo‘lish sonni teng qismlarga ajratish
                        amalidir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            12 ÷ 3 = 4
                        </p>
                    </div>
                `
            }
        ],


        uzbek: [
            {
                title: "1-mavzu",
                name: "So‘z va uning ma'nosi",
                content: `
                    <h3>So‘z va uning ma'nosi</h3>

                    <p>
                        So‘z ma'lum bir ma'noni bildiradi.
                        Tilimizdagi barcha gaplar so‘zlardan
                        tashkil topadi.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            Kitob, maktab, o‘quvchi, bilim.
                        </p>
                    </div>
                `
            },

            {
                title: "2-mavzu",
                name: "Ot so‘z turkumi",
                content: `
                    <h3>Ot so‘z turkumi</h3>

                    <p>
                        Shaxs, narsa, joy va tushuncha nomlarini
                        bildirgan so‘zlar ot deyiladi.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            O‘quvchi, kitob, maktab, shahar.
                        </p>
                    </div>
                `
            },

            {
                title: "3-mavzu",
                name: "Sifat",
                content: `
                    <h3>Sifat</h3>

                    <p>
                        Sifat predmetning belgisini bildiradi.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            Chiroyli, katta, kichik, aqlli.
                        </p>
                    </div>
                `
            }
        ],


        english: [
            {
                title: "1-mavzu",
                name: "Alphabet",
                content: `
                    <h3>English Alphabet</h3>

                    <p>
                        Ingliz alifbosida 26 ta harf mavjud.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            A, B, C, D, E ...
                        </p>
                    </div>
                `
            },

            {
                title: "2-mavzu",
                name: "To be",
                content: `
                    <h3>To be</h3>

                    <p>
                        Ingliz tilida am, is va are
                        "to be" fe'lining shakllaridir.
                    </p>

                    <div class="lesson-example">
                        <strong>Misol:</strong>

                        <p>
                            I am a student.
                            <br>
                            She is a teacher.
                            <br>
                            They are friends.
                        </p>
                    </div>
                `
            }
        ],


        physics: [
            {
                title: "1-mavzu",
                name: "Fizika haqida",
                content: `
                    <h3>Fizika haqida</h3>

                    <p>
                        Fizika tabiatdagi hodisalarni,
                        jismlarning harakatini va o‘zaro
                        ta'sirini o‘rganadi.
                    </p>
                `
            }
        ],


        chemistry: [
            {
                title: "1-mavzu",
                name: "Kimyo faniga kirish",
                content: `
                    <h3>Kimyo faniga kirish</h3>

                    <p>
                        Kimyo moddalar, ularning tarkibi,
                        tuzilishi va xossalarini o‘rganadi.
                    </p>
                `
            }
        ],


        biology: [
            {
                title: "1-mavzu",
                name: "Biologiya haqida",
                content: `
                    <h3>Biologiya</h3>

                    <p>
                        Biologiya tirik organizmlarni
                        o‘rganadigan fan.
                    </p>
                `
            }
        ],


        history: [
            {
                title: "1-mavzu",
                name: "Tarix nima?",
                content: `
                    <h3>Tarix nima?</h3>

                    <p>
                        Tarix insoniyatning o‘tmishini
                        o‘rganadigan fan.
                    </p>
                `
            }
        ],


        informatics: [
            {
                title: "1-mavzu",
                name: "Informatikaga kirish",
                content: `
                    <h3>Informatikaga kirish</h3>

                    <p>
                        Informatika axborotni olish,
                        saqlash, qayta ishlash va uzatishni
                        o‘rganadi.
                    </p>
                `
            }
        ]

    };


    // ========================================
    // PAGE NAVIGATION
    // ========================================

    function showPage(pageId) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target =
            document.getElementById(pageId);

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


    // ========================================
    // SUBJECT CARD
    // ========================================

    function createSubjectCard(subject) {

        const card =
            document.createElement("button");

        card.className = "subject-card";

        card.innerHTML = `
            <div class="subject-icon">
                ${subject.icon}
            </div>

            <div class="subject-info">

                <h3>
                    ${subject.name}
                </h3>

                <p>
                    ${subject.description}
                </p>

            </div>

            <div class="subject-arrow">
                →
            </div>
        `;

        card.addEventListener("click", () => {
            openSubject(subject.id);
        });

        return card;
    }


    // ========================================
    // RENDER SUBJECTS
    // ========================================

    function renderSubjects() {

        const homeContainer =
            document.querySelector(
                "#homeSubjectsContainer"
            );

        const subjectsContainer =
            document.querySelector(
                "#subjectsContainer"
            );


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

                subjectsContainer.appendChild(
                    createSubjectCard(subject)
                );

            });

        }

    }


    // ========================================
    // OPEN SUBJECT
    // ========================================

    function openSubject(subjectId) {

        const subject =
            subjects.find(
                item => item.id === subjectId
            );

        if (!subject) return;

        const title =
            document.querySelector("#topicsTitle");

        if (title) {
            title.textContent =
                subject.name;
        }


        renderTopics(subjectId);

        showPage("topicsPage");
    }


    // ========================================
    // RENDER TOPICS
    // ========================================

    function renderTopics(subjectId) {

        const container =
            document.querySelector(
                "#topicsContainer"
            );

        if (!container) return;

        container.innerHTML = "";

        const subjectTopics =
            topics[subjectId] || [];


        if (subjectTopics.length === 0) {

            container.innerHTML = `
                <div class="empty-state">

                    <div>
                        📚
                    </div>

                    <h3>
                        Mavzular tez orada
                    </h3>

                    <p>
                        Ushbu fan uchun mavzular
                        tayyorlanmoqda.
                    </p>

                </div>
            `;

            return;
        }


        subjectTopics.forEach(
            (topic, index) => {

                const card =
                    document.createElement("button");

                card.className =
                    "topic-card";

                card.innerHTML = `

                    <div class="topic-number">
                        ${index + 1}
                    </div>

                    <div class="topic-info">

                        <span>
                            ${topic.title}
                        </span>

                        <h3>
                            ${topic.name}
                        </h3>

                    </div>

                    <div class="topic-arrow">
                        →
                    </div>

                `;

                card.addEventListener(
                    "click",
                    () => {
                        openTopic(
                            subjectId,
                            index
                        );
                    }
                );

                container.appendChild(card);

            }
        );

    }


    // ========================================
    // OPEN TOPIC
    // ========================================

    let currentSubjectId = null;
    let currentTopicIndex = 0;


    function openTopic(
        subjectId,
        topicIndex
    ) {

        const subjectTopics =
            topics[subjectId];

        if (!subjectTopics) return;

        const topic =
            subjectTopics[topicIndex];

        if (!topic) return;


        currentSubjectId =
            subjectId;

        currentTopicIndex =
            topicIndex;


        const title =
            document.querySelector(
                "#topicDetailTitle"
            );

        const content =
            document.querySelector(
                "#topicContent"
            );


        if (title) {
            title.textContent =
                topic.name;
        }

        if (content) {
            content.innerHTML =
                topic.content;
        }


        updateTopicButtons();

        showPage(
            "topicDetailPage"
        );

    }


    // ========================================
    // TOPIC NAVIGATION
    // ========================================

    function updateTopicButtons() {

        const previous =
            document.querySelector(
                "#previousTopic"
            );

        const next =
            document.querySelector(
                "#nextTopic"
            );

        const subjectTopics =
            topics[currentSubjectId] || [];


        if (previous) {

            previous.disabled =
                currentTopicIndex === 0;

        }


        if (next) {

            next.disabled =
                currentTopicIndex >=
                subjectTopics.length - 1;

        }

    }


    document
        .querySelector("#previousTopic")
        ?.addEventListener(
            "click",
            () => {

                if (
                    currentTopicIndex <= 0
                ) return;

                openTopic(
                    currentSubjectId,
                    currentTopicIndex - 1
                );

            }
        );


    document
        .querySelector("#nextTopic")
        ?.addEventListener(
            "click",
            () => {

                const subjectTopics =
                    topics[currentSubjectId] || [];

                if (
                    currentTopicIndex >=
                    subjectTopics.length - 1
                ) return;

                openTopic(
                    currentSubjectId,
                    currentTopicIndex + 1
                );

            }
        );


    // ========================================
    // NAVIGATION
    // ========================================

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const page =
                    item.dataset.page;

                if (page) {
                    showPage(page);
                }

            }
        );

    });


    // ========================================
    // BACK BUTTON
    // ========================================

    document
        .querySelectorAll("[data-back]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const page =
                        button.dataset.back;

                    if (page) {
                        showPage(page);
                    }

                }
            );

        });


    // ========================================
    // SEARCH
    // ========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                const cards =
                    document.querySelectorAll(
                        "#homeSubjectsContainer .subject-card"
                    );


                cards.forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    card.style.display =
                        !query ||
                        text.includes(query)
                            ? ""
                            : "none";

                });

            }
        );

    }


    // ========================================
    // ASSISTANT
    // ========================================

    const helpInput =
        document.querySelector(
            "#helpInput"
        );

    const helpSend =
        document.querySelector(
            "#helpSend"
        );

    const helpMessages =
        document.querySelector(
            "#helpMessages"
        );


    function addAssistantMessage(
        text,
        type = "bot"
    ) {

        if (!helpMessages) return;


        const message =
            document.createElement("div");

        message.className =
            `help-message ${type}`;

        message.textContent =
            text;

        helpMessages.appendChild(
            message
        );

        helpMessages.scrollTop =
            helpMessages.scrollHeight;

    }


    function assistantAnswer(question) {

        const q =
            question
                .toLowerCase()
                .trim();


        if (
            q.includes("matematika")
        ) {

            return `
📐 Matematika fanida hozircha bir nechta mavzu mavjud.

Fanlar → Matematika bo‘limidan barcha mavzularni ko‘rishingiz mumkin.
            `.trim();

        }


        if (
            q.includes("ona tili")
        ) {

            return `
📖 Ona tili fanida so‘z, ot va sifat kabi mavzular mavjud.

Fanlar → Ona tili bo‘limiga kirib ko‘rishingiz mumkin.
            `.trim();

        }


        if (
            q.includes("eduvora")
        ) {

            return `
🎓 EduVora — fanlarni va mavzularni bosqichma-bosqich o‘rganishga yordam beruvchi ta'lim platformasi.
            `.trim();

        }


        if (
            q.includes("yordam") ||
            q.includes("o‘qish") ||
            q.includes("oqish")
        ) {

            return `
📚 Albatta. EduVora’da Fanlar bo‘limidan kerakli fanni tanlang va mavzularni birma-bir o‘rganing.
            `.trim();

        }


        return `
🤖 Hozircha bu savol bo‘yicha aniq javobim yo‘q.

Fanlar yoki EduVora platformasi haqida savol berib ko‘ring.
        `.trim();

    }


    function sendAssistantMessage() {

        if (!helpInput) return;


        const question =
            helpInput.value.trim();


        if (!question) return;


        addAssistantMessage(
            question,
            "user"
        );


        helpInput.value = "";


        setTimeout(() => {

            const answer =
                assistantAnswer(
                    question
                );

            addAssistantMessage(
                answer,
                "bot"
            );

        }, 400);

    }


    helpSend?.addEventListener(
        "click",
        sendAssistantMessage
    );


    helpInput?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                sendAssistantMessage();
            }

        }
    );


    // ========================================
    // ASSISTANT EXAMPLES
    // ========================================

    document
        .querySelectorAll(
            ".example-question"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const question =
                        button.dataset.question;

                    if (!question) return;

                    helpInput.value =
                        question;

                    sendAssistantMessage();

                }
            );

        });


    // ========================================
    // TELEGRAM USER
    // ========================================

    if (tg?.initDataUnsafe?.user) {

        const user =
            tg.initDataUnsafe.user;

        const nameElement =
            document.querySelector(
                "#profileName"
            );

        if (nameElement) {

            nameElement.textContent =
                user.first_name ||
                "Foydalanuvchi";

        }

    }


    // ========================================
    // START
    // ========================================

    renderSubjects();

    showPage("homePage");

});
