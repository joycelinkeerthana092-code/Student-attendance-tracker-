# Student Attendance Tracker

A modern, light-weight, and responsive web-based application designed to track and manage student attendance records efficiently. Built using pure **HTML5, CSS3, and JavaScript (ES6+)** with localized persistence.

## 🚀 Key Project Modules & Structures

The application is structured into the following dedicated functional components (tabs):

### 5.1 Home / Dashboard
* Displays high-level overview metrics in real-time.
* Features distinct telemetry counter cards for:
  * **Total Students Registered**
  * **Cumulative Present Sessions**
  * **Cumulative Absent Sessions**
  * **Net Attendance Rate (%)**

### 5.2 Student List (Registration Panel)
* Provides a dynamic entry interface to enroll new students using their Name and unique Roll Number.
* Validates user entries against empty inputs and strictly prevents duplicate Roll Number records.
* Includes a global **Reset All Data** mechanism to purge system states when a new term begins.

### 5.3 Mark Attendance
* Generates an interactive roster workflow setup.
* Features clean color-coded quick buttons:
  * **Present (Green)**: Increments the selected student's daily active sessions.
  * **Absent (Red)**: Increments the inactive metrics.

### 5.4 Attendance Records
* Represents a digital register sheet tracking numeric tallies for each student.
* Features modular row-level control setups allowing administrators to safely remove individual student data using a **Delete** action prompt.

### 5.5 Attendance Report (Analytics Engine)
* Calculates and dynamically prints current percentage values down to one decimal place (`(Present / Total) * 100`).
* Employs real-time risk compliance alerts:
  * ⚠️ **Low Attendance Alert (Red Text)**: Automatically flags records dropping strictly below the standard **75% threshold**.
  * ✅ **Safe Status (Green Text)**: Displays confidence states for students clearing criteria margins.

---

## 🛠️ Tech Stack & Concepts Used
* **Frontend UI Structure**: Semantic HTML5 tags.
* **Layout Design & Responsiveness**: Modern CSS Grid, Flexbox architectures, and media boundary overflows for seamless screen transitions on mobile views.
* **Core Application Logic**: Vanilla JavaScript DOM manipulation, Array methods (`reduce()`, `some()`), and functional modular scopes.
* **Data Storage Layer**: Browser-native **LocalStorage APIs** ensuring structural state retention across browser closing actions and accidental refreshes.
