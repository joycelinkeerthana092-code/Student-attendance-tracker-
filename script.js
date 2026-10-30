const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");
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
    
    // Numbers clear panna headers setup
    let html = "<table>" +
        "<tr>" +
            "<th>Roll No.</th>" +
            "<th>Name</th>" +
            "<th>Record (Present)</th>" +
            "<th>Record (Absent)</th>" +
            "<th>Attendance Report</th>" +
            "<th>Mark Attendance</th>" +
            "<th>Action</th>" +
        "</tr>";
        
    students.forEach((student, index) => {
        const pct = percentage(student);
        const lowText = pct < 75 ? " (Low)" : "";
        const reportStyle = pct < 75 ? "color: #e74c3c; font-weight: bold;" : "color: #333; font-weight: normal;";
        
        html += "<tr>" +
            "<td>" + student.roll + "</td>" +
            "<td>" + student.name + "</td>" +
            "<td>" + student.present + "</td>" +
            "<td>" + student.absent + "</td>" +
            "<td style='" + reportStyle + "'>" + pct.toFixed(1) + "%" + lowText + "</td>" +
            "<td>" +
                "<button class='btn-present' onclick='window.mark(" + index + ", \"present\")'>Present</button>" +
                "<button class='btn-absent' onclick='window.mark(" + index + ", \"absent\")'>Absent</button>" +
            "</td>" +
            "<td>" +
                "<button class='btn-delete' onclick='window.deleteStudent(" + index + ")'>Delete</button>" +
            "</td>" +
        "</tr>";
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
    if (confirm("Are you sure you want to delete " + students[index].name + "?")) {
        students.splice(index, 1);
        save();
        render();
        message.style.color = "orange";
        message.textContent = "Student removed.";
        setTimeout(() => { message.textContent = ""; }, 3000);
    }
}

resetBtn.addEventListener("click", () => {
    if (confirm("Muzhu attendance data-vaiyum reset seiya virumbugirீர்களா?")) {
        students = [];
        save();
        render();
        message.style.color = "red";
        message.textContent = "All student data cleared.";
        setTimeout(() => { message.textContent = ""; }, 3000);
    }
});

render();
