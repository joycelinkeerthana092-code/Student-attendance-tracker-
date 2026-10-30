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
    
    // Create element tables directly without using template strings layout arrays
    list.innerHTML = ""; 
    const table = document.createElement("table");
    
    // Table Header Structure Creation
    const headerRow = document.createElement("tr");
    const headers = ["Roll No.", "Name", "5.4 Records (Present)", "5.4 Records (Absent)", "5.5 Attendance Report", "5.3 Mark Attendance", "Action"];
    headers.forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    // Dynamic Table Rows Implementation
    students.forEach((student, index) => {
        const pct = percentage(student);
        const tr = document.createElement("tr");
        
        const tdRoll = document.createElement("td");
        tdRoll.textContent = student.roll;
        
        const tdName = document.createElement("td");
        tdName.textContent = student.name;
        
        const tdPresent = document.createElement("td");
        tdPresent.textContent = student.present;
        
        const tdAbsent = document.createElement("td");
        tdAbsent.textContent = student.absent;
        
        const tdReport = document.createElement("td");
        tdReport.textContent = pct.toFixed(1) + "%" + (pct < 75 ? " (Low)" : "");
        if (pct < 75) {
            tdReport.style.color = "#e74c3c";
            tdReport.style.fontWeight = "bold";
        } else {
            tdReport.style.color = "#333";
        }
        
        // Mark Attendance Controller Buttons Setup
        const tdMark = document.createElement("td");
        const btnPres = document.createElement("button");
        btnPres.className = "btn-present";
        btnPres.textContent = "Present";
        btnPres.onclick = function() { window.mark(index, "present"); };
        
        const btnAbs = document.createElement("button");
        btnAbs.className = "btn-absent";
        btnAbs.textContent = "Absent";
        btnAbs.onclick = function() { window.mark(index, "absent"); };
        
        tdMark.appendChild(btnPres);
        tdMark.appendChild(btnAbs);
        
        // Delete Single Row Action Setup
        const tdDelete = document.createElement("td");
        const btnDel = document.createElement("button");
        btnDel.className = "btn-delete";
        btnDel.textContent = "Delete";
        btnDel.onclick = function() { window.deleteStudent(index); };
        tdDelete.appendChild(btnDel);
        
        // Append all grid parameters to active rows
        tr.appendChild(tdRoll);
        tr.appendChild(tdName);
        tr.appendChild(tdPresent);
        tr.appendChild(tdAbsent);
        tr.appendChild(tdReport);
        tr.appendChild(tdMark);
        tr.appendChild(tdDelete);
        
        table.appendChild(tr);
    });
    
    list.appendChild(table);
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
