import { MoneyLender, Proprietor } from "../../bodyGard";
import { whichUser } from "./registration";

const emailInput = document.getElementById('email');
const logPass = document.getElementById('password');
const noteP = document.getElementById('notify');
const subBut = document.getElementById('submit');

subBut.addEventListener('click', ()=>{
    if(!emailInput){
        noteP.style.color = "red";
        noteP.textContent = 'Please Enter Email';
    } else if(!logPass){
        noteP.style.color = "red";
        noteP.textContent = 'Please Enter Password';
    } else{
        let loggedIn = false;
        logzSub(credentials);
        loggedIn = true;
        if(loggedIn){
            noteP.style.color = "green";
            noteP.textContent = 'Success!';
        }
    }
});


export async function logzGet(emailInput, logPass) {
    let credentials = [];

    emailInput.addEventListener('input', ()=>{
        if(emailInput.contains('@')){
            const email = emailInput.value;
        } else {
            noteP.style.color = "red";
            noteP.textContent = 'Please Enter a Valid Email';
        }
    });

    logPass.addEventListener('input', () => {
        const passwordInput = logPass.value;
    
        // Define password criteria
        const minLength = 8; // Minimum length
        const hasUppercase = /[A-Z]/; // At least one uppercase letter
        const hasLowercase = /[a-z]/; // At least one lowercase letter
        const hasNumber = /\d/; // At least one number
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    
        // Validate the password
        const isValidPassword =
            passwordInput.length >= minLength &&
            hasUppercase.test(passwordInput) &&
            hasLowercase.test(passwordInput) &&
            hasNumber.test(passwordInput) &&
            hasSpecialChar.test(passwordInput);
    
        // If valid, set the password
        if (isValidPassword) {
            const password = passwordInput;
            console.log('Password set:', password); // Optional: for debugging
        } else {
            noteP.style.color = "red";
            noteP.textContent = 'Password does not meet criteria.';
        }
    });
    

    credentials.push(email, password);
    return credentials;
}

export async function checkPassCode(pass) {
    return password;
}

export async function logzSub(arr) {
    const user = await whichUser(emailInput);
    const password = await checkPassCode(logPass);

    if(user===credentials[0] && password === credentials[1]){
       function getRegtype(email){
        return regType;
       }
       getRegtype(email);
    }
    switch(regType){
        case regType === Admin:
            window.location.href = "..\Hanging Gardens\Admin\dashboard.php";
        break;
        case regType === Customer:
            window.location.href = "..\Hanging Gardens\Customer\dashboard.php";
        break;
        case regType === Farmer:
            window.location.href = "..\Hanging Gardens\Farmer\dashboard.php";
        break;
        case regType === Landlord:
            window.location.href = "..\Hanging Gardens\Landlord\dashboard.php";
        break;
        case regType === Proprietor:
            window.location.href = "..\Hanging Gardens\Proprietor\dashboard.php";
        break;
        case regType === MoneyLender:
            window.location.href = "..\Hanging Gardens\MoneyLender\dashboard.php";
        break;
        case regType === Sacco:
            window.location.href = "..\Hanging Gardens\Sacco\dashboard.php";
        break;
        default:
            noteP.style.color = "green";
            noteP.textContent = 'Login Succesful';
    }
}