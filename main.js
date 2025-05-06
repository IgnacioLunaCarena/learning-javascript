let usersSaved = JSON.parse(localStorage.getItem("users")) || [];
let reservationsSaved = JSON.parse(localStorage.getItem("reservations")) || [];

//LOGIN VARIABLES
let email;
let password;
let userLogged = {};

//REGISTER VARIABLES
let newEmail
let newUsername
let newPassword
let repeatNewPassword

//LOGIN DOM REFERENCE
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let loginText = document.getElementById("loginText");
const loginBtn = document.getElementById("loginBtn");
const toRegisterBtn = document.getElementById("toRegisterBtn");

//REGISTER DOM REFERENCE
let inputNewEmail = document.getElementById("newEmail");
let inputNewUsername = document.getElementById("newUsername");
let inputNewPassword = document.getElementById("newPassword");
let inputRepeatNewPassword = document.getElementById("repeatNewPassword");
let registerText = document.getElementById("registerText");
const registerBtn = document.getElementById("registerBtn");
const toLoginBtn = document.getElementById("toLoginBtn");

//LOGGED DOM REFERENCE
let welcomeText = document.getElementById("welcomeText");
let loggedText = document.getElementById("loggedText");
const reserveForm = document.getElementById("reserveForm");
const reserveBtn = document.getElementById("reserveBtn");
const logOffBtn = document.getElementById("logOffBtn");
const dateSelector = document.getElementById("dateSelector");
const hourSelector = document.getElementById("hourSelector");

//CALENDAR
const calendarPicker = flatpickr(dateSelector, {
  enableTime: false,        
  dateFormat: "d-m-y",
  minDate: "today",        
});

//HOUR
const hourPicker = flatpickr(hourSelector, {
  noCalendar: true,
  enableTime: true,        
  dateFormat: "H:i",
  time_24hr: true          
});

//DINAMIC PANEL FUNCTION
function showSection(sectionToShow) {
  const sections = ["loginSection", "registerSection", "loggedSection"];
  sections.forEach((section) => {
    const elem = document.getElementById(section);
    if (section === sectionToShow) {
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
    }
  });
}

//LOGIN EVENTS
inputEmail.addEventListener("input", (e)=>{
  email = e.target.value;
});
inputPassword.addEventListener("input", (e)=>{
  password = e.target.value;
});
loginBtn.addEventListener("click", ()=>{
  if (!email || !password){
    loginText.classList.remove("opacity-0");
    loginText.textContent = "Hay campos incompletos"
    return;
  }

  let foundUser = usersSaved.find(user => user.email.toUpperCase() === email.toUpperCase());
  
  if (foundUser === undefined){
    loginText.classList.remove("opacity-0");
    loginText.textContent = "Usuario inexistente";
    return;
  }
  if (foundUser.password !== password){
    loginText.classList.remove("opacity-0");
    loginText.textContent = "Contraseña incorrecta";
    return;
  }

  userLogged = foundUser;
  welcomeText.textContent = `Bienvenido ${userLogged.username}`;
  loginText.classList.add("opacity-0");
  showSection("loggedSection");
});
toRegisterBtn.addEventListener("click", ()=>{
  loginText.classList.add("opacity-0");
  showSection("registerSection");
});

//REGISTER EVENTS
inputNewEmail.addEventListener("input", (e)=>{
  newEmail = e.target.value;
});
inputNewUsername.addEventListener("input", (e)=>{
  newUsername = e.target.value;
});
inputNewPassword.addEventListener("input", (e)=>{
  newPassword = e.target.value;
});
inputRepeatNewPassword.addEventListener("input", (e)=>{
  repeatNewPassword = e.target.value;
});
registerBtn.addEventListener("click", ()=>{
  if (!newEmail || !newUsername || !newPassword || !repeatNewPassword){
    registerText.classList.remove("opacity-0");
    registerText.textContent = "Hay campos incompletos"
    return;
  } 
  
  let foundUser = usersSaved.find(user => user.email.toUpperCase() === newEmail.toUpperCase());

  if (foundUser !== undefined){
    registerText.classList.remove("opacity-0");
    registerText.textContent = "Ese correo ya se encuentra registrado";
    return;
  }
  if(newPassword !== repeatNewPassword){
    registerText.classList.remove("opacity-0");
    registerText.textContent = "Las contraseñas no coinciden";
    return;
  }

  usersSaved.push(
    {email: newEmail, username: newUsername, password: newPassword}
  );
  localStorage.setItem("users", JSON.stringify(usersSaved));
  registerText.textContent = "Usuario creado";
});
toLoginBtn.addEventListener("click", ()=>{
  registerText.classList.add("opacity-0");
  showSection("loginSection");
});

//LOGGED EVENTS
reserveForm.addEventListener("submit", (e)=>{
  e.preventDefault();

  const reservedDate = document.getElementById("dateSelector").value;
  const reservedHour = document.getElementById("hourSelector").value;
  const reservedService = document.getElementById("serviceSelector").value;
  const reservedBarber = document.getElementById("barberSelector").value;

  if (!reservedDate || !reservedHour || !reservedService || !reservedBarber){
    loggedText.textContent = "Hay campos incompletos";
  }

  reservationsSaved.push(
    {date: reservedDate, hour: reservedHour, service: reservedService, barber: reservedBarber}
  );
  localStorage.setItem("reservations", JSON.stringify(reservationsSaved));
  loggedText.classList.remove("opacity-0");
  loggedText.textContent = "Turno reservado con exito";
})
logOffBtn.addEventListener("click", ()=>{
  userLogged = {};
  calendarPicker.clear();
  hourPicker.clear();
  loggedText.classList.add("opacity-0");
  showSection("loginSection");
})