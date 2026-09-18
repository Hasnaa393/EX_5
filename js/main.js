let registerForm = document.querySelector("#Register form"),
  registerFormInputs = registerForm.querySelectorAll("input"),
  students = [],
  id = 0,
  tableBody = document.querySelector("#Data tbody"),
  regexInputs = {
    firstName: /^[A-Za-z]+$/,
    lastName: /^[A-Za-z]+$/,
    email: /^[A-Za-z_][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|org)$/,
    age: /^[0-9]{2}$/,
    phone: /^(02)?01(0|1|2|5)[0-9]{8}$/,
  },
  SearchInput=document.querySelector("#searchInput"),
  cancelEditIcon=registerForm.querySelector(".fa-rotate-left");
 
    cancelEditIcon.style.display='none';

if (localStorage.getItem("students") === null) {
  updateLocalStorage();
} else {
  students = JSON.parse(localStorage.getItem("students"));
  id = students[students.length - 1]?.id ?? 0; // to complete Numbering of every student of array
  showStudents(students);
}


registerForm.addEventListener("submit", function (e) {
  

  e.preventDefault(); 

  let formType=registerForm.getAttribute('data-type');

  if(formType =='add')
  {
       addStudent();
    
  }
  else if(formType =='edit')
 {
    editStudent();
 }
 
 }); 

cancelEditIcon.addEventListener("click",function(){
  resetForm();
});
SearchInput.addEventListener("keyup",function(){

    search(this.value);
});