const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
const message = document.getElementById("message");

let students = JSON.parse(localStorage.getItem("attendanceStudents") || "[]");

function save() {
    localStorage.setItem("attendanceStudents", JSON.stringify(students));
}

function percentage(student) {
    const total = student.present + student.absent;
    if (total === 0) return 0;
    return (student.present / total) * 100;
}

function render() {
    document.getElementById("total").textContent = students.length;
    const present = students.reduce((sum, student) => sum + student.present, 0);
    const absent = students.reduce((sum, student) => sum + student.absent, 0);
    document.getElementById("present").textContent = present;
    document.getElementById("absent").textContent = absent;
    
    const totalSessions = present + absent;
    const rate = totalSessions ? Math.round((present / totalSessions) * 100) : 0;
    document.getElementById("rate").textContent = rate + "%";
    
    if (students.length === 0) {
        list.textContent = "No students added yet.";
        return;
    }
    
    let html = "<table><tr><th>Roll No.</th><th>Name</th><th>Present</th><th>Absent</th><th>Attendance</th><th>Action</th></tr>";
    students.forEach((student, index) => {
        const pct = percentage(student);
        // HTML inline click-la window.mark-nu direct-ah reference panrom
        html += `<tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.present}</td>
            <td>${student.absent}</td>
            <td>${pct.toFixed(1)}%${pct < 75 ? " (Low)" : ""}</td>
            <td>
                <button onclick="window.mark(${index}, 'present')">Present</button>
                <button onclick="window.mark(${index}, 'absent')">Absent</button>
            </td>
        </tr>`;
    });
    list.innerHTML = html + "</table>";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNo").value.trim();
    
    if (!name || !roll) return;
    
    const duplicate = students.some(student => student.roll.toLowerCase() === roll.toLowerCase());
    if (duplicate) {
        message.style.color = "red";
        message.textContent = "That roll number already exists.";
        return;
    }
    
    students.push({ name: name, roll: roll, present: 0, absent: 0 });
    save();
    render();
    form.reset();
    message.style.color = "green";
    message.textContent = "Student added successfully.";
    
    // 3 seconds-ku apram message-ah clear panna:
    setTimeout(() => { message.textContent = ""; }, 3000);
});

// MUKHIYAM: Function-ah global window state-ku explicitly exposed panrom
window.mark = function(index, status) {
    if (status === "present") {
        students[index].present++;
    } else {
        students[index].absent++;
    }
    save();
    render();
}

// Initial render call
render();
