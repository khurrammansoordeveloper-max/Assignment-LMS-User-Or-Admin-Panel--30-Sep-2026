// ============================================
// COURSE DATA
// ============================================

let courses = [
    {
        id: 1,
        title: "Introduction to Web Development",
        instructor: "Ahmed",
        progress: 80,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
    },
    {
        id: 2,
        title: "UI/UX Design Fundamentals",
        instructor: "Feroz",
        progress: 35,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
    },
    {
        id: 3,
        title: "Data Science Essentials",
        instructor: "Sara",
        progress: 100,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    }
];


// ============================================
// GET HTML ELEMENTS
// ============================================

const dashboardView = document.getElementById("dashboard-view");
const coursesView = document.getElementById("courses-view");
const courseGrid = document.getElementById("course-grid");

const modal = document.getElementById("addCourseModal");
const courseForm = document.getElementById("courseForm");

const addCourseBtn = document.getElementById("addCourseBtn");
const addCourseNav = document.getElementById("addCourseNav");
const closeModalBtn = document.getElementById("closeModal");


// ============================================
// INITIALIZE APPLICATION
// ============================================

renderCourses();
updateStats();


// ============================================
// NAVIGATION
// ============================================
document.getElementById("navigateButton").onclick = function () {
window.location.href = "./students.html";
};
const navLinks = document.querySelectorAll(".nav-link[data-tab]");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

        const tab = link.dataset.tab;

        if (tab === "dashboard") {
            dashboardView.classList.remove("hidden");
            coursesView.classList.add("hidden");
        }

        if (tab === "courses") {
            dashboardView.classList.add("hidden");
            coursesView.classList.remove("hidden");
        }
    });
});


// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal() {
    modal.classList.remove("hidden");
    document.getElementById("courseTitle").focus();
}

function closeModal() {
    modal.classList.add("hidden");
    courseForm.reset();
    document.getElementById("courseProgress").value = 0;
}

addCourseBtn.addEventListener("click", openModal);
addCourseNav.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);


// Close modal by clicking outside the box
modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        closeModal();
    }
});


// ============================================
// ADD NEW COURSE
// ============================================

courseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const title =
        document.getElementById("courseTitle").value.trim();

    const instructor =
        document.getElementById("courseInstructor").value.trim();

    const progress =
        parseInt(document.getElementById("courseProgress").value);


    if (!title || !instructor) {
        alert("Please fill in all fields.");
        return;
    }

    if (isNaN(progress) || progress < 0 || progress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }


    const newCourse = {
        id: Date.now(),
        title: title,
        instructor: instructor,
        progress: progress,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
    };


    courses.push(newCourse);

    renderCourses();
    updateStats();

    closeModal();

    // Automatically show Courses
    dashboardView.classList.add("hidden");
    coursesView.classList.remove("hidden");

    navLinks.forEach(function (item) {
        item.classList.remove("active");
    });

    document
        .querySelector('[data-tab="courses"]')
        .classList.add("active");
});


// ============================================
// DISPLAY COURSES
// ============================================

function renderCourses() {

    courseGrid.innerHTML = "";


    courses.forEach(function (course) {

        const completedClass =
            course.progress === 100 ? "completed" : "";


        const card = document.createElement("div");

        card.className = "course-card";


        card.innerHTML = `
            <img
                src="${course.image}"
                alt="${course.title}"
                class="course-image"
            >

            <div class="course-body">

                <h3 class="course-title">
                    ${course.title}
                </h3>

                <p class="instructor">
                    👤 Instructor: ${course.instructor}
                </p>

                <div class="progress-info">
                    <span>Progress</span>
                    <span>${course.progress}%</span>
                </div>

                <div class="progress">
                    <div
                        class="progress-bar ${completedClass}"
                        style="width: ${course.progress}%">
                    </div>
                </div>

                <div class="course-actions">

                    <button
                        class="update-btn"
                        onclick="updateProgress(${course.id})">
                        ✏️ Update
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCourse(${course.id})">
                        🗑️
                    </button>

                </div>

            </div>
        `;


        courseGrid.appendChild(card);
    });
}


// ============================================
// UPDATE STATISTICS
// ============================================

function updateStats() {

    const inProgress =
        courses.filter(function (course) {
            return course.progress < 100;
        }).length;


    const completed =
        courses.filter(function (course) {
            return course.progress === 100;
        }).length;


    document.getElementById("stat-in-progress").textContent =
        inProgress;

    document.getElementById("stat-completed").textContent =
        completed;
}


// ============================================
// UPDATE COURSE PROGRESS
// ============================================

function updateProgress(id) {

    const course =
        courses.find(function (item) {
            return item.id === id;
        });


    if (!course) {
        return;
    }


    let newProgress = prompt(
        `Enter new progress for "${course.title}" (0-100):`,
        course.progress
    );


    if (newProgress === null) {
        return;
    }


    newProgress = parseInt(newProgress);


    if (
        isNaN(newProgress) ||
        newProgress < 0 ||
        newProgress > 100
    ) {

        alert("Please enter a number between 0 and 100.");

        return;
    }


    course.progress = newProgress;

    renderCourses();
    updateStats();
}


// ============================================
// DELETE COURSE
// ============================================

function deleteCourse(id) {

    const course =
        courses.find(function (item) {
            return item.id === id;
        });


    if (!course) {
        return;
    }


    const confirmed = confirm(
        `Are you sure you want to delete "${course.title}"?`
    );


    if (!confirmed) {
        return;
    }


    courses =
        courses.filter(function (item) {
            return item.id !== id;
        });


    renderCourses();
    updateStats();
}
