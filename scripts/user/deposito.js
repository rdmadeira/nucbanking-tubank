let user = JSON.parse(localStorage.getItem('user'));
let usersArray = JSON.parse(localStorage.getItem('users'));
const cbuInputEl = document.getElementById('cbu');
const valueInputEl = document.getElementById('value');
const ownerForm = document.getElementById('owner-form');
const otherForm =  document.getElementById('other-form');
const registerError = document.getElementById('register-error');
const contentDiv = document.getElementById('content');

function limpiarNumero(e) {
    /* El evento "change" sólo saltará si son diferentes */
    e.value = e.value.replace(/\D/g, '');
}
function depositOnOwnerCbu(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.display = 'none';
    }
    let cbu = cbuInputEl.value;
    let amount = valueInputEl.value;
    if (amount === '') {
        registerError.style.display = 'block';
        registerError.appendChild(document.createTextNode(`Please, fill amount field!`));
        valueInputEl.style.border = 'red 2px solid';
    } else {
        user.amount += Number(amount);
        setItemUserAndUsers(user);
        const newDiv = document.createElement('div');
        contentDiv.insertAdjacentElement("afterbegin", newDiv);
        newDiv.setAttribute('class', 'success-alert');
        newDiv.innerHtml = '<p>Successful operation!</p>';
        location.href = './depositowner.html';
    }
}
function setItemUserAndUsers(u) {
    let userJson = JSON.stringify(u);
    localStorage.setItem('user', userJson);
    let usersArray = JSON.parse(localStorage.getItem('users'));
    const userIndex = usersArray.findIndex(item=>item.username === user.username && item.cbu === user.cbu);
    if (userIndex !== -1) {
        usersArray[userIndex] = u;
    }
    let usersJson = JSON.stringify(usersArray);    
    localStorage.setItem('users', usersJson);
}
function cleanSpanBorder() {
    registerError.style.display = 'none';
    registerError.remove(registerError.firstChild);
    valueInputEl.style.border = 'red 2px solid';
}

if (cbuInputEl.hasAttribute('readonly')) {
    cbuInputEl.setAttribute('value', user.cbu);
}
ownerForm.addEventListener('submit', (e)=> depositOnOwnerCbu(e) );
registerError.style.display = 'none';
valueInputEl.addEventListener('change', ()=> cleanSpanBorder());