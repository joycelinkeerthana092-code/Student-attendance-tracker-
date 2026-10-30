const form = document.getElementById("studentForm");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetAllBtn");

let students = JSON.parse(localStorage.getItem("attendanceStudents") || "[]");

function save() {
    localStorage.setItem("attendanceStudents", JSON.stringify(students));
}

function percentage(student) {
    const total = student.present + student.absent;
    if (total === 0) return 0;
    return (student.present / total) * 100;
}

// 🌐 Puthiya Tab Switching Logic Function
window.switchTab = function(tabId) {
    // Ellaa section-galyum hidden panrom
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });
    // Click panna section-ah mattum active panrom
    document.getElementById(tabId).classList.add('active');

    // Nav bar active highlights setting
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function render() {
    // 5.1 Dashboard updates
    document.getElementById("total").textContent = students.length;
    const present = students.reduce((sum, student) => sum + student.present, 0);
    const absent = students.reduce((sum, student) => sum + student.absent, 0);
    document.getElementById("present").textContent = present;
    document.getElementById("absent").textContent = absent;
    
    const totalSessions = present + absent;
    const rate = totalSessions ? Math.round((present / totalSessions) * 100) : 0;
    document.getElementById("rate").textContent = rate + "%";
    
    if (students.length === 0) {
        const noDataMsg = "No students added yet.";
        document.getElementById("simpleStudentList").textContent = noDataMsg;
        document.getElementById("markAttendanceList").textContent = noDataMsg;
        document.getElementById("recordsList").textContent = noDataMsg;
        document.getElementById("reportList").textContent = noDataMsg;
        return;
    }
    
    // 5.2 Render Pure Student Names List
    let listHtml = "<ul>";
    students.forEach(s => listHtml += `<li><strong>${s.roll}</strong> - ${s.name}</li>`);
    document.getElementById("simpleStudentList").innerHTML = listHtml + "</ul>";

    // 5.3 Render Mark Attendance Controller Grid
    let markHtml = "<table><tr><th>Roll No.</th><th>Name</th><th>Mark Status</th></tr>";
    students.forEach((student, index) => {
        markHtml += `<tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>
                <button class="btn-present" onclick="window.mark(${index}, 'present')">Present</button>
                <button class="btn-absent" onclick="window.mark(${index}, 'absent')">Absent</button>
            </td>
        </tr>`;
    });
    document.getElementById("markAttendanceList").innerHTML = markHtml + "</table>";

    // 5.4 Render Attendance Records Sheet
    let recordsHtml = "<table><tr><th>Roll No.</th><th>Name</th><th>Total Present</th><th>Total Absent</th><th>Action</th></tr>";
    students.forEach((student, index) => {
        recordsHtml += `<tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.present} Sessions</td>
            <td>${student.absent} Sessions</td>
            <td><button class="btn-delete" onclick="window.deleteStudent(${index})">Delete Student</button></td>
        </tr>`;
    });
    document.getElementById("recordsList").innerHTML = recordsHtml + "</table>";

    // 5.5 Render Analytics Report Card
    let reportHtml = "<table><tr><th>Roll No.</th><th>Name</th><th>Final Percentage</th><th>Status Report</th></tr>";
    students.forEach((student) => {
        const pct = percentage(student);
        reportHtml += `<tr>
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${pct.toFixed(1)}%</td>
            <td style="color: ${pct < 75 ? '#e74c3c' : '#2ecc71'}; font-weight: bold;">
                ${pct < 75 ? "⚠️ Low Attendance Alert" : "✅ Safe Status"}
            </td>
        </tr>`;
    });
    document.getElementById("reportList").innerHTML = reportHtml + "</table>";
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
    setTimeout(() => { message.textContent = ""; }, 3000);
});

window.mark = function(index, status) {
    if (status === "present") {
        students[index].present++;
    } else {
        students[index].absent++;
    }
    save();
    render();
}

window.deleteStudent = function(index) {
    if (confirm(`Are you sure you want to delete ${students[index].name}?`)) {
        students.splice(index, 1);
        save();
        render();
    }
}

resetBtn.addEventListener("click", () => {
    if (confirm("Muzhu attendance data-vaiyum reset seiya virumbugirீர்களா?")) {
        students = [];
        save();
        render();
    }
});

render();
