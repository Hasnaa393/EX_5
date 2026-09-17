function getStudent(id) {
  let student = { id: id };

  registerFormInputs.forEach(function (registerInput) {
    let key = registerInput.name,
      value = registerInput.value;

    student[key] = value;
  });

  return student;
}


function addStudent() {
  let focusInput = registerForm.querySelector("input:focus"),
    falseInput = registerForm.querySelector("input[data-valid='false']");

  focusInput?.blur();

  let invalidInput = registerForm.querySelector("input.is-invalid");

  if (invalidInput !== null || falseInput !== null) {
    return;
  }

  let student = getStudent(++id);

  students.push(student);

  updateLocalStorage();

  showStudent(student);

  isNoData(students);

  resetForm();
}


function showStudent(student) {
  tableBody.innerHTML += `
                <tr data-student-id="${student.id}">
                    <th>${student.id}</th>
                        <td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td>${student.email}</td>
                        <td>${student.age}</td>
                        <td>${student.phone}</td>
                        <td>
                            <div class="buttons">
                                <button class="btn btn-info text-light me-2" onclick="insertEditStudentIntoForm(${student.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteStudent(${student.id},this)">Delete</button>
                            </div>
                        </td>
                </tr>
    `;
}


function checkInput(input) {
  let inputName = input.name,
    inputValue = input.value,
    isEmpty = inputValue === "",
    errorEle = document.querySelector(
      `p.alert[data-error-name="${inputName}"]`,
    ),
    isInValid = !regexInputs[inputName].test(inputValue),
    errorMsg = "";

  if (isEmpty) {
    errorMsg = "this field is required.";
  } else if (isInValid) {
    errorMsg = "Invalid Field";
  }

  if (isEmpty || isInValid) {

    input.classList.add("is-invalid");
    errorEle.classList.remove("d-none");
    input.classList.remove("is-valid");
    errorEle.textContent = errorMsg;
    input.dataset.valid = false;

  } else {

    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorEle.classList.add("d-none");
    input.dataset.valid = true;

  }
}


function resetForm() {
  registerForm.reset();

  registerFormInputs.forEach(function (input) {
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");

    let errorEle = document.querySelector(
      `p.alert[data-error-name="${input.name}"]`
    );

    if(errorEle) errorEle.classList.add("d-none");
  });

  let formBtn = registerForm.querySelector("button");

  formBtn.textContent = "Add";

  formBtn.classList.remove("btn-info", "text-light");

  formBtn.classList.add("btn-success");

  registerForm.setAttribute("data-type", "add");

  cancelEditIcon.style.display="none";
}


function updateLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}


function showStudents(data) {
  tableBody.innerHTML = `
     <tr>
            <td id="TableAlert" class="table-warning text-center" colspan="7">
                     There are no data
                </td>
        </tr>
    `;

  data.forEach(function (student) {
    showStudent(student);
  });

  isNoData(data);
}


function getStudentIndex(id) {
  return students.findIndex((student) => student.id == id);
}


function deleteStudent(id, that) {

  if (registerForm.dataset.type === "edit") {
    return;
  }

  if (!confirm("Are you sure?")) {
    return;
  }

  let studentIndex = getStudentIndex(id), 
    trEle = that.closest("tr");

  students.splice(studentIndex, 1);

  trEle.remove();

  updateLocalStorage();

  isNoData(students);
}


function isNoData(data) {
  let tableAlert = document.querySelector("#TableAlert");

  if (data.length == 0) {
    tableAlert.classList.remove("d-none");
  } else {
    tableAlert.classList.add("d-none");
  }
}


function insertEditStudentIntoForm(id) {
  resetForm();

  let editStudent = students.find(function (student) {
      return student.id == id;
    }),
    formBtn = registerForm.querySelector("button");

  for (let input of registerFormInputs) {
    input.value = editStudent[input.name];
  }

  formBtn.textContent = "Edit";

  formBtn.classList.add("btn-info", "text-light");

  formBtn.classList.remove("btn-success");
  
  registerForm.setAttribute("data-type", "edit");

  registerForm.setAttribute("data-student-id", id);

  cancelEditIcon.style.display="inline-block";
}


function editStudent() {
  let studentId = registerForm.dataset.studentId,
    student = getStudent(studentId),
    studentIndex = getStudentIndex(studentId),
    trEle = tableBody.querySelector(`tr[data-student-id="${studentId}"]`);

  trEle.innerHTML = `
           <th>${student.id}</th>
        <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age}</td>
            <td>${student.phone}</td>
            <td>
                <div class="buttons">
                    <button class="btn btn-info text-light me-2" onclick="insertEditStudentIntoForm(${student.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id},this)">Delete</button>
                        </div>
        </td>
       
       
       `;

  students[studentIndex] = student;

  updateLocalStorage();

  resetForm();
}


function search(searchValue) {
  let filteredStudents = students.filter(function (student) {
    return (
      student.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.age.toLowerCase().includes(searchValue.toLowerCase()) ||
      student.phone.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  showStudents(filteredStudents);
}


function cancelEditing()
{
  resetForm();
}