const form = document.forms[0];
const userInput = form.username;
const passwordInput = form.password;
const registerError = document.getElementById('register-error');
registerError.style.visibility = 'hidden';
registerError.innerHTML = 'Processing...'

let usersArray = [];
let usersStorageJSON = localStorage.getItem('users');
if (usersStorageJSON) {
    usersArray = JSON.parse(usersStorageJSON);
}
passwordInput.addEventListener('input', ()=> cleanSpanAndBorder(passwordInput));
userInput.addEventListener('input', ()=> cleanSpanAndBorder(userInput));
form.addEventListener('submit', (event)=>{loginUser(event)});

function cleanSpanAndBorder(el) {
    el.removeAttribute('style');
    registerError.style.visibility = 'hidden';
}
function loginUser(e) {
    e.preventDefault();
    // if (registerError.firstChild) {
        // registerError.removeChild(registerError.firstChild);
        registerError.style.visibility = 'hidden';
    // }
    let username = userInput.value;
    let password = passwordInput.value;
    console.log(usersArray);
    if (username === '') {
        registerError.style.visibility = 'visible';
        userInput.style.outline = 'red 3px solid';
        registerError.innerHTML = `Please, fill out all fields`;
    } 
    if (password === '') {
        registerError.style.visibility = 'visible';
        passwordInput.style.outline = 'red 3px solid';
        registerError.innerHTML = `Please, fill out all fields`;
    } 
    if(username !== '' && password !== '') {
        let user;
        let correctValues = usersArray.some(userObj => {
            if (userObj.username === username && userObj.password === password) {
                user = userObj;
                return true
            }
        });
        // console.log(user);
        
        if (correctValues) {
            localStorage.setItem('user', JSON.stringify(user))
            location.href = '../../public/user/home.html';
        } else {
            registerError.style.visibility = 'visible';
            registerError.innerHTML = 'Incorrect Data!';
        }

    }
}
