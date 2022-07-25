const user = JSON.parse(localStorage.getItem('user'));
let userServices = user.services;
let userAmount = user.amount;
const paymentsCtn = document.getElementById('payments-ctn');

userServices.forEach((elem,i) => {
    let newSpan = document.createElement('span');
    newSpan.style.visibility = 'hidden';
    newSpan.setAttribute('id', `span${i}`);
    newSpan.setAttribute('class', 'span-card');
    newSpan.appendChild(document.createTextNode(''));
    let newService = document.createElement('h3');
    let newAmount = document.createElement('p');
    let newDate = document.createElement('p');
    let newBtn = document.createElement('button');
    newService.innerText = elem.service;
    newAmount.innerText = `$ ${Number(elem.value).toFixed(2)}`;
    newDate.innerText = elem['expiry-date'];
    newDate.setAttribute('id', `date${i}`)
    newBtn.innerText = 'Pay';
    newBtn.setAttribute('id', `pay-btn${i}`);
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class','service-card');
    newDiv.setAttribute('id', `service-card${i}`);
    newBtn.addEventListener('click', ()=> payService(elem, i));
    newDiv.append(newService, newAmount, newDate, newBtn);
    paymentsCtn.appendChild(newDiv);
    newDiv.insertAdjacentElement("afterbegin", newSpan);
    expiryConditions(elem, i);
});

function expiryConditions(elem, index) {
    let today = Date.now();
    let expiry = Date.parse(new Date(elem['expiry-date']));
    let serviceSpan = document.getElementById(`span${index}`);            
    let serviceCard =  document.getElementById(`service-card${index}`);
    if (today >= expiry) {
        serviceCard.style.outline = '#ab4343 2px solid';
        document.getElementById(`date${index}`).style.outline = 'red 2px solid';
        serviceSpan.innerText = 'Overdue date! ';
        serviceSpan.style.visibility = 'visible';
    }
}

function payService(elem, index) {
    let serviceCard =  document.getElementById(`service-card${index}`);
    let serviceSpan = document.getElementById(`span${index}`);
    if (user.amount >= elem.value) {
        user.amount -= elem.value;
        userServices.splice(index,1);
        let userJson = JSON.stringify(user);
        localStorage.setItem('user', userJson);
        location.href = './payservices.html';
    } else {
        serviceCard.style.border = 'red 2px solid';
        serviceSpan.innerText = 'No amount available!';
        serviceSpan.style.visibility = 'visible';
        setTimeout( ()=> {
            serviceCard.removeAttribute('style');
            document.getElementById(`span${index}`).removeAttribute('style');
            document.getElementById(`span${index}`).innerText = '';
            expiryConditions(elem,index);
        }, 5000);
    }
}

