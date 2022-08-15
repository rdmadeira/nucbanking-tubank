const form = document.forms[0];
const nameInput = form.name;
const lastnameInput = form.lastname;
const userInput = form.username;
const passwordInput = form.password;
const registerError = document.getElementById('register-error');
let usersStorageJSON = localStorage.getItem('users');
let usersArray = [];

if (usersStorageJSON) {
    usersArray = JSON.parse(usersStorageJSON);
}
registerError.style.visibility = 'hidden';
registerError.innerHTML = 'Processing...';
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
nameInput.addEventListener('input', ()=> cleanSpanAndBorder(nameInput));
lastnameInput.addEventListener('input', ()=> cleanSpanAndBorder(lastnameInput));
userInput.addEventListener('input', ()=> cleanSpanAndBorder(userInput));
passwordInput.addEventListener('input', ()=> cleanSpanAndBorder(passwordInput));
form.addEventListener('submit', event => saveUser(event));

function cleanSpanAndBorder(el) {
    el.removeAttribute('style');
    registerError.style.visibility = 'hidden';
}
function saveUser(e) {
    e.preventDefault();
    registerError.style.visibility = 'hidden';
    
    const name = nameInput.value;
    const lastname = lastnameInput.value;
    const username =  userInput.value;
    const password = passwordInput.value;
    
    if (name === '' || lastname === '' || username === '' || password === '') {
        registerError.style.visibility = 'visible';
        registerError.innerHTML = `Please, fill out all fields`;
        if (name === '') {
            nameInput.style.outline = 'red 3px solid';
        }
        if (lastname === '') {
            lastnameInput.style.outline = 'red 3px solid';
        }
        if (username === '') {
            userInput.style.outline = 'red 3px solid';
        }
        if (password === '') {
            passwordInput.style.outline = 'red 3px solid';
        }
    } else {
        /* let newUsers = {
            name: name,
            lastname: lastname,
            username: username,
            password: password,
            amount: 0,
            cbu: uuidv4(),
            services: [],
            savedUsers: [],
        } */
        class User {
            constructor(name, lastname, username, password) {
                this.name = name;
                this.lastname = lastname;
                this.username = username;
                this.password = password;
                this.cbu = null;
                this.amount = 0;
                this.services = [];
                this.savedUsers = [];
            }
            createCBU() {
                this.cbu = uuidv4();
            }
            checkUser() {
                return usersArray.some(item => item.username === this.username);
            }
        }

        let newUser = new User(name, lastname, username, password);

        if (newUser.checkUser()) {
            registerError.style.visibility = 'visible';
            userInput.style.outline = 'red 3px solid';
            return registerError.innerHTML = 'Username already exists! Choose another one';
        }
        
        if (!newUser.checkUser()) {
            usersArray.push(newUser);
            newUser.createCBU();
            let users = JSON.stringify(usersArray);
            localStorage.setItem('users', users);
            setTimeout(()=>location.href = '../../public/user/login.html',2000);
        }
     
    }
}

