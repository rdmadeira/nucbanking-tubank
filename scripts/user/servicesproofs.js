user = JSON.parse(localStorage.getItem('user'));
let userServices = user.services;
const paymentsCtn = document.getElementById('payments-ctn');
userServices.forEach((elem,i) => {
    if (elem.paid === true) {
        let newService = document.createElement('h3');
        let newAmount = document.createElement('p');
        let newDate = document.createElement('p');
        let newDiv = document.createElement('div');
        newService.innerText = elem.service;
        newDate.innerText = `Payment Date: ${elem.paymentdate}`;
        newAmount.innerText = `$ ${elem.value}`;
        newDiv.setAttribute('class','service-card');
        newDiv.setAttribute('id', `service-card${i}`);
        newDiv.append(newService, newAmount, newDate);
        paymentsCtn.appendChild(newDiv);
    }
});
