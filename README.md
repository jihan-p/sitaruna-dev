# SITARUNA: Integrated Academic and Cadet Information System for SMKN 2 Subang

This repository contains the source code and assets related to the development of **SITARUNA** (*Sistem Informasi Terpadu Akademik Ketarunaan* - Integrated Academic and Cadet Information System), specifically designed for the needs of **SMKN 2 Subang Vocational High School**.

## Project Goal
The SITARUNA project aims to integrate and digitize various critical processes and data at SMKN 2 Subang into one integrated platform. Its primary focus is on managing academic information and the cadet (ketarunaan) aspects of the students.

## Core Feature Scope

The system includes key implemented modules, such as:

### 1. Master Data Management
* **User Management:** Management of Users, Roles, and Permissions.
* **Academic Data Management:** Academic Year, Semester, Majors, Classes, Subjects (Activities), and Time Slots Management.
* **Personnel (PTK) and Student Data Management:** Including data import functionality.
* **Class Group (Enrollments) Management** per semester.
* **Modernized CRUD Workflow:** Utilizes integrated *form modals* for improved user experience.

### 2. Cadet (Ketarunaan) Management
* **Cadet Achievement Recording:** Input of achievement data complete with point details, date, and evidence upload.
* **Cadet Violation Recording:** Input of violation data, covering category, points, time of incident, and evidence upload. Supports recording multiple types of violations in a single incident.
* **Point Management:** Automatic calculation and update of total achievement and violation points for each student.
* **Filtering & Search:** Data filter feature based on class and specific search for easy monitoring.
* Management of Achievement Types and Violation Types as master data.

### 
### 3. Schedule & Agenda Management
* CRUD (Create, Read, Update, Delete) for class schedules per active semester.
* Bulk schedule import feature from Excel files with data validation and conflict handling.
* Schedule search filter based on day, class, major, and keywords.

### 4. Teaching Agenda (Teacher's Journal)
* Daily teaching agenda entry by teachers based on the predetermined schedule.
* **Ownership-Based Authorization:** Only the concerned teacher or admin can fill/edit the agenda.
* **Block Time Grouping:** Consecutive teaching hours (block hours) for the same teacher, class, and subject are automatically merged.
* **Detailed Recording:** Includes discussion material, student attendance, class cleanliness notes, and Quran memorization recap (juz, surah, verse).

### 5. Recapitulation & Homeroom Teacher (Wali Kelas) Management
* **Homeroom Teacher Dashboard:** A dedicated page for homeroom teachers to monitor the list of students in their class.
* **Class Agenda Recap:** Homeroom teachers can view the teaching agenda recap (teacher's journal) for their class, showing "Filled" and "Not Filled" statuses within a specific date range.
* **Student Attendance Recap:** Homeroom teachers can view the attendance recapitulation (Present, Sick, Permit, Absent/Alpha) for each student in their class over a certain period.
* **PDF Export:** Feature to export the class agenda recapitulation into PDF format.
* **Flexible Access:** Admins or users with special access rights can view homeroom data for all classes.

### 6. Website & Public Page Management
* **Dynamic Content:** Management for News, Event Agenda, and Sliders on the main page.
* **Static Pages:** Content management for informative pages such as School Profile and Contact.
* **Concentrations of Expertise:** A dedicated page displaying the list of available majors and expertise fields at the school.
* **Gallery:** Module to manage and display photo and video galleries of school activities.

### 7. Authentication & Profile System
* Login, registration, email verification, and "Forgot Password" functionality via email.
* User profile management (change profile, change password, delete account).

## Expected Benefits
* **Administrative Efficiency:** Increased efficiency and accuracy in managing academic and cadet data.
* **Information Access:** Simplified access to centralized information for students, teachers, staff, and management.
* **Data-Driven Decision Making:** Supports decision-making processes based on accurate and real-time data.
* **Character Building:** Strengthens student character building and discipline through transparent monitoring of achievement and violation points.
* **Digital Integration:** Creates an integrated and modern digital environment at SMKN 2 Subang.

## Project Status
The project has reached a solid functional stage. The core modules for master data management, cadet management, scheduling, teacher's agenda, and homeroom recapitulation have been successfully implemented. Further development will focus on feature refinement, performance optimization, and the addition of new modules based on school needs, such as grade management and more in-depth reporting.