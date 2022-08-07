user = JSON.parse(localStorage.getItem('user'));
const form = document.forms[0];
const nameInput = form.name;
const valueInput = form.value;
const dateInput = form.date;
const registerError = document.getElementById('register-error');
const userServices = user.services;
const nameInputEl = document.getElementById('name');
const amountInputEl = document.getElementById('value');

function limpiarNumero(e) {
    /* El evento "change" sólo saltará si son diferentes */
    e.value = e.value.replace(/\D/g, '');
}
function addService(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.visibility = 'hidden';
    }
    let service = nameInput.value;
    let valueAmount = valueInput.value;
    let date = dateInput.value;
    if (service === '') {
        registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
        nameInput.style.outline = 'red 3px solid';
        return registerError.style.visibility = 'visible';
    } else if( valueAmount === '' ) {
        registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
        valueInput.style.outline = 'red 3px solid';
        return registerError.style.visibility = 'visible';    
    } else if( date === '' ) {
        dateInput.style.outline = 'red 3px solid';
        registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
        return registerError.style.visibility = 'visible'; 
    }
    else if (userServices.some(item => item.service === service && item.date === date && item.value === valueAmount) === true) {
        registerError.appendChild(document.createTextNode(`Service Already Exists!`));
        return registerError.style.visibility = 'visible';
    }
    else {
        const newService = {
            'service': service,
            'value': valueAmount,
            'date': date,
            'paid': false,
        }
        userServices.push(newService);
        setItemUserAndUsers(user);
        location.href = 'payservices.html';
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
    }
    
}
function cleanSpanAndBorder(el) {
    el.removeAttribute('style');
    registerError.style.visibility = 'hidden';
}

registerError.style.visibility = 'hidden';
registerError.innerHTML = 'Processing...';
nameInput.addEventListener('input', ()=> cleanSpanAndBorder(nameInput));
valueInput.addEventListener('input', ()=> cleanSpanAndBorder(valueInput));
dateInput.addEventListener('input', ()=> cleanSpanAndBorder(dateInput));
form.addEventListener('submit', (event)=> addService(event));

