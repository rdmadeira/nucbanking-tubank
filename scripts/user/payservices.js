user = JSON.parse(localStorage.getItem('user'));
let userServices = user.services;
let userAmount = user.amount;
const paymentsCtn = document.getElementById('payments-ctn');

userServices.forEach((elem,i) => {
    if(elem.paid === false) {
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
        newDate.innerText = elem['date'];
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
    }
});

function expiryConditions(elem, index) {
    let today = (new Date(Date.now()).setHours(0,0,0,0));
    let expiry = (new Date(elem['date']).setHours(0,0,0,0));
    let serviceSpan = document.getElementById(`span${index}`);            
    let serviceCard =  document.getElementById(`service-card${index}`);
    if (today - 86400000 > expiry) {
        serviceCard.style.outline = 'red 3px solid';
        document.getElementById(`date${index}`).style.outline = 'red 2px solid';
        serviceSpan.innerText = 'Overdue date! ';
        serviceSpan.style.visibility = 'visible';
    }
}

function payService(elem, index) {
    
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
    let serviceCard =  document.getElementById(`service-card${index}`);
    let serviceSpan = document.getElementById(`span${index}`);
    if (user.amount >= elem.value) {
        user.amount -= elem.value;
        user.services[index].paid = true;
        user.services[index]['paymentdate'] = `${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth()+1}-${new Date(Date.now()).getDate()}`;
        setItemUserAndUsers(user);
        location.href = 'payservices.html';
        
    } else {
        serviceCard.style.outline = 'red 3px solid';
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

