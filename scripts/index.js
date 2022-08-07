const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('signup-btn');

function appearLogin() {
    location.href = './user/login.html'
}
function appearRegister() {
    location.href = './user/register.html';
}

loginBtn.addEventListener('click', ()=> appearLogin());
signUpBtn.addEventListener('click', ()=> appearRegister());