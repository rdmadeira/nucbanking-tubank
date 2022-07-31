let user = JSON.parse(localStorage.getItem('user'));
let usersArray = JSON.parse(localStorage.getItem('users'));
const cbuInputEl = document.getElementById('cbu');
const valueInputEl = document.getElementById('value');
const depoForm = document.getElementById('depo-form');
//const otherForm =  document.getElementById('other-form');
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
        registerError.style.visibility = 'hidden';
    }
    let cbu = cbuInputEl.value;
    let amount = valueInputEl.value;
    if (amount==='' || cbu==='') {
        registerError.style.visibility = 'visible';
        registerError.appendChild(document.createTextNode(`Please, fill amount field!`));
        if(amount==='') {
            valueInputEl.style.border = 'red 2px solid';
        }
        if (cbu==='') {
            cbuInputEl.style.border = 'red 2px solid';
        }
    } else {
        user.amount += Number(amount);
        setItemUserAndUsers(user);
        const newDiv = document.createElement('div');
        const template = document.querySelector('template');
        contentDiv.insertAdjacentElement("afterbegin", newDiv);
        newDiv.setAttribute('class', 'success-alert');
        newDiv.innerHTML = template.innerHTML;
        document.querySelector('#content #button-ok').addEventListener('click', ()=> location.href = 'depositowner.html')
        
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
