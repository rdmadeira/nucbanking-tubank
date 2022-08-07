user = JSON.parse(localStorage.getItem('user'));
usersArray = JSON.parse(localStorage.getItem('users'));
const cbuInputEl = document.getElementById('cbu-input');
const valueInputEl = document.getElementById('value');
const depoForm = document.getElementById('depo-form');
//const otherForm =  document.getElementById('other-form');
const registerError = document.getElementById('register-error');
const contentDiv = document.getElementById('content');
const buttonSubmit = document.querySelector('button[type="submit"]');

function limpiarNumero(e) {
    /* El evento "change" sólo saltará si son diferentes */
    e.value = e.value.replace(/\D/g, '');
}
function depositOnOwnerCbu(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.visibility = 'hidden';
    }
    let cbu = cbuInputEl.value;
    let amount = valueInputEl.value;
    if (amount==='' || cbu==='') {
        registerError.style.visibility = 'visible';
        registerError.appendChild(document.createTextNode(`Please, fill amount field!`));
        if(amount==='') {
            valueInputEl.style.outline = 'red 3px solid';
        }
        if (cbu==='') {
            cbuInputEl.style.outline = 'red 3px solid';
        }
    } else {
        user.amount += Number(amount);
        setItemUserAndUsers(user);
        showSuccessfulOperation('Successful Operation!')
        buttonSubmit.disabled = true;
    }
}
function showSuccessfulOperation(string) {
    const newDiv = document.createElement('div');
    const newH4 = document.createElement('h4');
    const newBtnOk = document.createElement('button');
    const contentDiv = document.getElementById('content');
    newH4.innerText = string;
    newBtnOk.setAttribute('class','button-ok');
    newBtnOk.innerText = 'OK';
    newDiv.insertAdjacentElement('afterbegin', newH4);
    newDiv.insertAdjacentElement("beforeend", newBtnOk);
    contentDiv.insertAdjacentElement("afterbegin", newDiv);
    newDiv.setAttribute('class', 'success-alert');
    document.querySelector('.button-ok').addEventListener('click', ()=> location.href = 'depositowner.html');
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
    registerError.style.visibility = 'hidden';
    //registerError.removeChild(registerError.firstChild);
    valueInputEl.removeAttribute('style');
}

if (cbuInputEl.hasAttribute('readonly')) {
    cbuInputEl.setAttribute('value', user.cbu);
}
depoForm.addEventListener('submit', (e)=> depositOnOwnerCbu(e) );
registerError.style.visibility = 'hidden';
valueInputEl.addEventListener('input', ()=> cleanSpanBorder());
cbuInputEl.addEventListener('input', ()=> cleanSpanBorder());
