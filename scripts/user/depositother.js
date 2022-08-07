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
    let otherUser = usersArray.find(item=>item.cbu === cbu);
    console.log(usersArray);
    if (amount==='' || cbu==='') {
        registerError.style.visibility = 'visible';
        registerError.appendChild(document.createTextNode(`Please, fill amount field!`));
        if(amount==='') {
            valueInputEl.style.outline = 'red 3px solid';
        }
        if (cbu==='') {
            cbuInputEl.style.outline = 'red 3px solid';
        }
    } else if (otherUser) {
        if (user.amount >= Number(amount)) {
            user.amount -= Number(amount);
            otherUser.amount += Number(amount);
            setItemUserAndUsers(user, otherUser);
            showSuccessfulOperation('Successful Operation!');
            buttonSubmit.disabled = true;
        } else {
            registerError.style.visibility = 'visible';
            registerError.appendChild(document.createTextNode(`Insuficient amount available!`));
            valueInputEl.style.outline = 'red 3px solid';
        }
    } else {
        registerError.style.visibility = 'visible';
        registerError.appendChild(document.createTextNode(`Invalid CBU!`));
        cbuInputEl.style.outline = 'red 3px solid';
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
    document.querySelector('.button-ok').addEventListener('click', ()=> location.href = 'depositother.html');
}
function setItemUserAndUsers(u,ot) {
    let userJson = JSON.stringify(u);
    localStorage.setItem('user', userJson);
    let usersArray = JSON.parse(localStorage.getItem('users'));
    const userIndex = usersArray.findIndex(item=>item.username === u.username && item.cbu === u.cbu);
    const otherUserIndex =  usersArray.findIndex(item=>item.username === ot.username && item.cbu === ot.cbu);
    if (userIndex !== -1) {
        usersArray[userIndex] = u;
    }
    if (otherUserIndex !== -1) {
        usersArray[otherUserIndex] = ot;
    }
    let usersJson = JSON.stringify(usersArray);    
    localStorage.setItem('users', usersJson);
}
function cleanSpanBorder(element) {
    registerError.style.visibility = 'hidden';
    /* if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
    } */
    element.removeAttribute('style');
}

if (cbuInputEl.hasAttribute('readonly')) {
    cbuInputEl.setAttribute('value', user.cbu);
}
depoForm.addEventListener('submit', (e)=> depositOnOwnerCbu(e) );
registerError.style.visibility = 'hidden';
valueInputEl.addEventListener('input', ()=>cleanSpanBorder(valueInputEl));
cbuInputEl.addEventListener('input', ()=>cleanSpanBorder(cbuInputEl));
