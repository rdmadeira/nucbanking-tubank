let user = JSON.parse(localStorage.getItem('user'));
let usersArray = JSON.parse(localStorage.getItem('users'));
const checkingEl = document.getElementById('checking-li');
const servicesEl = document.getElementById('services-li');
const depositsEl = document.getElementById('deposits-li');
const transfersEl = document.getElementById('transfers-li');
const logOutEl =  document.getElementById('logout');
const checkingUlEl = document.getElementById('checking-ul');
const balanceEl = document.getElementById('balance-amount');
const cbuEl = document.getElementById('cbu');
const homeIframeEl = document.getElementById('content-iframe');
const servicesUlEl = document.getElementById('services-ul');
const addServiceLi = servicesUlEl.children[0];
const delServiceLi = servicesUlEl.children[1];
const payService =  servicesUlEl.children[2];
const myPaymentsLi =  servicesUlEl.children[3];

function showChecking() {
    if (!checkingUlEl.classList.contains('slide-in-left') && !checkingUlEl.classList.contains('slide-out-left')) {
        return checkingUlEl.classList.replace('displayNone', 'slide-in-left');
    } else if (checkingUlEl.classList.contains('slide-in-left')) {
        checkingUlEl.classList.replace('slide-in-left', 'slide-out-left');
        setTimeout(()=> {
            return checkingUlEl.classList.replace('slide-out-left', 'displayNone');
        }, 1000);
    } 
}
function showBalance() {
    homeIframeEl.setAttribute('src', './balance.html');
}
function showCBU() {
    homeIframeEl.setAttribute('src', './cbu.html');
}
function showServices() {
    if (!servicesUlEl.classList.contains('slide-in-left')) {
        servicesUlEl.classList.replace('displayNone', 'slide-in-left');
        return
    }
    if (servicesUlEl.classList.contains('slide-in-left')) {
        servicesUlEl.classList.replace('slide-in-left', 'slide-out-left');
        setTimeout( ()=> {
            return servicesUlEl.classList.replace('slide-out-left', 'displayNone');
        },1000 );
    }
}
function showDeposits() {
    homeIframeEl.setAttribute('src', './deposits.html')
}
function showTransfers() {
    homeIframeEl.setAttribute('src', './transfers.html');
}
function logoutUser() {
    user = JSON.parse(localStorage.getItem('user'));
    /* usersArray.push({
        name: 'Rodrigo', 
        lastname: 'Nascimento', 
        username: 'rdmadeira', 
        password: '1234', 
        amount: 0,
        savedUsers: [],
        services: [],
        cbu: "64acfe61-3eb7-40dc-b9b0-e495edb3e63f",
    }) */
    
    usersArray.forEach((item, index)=> {
        item.username === user.username && item.password === user.password ? usersArray.splice(index,1) && usersArray.push(user) : item;       
    });
    let usersJson = JSON.stringify(usersArray);    
    localStorage.setItem('users', usersJson);
    localStorage.removeItem('user');
    location.href = '../../public/user/login.html';
}
function showAddService() {
    homeIframeEl.setAttribute('src', './addservice.html')
}
function showPayServices() {
    homeIframeEl.setAttribute('src', './payservices.html')
}

checkingEl.addEventListener('click', ()=> showChecking());
balanceEl.addEventListener('click', ()=> showBalance());
cbuEl.addEventListener('click', ()=> showCBU());
servicesEl.addEventListener('click', ()=> showServices());
depositsEl.addEventListener('click', ()=> showDeposits());
transfersEl.addEventListener('click', ()=> showTransfers());
logOutEl.addEventListener('click', ()=> logoutUser());
addServiceLi.addEventListener('click', ()=> showAddService())
delServiceLi.addEventListener('click', ()=> showDelService())
payService.addEventListener('click', ()=> showPayServices())
myPaymentsLi.addEventListener('click', ()=> showMyPayments())