// scripts/app.js

// Initialize local storage for student records, schedules, and notes
const studentData = JSON.parse(localStorage.getItem('students')) || [];
const scheduleData = JSON.parse(localStorage.getItem('schedule')) || [];
const notesData = JSON.parse(localStorage.getItem('notes')) || [];

// Render student data
function renderStudents() {
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    studentData.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.paymentType}</td>
            <td>${student.date}</td>
            <td>${student.status ? "Paid" : "Unpaid"}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="removeStudent(${index})">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add new student
document.getElementById("add-student-btn").addEventListener("click", () => {
    const name = prompt("Enter student name:");
    const paymentType = prompt("Enter payment type (e.g., manual/book):");
    const date = new Date().toLocaleDateString();
    const status = confirm("Mark as Paid?");

    studentData.push({ name, paymentType, date, status });
    localStorage.setItem("students", JSON.stringify(studentData));
    renderStudents();
});

// Reset filters and re-render
document.getElementById("reset-filters-btn").addEventListener("click", () => {
    renderStudents();
});

// Export student list to PDF
document.getElementById("export-student-pdf").addEventListener("click", () => {
    const doc = new jsPDF();
    let content = "Student Records\n\n";
    studentData.forEach((student, index) => {
        content += `${index + 1}. ${student.name} - ${student.paymentType} - ${student.date} - ${student.status ? "Paid" : "Unpaid"}\n`;
    });
    doc.text(content, 10, 10);
    doc.save("students.pdf");
});

// Initialize the app
renderStudents();
// Render Class Schedule
function renderSchedule() {
    const tableBody = document.querySelector("#schedule-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    scheduleData.forEach((row, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.day}</td>
            <td>${row.course}</td>
            <td>${row.time}</td>
            <td>${row.venue}</td>
            <td>
                <button onclick="editSchedule(${index})">Edit</button>
                <button onclick="removeSchedule(${index})">Remove</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Add new schedule row
document.getElementById("add-schedule-row").addEventListener("click", () => {
    const day = prompt("Enter day:");
    const course = prompt("Enter course:");
    const time = prompt("Enter time:");
    const venue = prompt("Enter venue:");

    scheduleData.push({ day, course, time, venue });
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
    renderSchedule();
});

// Edit a schedule row
function editSchedule(index) {
    const row = scheduleData[index];
    const newDay = prompt("Edit day:", row.day);
    const newCourse = prompt("Edit course:", row.course);
    const newTime = prompt("Edit time:", row.time);
    const newVenue = prompt("Edit venue:", row.venue);

    scheduleData[index] = { day: newDay, course: newCourse, time: newTime, venue: newVenue };
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
    renderSchedule();
}

// Remove a schedule row
function removeSchedule(index) {
    scheduleData.splice(index, 1);
    localStorage.setItem("schedule", JSON.stringify(scheduleData));
    renderSchedule();
}

// Initialize the schedule section
renderSchedule();

// Render Notes
function renderNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = ""; // Clear existing notes

    notesData.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${note.content}
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="removeNote(${index})">Remove</button>
        `;
        notesList.appendChild(li);
    });
}

// Add new note
document.getElementById("add-note").addEventListener("click", () => {
    const content = prompt("Enter your note:");
    if (content) {
        notesData.push({ content });
        localStorage.setItem("notes", JSON.stringify(notesData));
        renderNotes();
    }
});

// Edit a note
function editNote(index) {
    const note = notesData[index];
    const newContent = prompt("Edit your note:", note.content);
    if (newContent) {
        notesData[index].content = newContent;
        localStorage.setItem("notes", JSON.stringify(notesData));
        renderNotes();
    }
}

// Remove a note
function removeNote(index) {
    notesData.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesData));
    renderNotes();
}

// Initialize the notes section
renderNotes();

// Handle Media Upload
const mediaUpload = document.getElementById("media-upload");
const mediaPreview = document.getElementById("media-preview");

mediaUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            mediaPreview.innerHTML = file.type.startsWith("image")
                ? `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; height: auto;">`
                : `<video controls style="max-width: 100%; height: auto;"><source src="${e.target.result}" type="${file.type}"></video>`;
        };
        reader.readAsDataURL(file);
    }
});

// Clear Media Preview
document.getElementById("clear-media").addEventListener("click", () => {
    mediaUpload.value = "";
    mediaPreview.innerHTML = "";
});
// Remove a student
function removeStudent(index) {
    if (index >= 0 && index < studentData.length) {
        studentData.splice(index, 1); // Remove the student at the given index
        localStorage.setItem("students", JSON.stringify(studentData)); // Update local storage
        renderStudents(); // Re-render the student table
    } else {
        console.error("Invalid index for deletion");
    }
}
// Render student data
function renderStudents() {
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    studentData.forEach((student, index) => {
        if (student) { // Ensure the student exists
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name || "Unnamed"}</td>
                <td>${student.paymentType || "Not Specified"}</td>
                <td>${student.date || "N/A"}</td>
                <td>${student.status ? "Paid" : "Unpaid"}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="removeStudent(${index})">Remove</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}