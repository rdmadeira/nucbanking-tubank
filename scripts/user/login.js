const form = document.forms[0];
const userInput = form.username;
const passwordInput = form.password;
const registerError = document.getElementById('register-error');

registerError.style.display = 'none';

let usersArray = [];
let usersStorageJSON = localStorage.getItem('users');
if (usersStorageJSON) {
    usersArray = JSON.parse(usersStorageJSON);
}

form.addEventListener('submit', (event)=>{loginUser(event)});

function loginUser(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.display = 'none';
    }
    let username = userInput.value;
    let password = passwordInput.value;
    console.log(usersArray);
    if (username === '' || password === '') {
        registerError.style.display = 'block';
        return registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
    } else {
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
            registerError.style.display = 'block';
            registerError.appendChild(document.createTextNode('Incorrect data!'));
        }

    }
}
