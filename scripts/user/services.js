const user = JSON.parse(localStorage.getItem('user'));
const form = document.forms[0];
const nameInput = form.name;
const valueInput = form.value;
const dateInput = form.date;
const registerError = document.getElementById('register-error');
const userServices = user.services;

function limpiarNumero(obj) {
    /* El evento "change" sólo saltará si son diferentes */
    obj.value = obj.value.replace(/\D/g, '');
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
    } else {
        const newService = {
            'service': service,
            'value': valueAmount,
            'expiry-date': date,
        }
        userServices.push(newService);
        const userJson = JSON.stringify(user);
        localStorage.setItem('user', userJson);
        location.href = './payservices.html';
    }
    
}

form.addEventListener('submit', (event)=> addService(event));