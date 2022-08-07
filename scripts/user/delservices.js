user = JSON.parse(localStorage.getItem('user'));
let userServices = user.services;
const paymentsCtn = document.getElementById('payments-ctn');
userServices.forEach((elem,i) => {
    if (elem.paid === true) {
        let newService = document.createElement('h3');
        let newAmount = document.createElement('p');
        let newDate = document.createElement('p');
        let newBtn = document.createElement('button');
        let newDiv = document.createElement('div');
        newService.innerText = elem.service;
        newDate.innerText = `Payment Date: ${elem.paymentdate}`;
        newAmount.innerText = `$ ${elem.value}`;
        newBtn.innerText = 'Unattach Service';
        newBtn.setAttribute('id', `pay-btn${i}`);
        newBtn.addEventListener('click', ()=> deleteService(elem, i));
        newDiv.setAttribute('class','service-card');
        newDiv.setAttribute('id', `service-card${i}`);
        newDiv.append(newService, newAmount, newDate, newBtn);
        paymentsCtn.appendChild(newDiv);
    }
});
function deleteService(elem, index) {
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
    userServices.splice(index,1);
    console.log(user);
    setItemUserAndUsers(user);
    location.href = 'delservices.html';
}