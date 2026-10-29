script.js

const form document.getElementById("student Form"); const list document.getElementById("studentList"); const message document.getElementById("message");

let students JSON.parse( localStorage.getItem("attendanceStudents") || "1"

localStorage.setItem("attendanceStudents", JSON.stringify(students));

function save() {

function percentage (student) ( const total student.present student.absent; return total070 (student.present/total) 100;

function render() (

document.getElementById("total") textContent students. length, const present students.reduce((sum, student) const absent students.reduce((su student present, 0); student) student.absent. 0); tent absent document.getElementById("present").textContent present; document.getElementById("absent")

const totalSessions present absent; const rate totalSessions? Math.round((present totalSessions) 100) 0: document.getElementById("rate").textContent ate":

(students.length List.textContent "No students added yet.":

let html crable><tr><th>Roll </th><th>Name</th><th>Present</th> Ch>Action</th></tr>"; <th>Absent</th><th>Attendance

students.forEach((student, Index) const pct percentage (student); (

html + <tr> <td>$(escapehtel(student.roll))</td> <td>$(escapehtel(student.name))</td> <td>$(student.present)</td> <td>$(student.absent)</td> <td>${pct.toFixed(1))%${pct 75?" (Low)</td> <button onclick="sark($(index), 'present')">Present</button> click="wark($(index), 'absent')">Absent</but </td>

</tr>

list.innerHTML htel+ "</table>";

function escapeHtel (value) {

return String(value).replace(/[&]/g. (char) > ( "&gt;", "&quot;", }[char]));

fore, addEventListener("submit", (event) event.preventDefault(). nase document.getElementById("studentName").value.trim(); const roll document.getElementById("rollNo").value.trim(); if (Iname || froll) return;

const duplicate students.some( (student) student.roll.toLowerCase() roll.toLowerCase()

if (duplicate) (

message, textContent "That roll number already exists.": eturn;

students.push((name, roll, present: 0, absent: 0)); save();

render();

form.reset() message.textContent "Student added.";

Student Attendance Tracker Source Code Page 3

function mark(index, status) (

}

if (status "present") students[index].present++; else students[index].absent++; save(); render();

render();
