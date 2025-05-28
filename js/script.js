//   Sign  up   section 
let userName   = document.getElementById("userName");
let Email      = document.getElementById("signup-email");
let signupPw   = document.getElementById("signup-pw");
let Repassword = document.getElementById("Repassword");
let incorrectError = document.getElementById('incorrectError');
let incorrectPw    = document.getElementById("incorrectPw");
let isExistError   = document.getElementById("isExistError");
let userInfo;
if(localStorage.getItem('user') == null){     // to  check if local storage empty
    userInfo =[];
}
else { userInfo = JSON.parse(localStorage.getItem('user')); }

function signUP(event) {
     event.preventDefault();
    if (validationData()  && isExist() == false) {
        let user = {
            userName: userName.value,
            email: Email.value,
            password: signupPw.value,
            Repassword: Repassword.value,
        };
        userInfo.push(user);
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.alert("Sign up successful!");
        window.location.href = "login.html";
    } else {
        incorrectError.classList.replace("d-none", "d-block");
    }
}
function validationName(){   // to check name
    let regex = /^[A-Za-z]{3,20}$/
    if(regex.test(userName.value) == true && userName.value !== "" ){
        userName.classList.add("is-valid");
        return true;
    }
    else {
      userName.classList.add("is-invalid");
      incorrectError.classList.replace('d-none' , 'd-block')
      return false;
    }
}
function emailValidation(){      // to   check email
    let regex = /^\S+@\S+\.\S+$/
    if(regex.test(Email.value) == true & Email.value !== ""){
        Email.classList.add("is-valid")
        return true
    }
    else{
        Email.classList.add("is-invalid");
        incorrectError.classList.replace("d-none" , "d-block") 
        return false
    }
}
function passwordValidation(){    // to check password
    let regex = /.{8,15}$/
    if(regex.test(signupPw.value) == true & signupPw.value !== ""){
        signupPw.classList.add("is-valid")
        return true
    }
    else{
        signupPw.classList.add("is-invalid");
        incorrectPw.classList.replace("d-none" , "d-block") ;
        return false;
    }
}
function validationData() {
    let validName = validationName();
    let validEmail = emailValidation();
    let validPassword = passwordValidation();
    let matchPassword = Repassword.value === signupPw.value;

    if (validName && validEmail && validPassword && matchPassword) {
        return true;
    } else {
        return false;
    }
}
function isExist(){    //  to check if the email is already exist
     for(let i=0 ; i < userInfo.length ; i++){
        if(userInfo[i].email == Email.value){
            isExistError.classList.replace('d-none' , 'd-block');
            Email.classList.add('is-invalid');
            return true;
        }
     }
     return false;
}
//   Finish    Sign      UP      section 

//   Start    Sign      IN      section 
let loginEmail = document.getElementById('log-email');
let loginPw    = document.getElementById('log-pw');
let emptyError = document.getElementById('emptyError');
let loginError = document.getElementById('loginError');

function logIn(event){
event.preventDefault();                              // to prevent refresh caused by form 
if(loginEmail.value == "" || loginPw.value == ""){   // if user left any field empty
    emptyError.classList.replace('d-none' , 'd-block');
    return;
}
for(let i=0 ; i<userInfo.length ; i++){
    if(userInfo[i].email == loginEmail.value && userInfo[i].password == loginPw.value){
     window.location.href = "index.html";
    }
    else{
   loginError.classList.replace('d-none' , 'd-block')
    }
}
}
//   Finish    Sign      In      section 

//   Start    Home      IN      section 



