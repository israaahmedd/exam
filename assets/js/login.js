document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    
    // Get form values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Retrieve sign-up data from localStorage
    const savedEmail = localStorage.getItem('signupEmail');
    const savedPassword = localStorage.getItem('signupPassword');
    
    // Validate login data
    if (email === savedEmail && password === savedPassword) {
        displayMessage('Login successful!', 'green');
        // Redirect to a new page or perform some action
        window.location.href = 'exam.html';
    } else {
        displayMessage('Invalid email or password.', 'red');
    }
});

function displayMessage(message, color) {
    const messageElement = document.getElementById('loginMessage');
    messageElement.textContent = message;
    messageElement.style.color = color;
}
