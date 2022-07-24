const form = document.forms[0];
const nameInput = form.name;
const lastnameInput = form.lastname;
const userInput = form.username;
const passwordInput = form.password;
const registerError = document.getElementById('register-error');

registerError.style.display = 'none';

let usersStorageJSON = localStorage.getItem('users');
let usersArray = [];
if (usersStorageJSON) {
    usersArray = JSON.parse(usersStorageJSON);
}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

form.addEventListener('submit', event => saveUser(event));

function saveUser(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.display = 'none';
    }
    const name = nameInput.value;
    const lastname = lastnameInput.value;
    const username =  userInput.value;
    const password = passwordInput.value;
    
    if (name === '' || lastname === '' || username === '' || password === '') {
        registerError.style.display = 'block';
        return registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
    } else {
        let newUsers = {
            name: name,
            lastname: lastname,
            username: username,
            password: password,
            amount: 0,
            cbu: uuidv4(),
            services: [],
            savedUsers: [],
        }
        if (usersArray.some(objUser => objUser.username === newUsers.username)) {
            registerError.style.display = 'block';
            return registerError.appendChild(document.createTextNode('Username already exists! Choose another one'));
        }
        /* if (usersArray.some(objUser => objUser.password === newUsers.password)) {
            registerError.style.display = 'block';
            return registerError.appendChild(document.createTextNode('Choose another password'))
        }  */
        if (!usersArray.some(objUser => objUser.username === newUsers.username)) {
            usersArray.push(newUsers);
            let users = JSON.stringify(usersArray);
            localStorage.setItem('users', users);
            setTimeout(()=>location.href = '../../public/user/login.html',2000);
        }
     
    }
}

