document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way


    // Get form values
    // const fName = document.getElementById('fName').value.trim();
    // const lName = document.getElementById('lName').value.trim();

    let submitBtn = document.getElementById('submitBtn')



    function isLogin(){

   
          if(validateEmail() == true && validatePassword()== true)
            {
            localStorage.setItem('signupEmail', email.value);
            localStorage.setItem('signupPassword', password.value);


            displayMessage('Sign-up successful. You can now log in.', 'green');
            displayLoginLink();

          }
         else{
            displayMessage('Invalid sign up', 'red');
           

         }
        };
    submitBtn.addEventListener('click', isLogin);

    
    function displayMessage(message, color) {
        const messageElement = document.getElementById('signupMessage');
        messageElement.textContent = message;
        messageElement.style.color = color;
    }
});




// name
function validateNames() {
    const nameInputs = document.querySelectorAll('.sName');
    const nameAlert = document.getElementById('nameAlert');
    const regex = /^[A-Z][a-z]+$/;

    let isValid = true;

    nameInputs.forEach(input => {
        if (!regex.test(input.value)) {
            isValid = false;
        }
    });

    // Show or hide the alert box
    if (isValid) {
        nameAlert.classList.add('d-none');
    } else {
        nameAlert.classList.remove('d-none');
    }

    return isValid;
}
document.querySelectorAll('.sName').forEach(input => {
    input.addEventListener('input', validateNames);
});

// email
function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.getElementById("email").value;
    const emailAlert = document.getElementById("emailAlert");

    if (regex.test(email)) {
        emailAlert.classList.add('d-none');
        return true;
    } else {
        emailAlert.classList.remove('d-none');
        return false;
    }
}

document.getElementById('email').addEventListener('input', validateEmail);
//passwor validation
function validatePassword() {
    const passwordValue = document.getElementById("password").value.trim();
    const passwordAlert = document.getElementById("passwordAlert");
    const regex = /^(?=.*[A-Z]).{5,20}$/;

    if (regex.test(passwordValue)) {


        passwordAlert.classList.add('d-none');
        return true;

    }
    else {


        passwordAlert.classList.remove('d-none')
        return false;
    }

}
document.getElementById('password').addEventListener('input', validatePassword);








function validateConfirmPassword() {
    const passwordValue = document.getElementById("password").value.trim();
    const confirmPasswordValue = document.getElementById("confirmPassword").value.trim();
    const confirmPasswordAlert = document.getElementById("confirmPasswordAlert");

    if (passwordValue === confirmPasswordValue) {
        confirmPasswordAlert.classList.add('d-none');
        return true;
    } else {
        confirmPasswordAlert.classList.remove('d-none');
        return false;
    }
}

document.getElementById('confirmPassword').addEventListener('input', validateConfirmPassword);

//password toggle

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    // Toggle password visibility
    togglePasswordIcon.addEventListener('click', togglePasswordVisibility);

    passwordInput.addEventListener('input', validatePassword);

    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordIcon.classList.remove('fa-eye-slash');
            togglePasswordIcon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            togglePasswordIcon.classList.remove('fa-eye');
            togglePasswordIcon.classList.add('fa-eye-slash');
        }
    }


});




function displayLoginLink() {
    const messageElement = document.getElementById('signupMessage');

    // Check if the login link already exists
    if (!document.getElementById('loginLink')) {
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.id = 'loginLink';
        loginLink.textContent = ' Go to login page';
        loginLink.style.color = 'blue';
        loginLink.style.textDecoration = 'underline';
        messageElement.appendChild(loginLink);
    }
}
