let students = [];

async function loadStudents() {

    try {

        const response = await fetch("/students");

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        students = await response.json();

        displayStudents(students);
        updateStats();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to Student API.");
    }
}


function displayStudents(data) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.department}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


function updateStats() {

    document.getElementById("totalStudents").textContent =
        students.length;

    const departments = new Set(
        students.map(student => student.department)
    );

    document.getElementById("totalDepartments").textContent =
        departments.size;
}


function searchStudents() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(search) ||

        student.email.toLowerCase().includes(search) ||

        student.department.toLowerCase().includes(search)
    );

    displayStudents(filtered);
}


function openAddModal() {

    document.getElementById("modalTitle").textContent =
        "Add Student";

    document.getElementById("studentId").value = "";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";

    document.getElementById("studentModal").style.display =
        "flex";
}


function closeModal() {

    document.getElementById("studentModal").style.display =
        "none";
}


async function saveStudent() {

    const id =
        document.getElementById("studentId").value;

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value
    };

    if (!student.name || !student.email || !student.department) {

        alert("Please fill all fields.");

        return;
    }

    try {

        let response;

        if (id) {

            response = await fetch(`/students/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });

        } else {

            response = await fetch("/students", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(student)
            });
        }

        if (!response.ok) {

            throw new Error("Failed to save student");
        }

        closeModal();

        await loadStudents();

    } catch (error) {

        console.error(error);

        alert("Could not save student.");
    }
}


function editStudent(id) {

    const student =
        students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("modalTitle").textContent =
        "Edit Student";

    document.getElementById("studentId").value =
        student.id;

    document.getElementById("name").value =
        student.name;

    document.getElementById("email").value =
        student.email;

    document.getElementById("department").value =
        student.department;

    document.getElementById("studentModal").style.display =
        "flex";
}


async function deleteStudent(id) {

    const confirmed =
        confirm("Are you sure you want to delete this student?");

    if (!confirmed) return;

    try {

        const response =
            await fetch(`/students/${id}`, {

                method: "DELETE"
            });

        if (!response.ok) {

            throw new Error("Delete failed");
        }

        await loadStudents();

    } catch (error) {

        console.error(error);

        alert("Could not delete student.");
    }
}


window.onclick = function(event) {

    const modal =
        document.getElementById("studentModal");

    if (event.target === modal) {

        closeModal();
    }
};


loadStudents();