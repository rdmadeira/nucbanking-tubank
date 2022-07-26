const user = JSON.parse(localStorage.getItem('user'));
const form = document.forms[0];
const nameInput = form.name;
const valueInput = form.value;
const dateInput = form.date;
const registerError = document.getElementById('register-error');
const userServices = user.services;

function limpiarNumero(e) {
    /* El evento "change" sólo saltará si son diferentes */
    e.value = e.value.replace(/\D/g, '');
}
function addService(e) {
    e.preventDefault();
    if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
        registerError.style.display = 'none';
    }
    let service = nameInput.value;
    let valueAmount = valueInput.value;
    let date = dateInput.value;
    if (service === '' || valueAmount === '' || date === '') {
        registerError.appendChild(document.createTextNode(`Please, fill out all fields`));
        return registerError.style.display = 'block';
    } else if (userServices.some(item => item.service === service) === true) {
        registerError.appendChild(document.createTextNode(`Service Already Exists!`));
        return registerError.style.display = 'block';
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
        location.href = './payservices.html';
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

form.addEventListener('submit', (event)=> addService(event));