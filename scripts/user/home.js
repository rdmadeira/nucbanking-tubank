const user = JSON.parse(localStorage.getItem('user'));
const checkingEl = document.getElementById('checking-li');
const servicesEl = document.getElementById('services-li');
const depositsEl = document.getElementById('deposits-li');
const transfersEl = document.getElementById('transfers-li');
const logOutEl =  document.getElementById('logout');
const checkingUlEl = document.getElementById('checking-ul');
const balanceEl = document.getElementById('balance-amount');
const cbuEl = document.getElementById('cbu');
const homeIframeEl = document.getElementById('content-iframe');

function showChecking() {
    if (!checkingUlEl.classList.contains('slide-in-left') && !checkingUlEl.classList.contains('slide-out-left')) {
        checkingUlEl.classList.toggle('displayNone');
        checkingUlEl.classList.add('slide-in-left');
        return
    } else if (checkingUlEl.classList.contains('slide-in-left')) {
        checkingUlEl.classList.replace('slide-in-left', 'slide-out-left');
        setTimeout(()=> {
            checkingUlEl.classList.remove('slide-out-left');
            return checkingUlEl.classList.add('displayNone');
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
    homeIframeEl.setAttribute('src', './services.html');
}
function showDeposits() {
    homeIframeEl.setAttribute('src', './deposits.html')
}
function showTransfers() {
    homeIframeEl.setAttribute('src', './transfers.html')
}
function logoutUser() {
    localStorage.removeItem('user');
    location.href = '../../public/user/login.html';
}

checkingEl.addEventListener('click', ()=> showChecking());
balanceEl.addEventListener('click', ()=> showBalance());
cbuEl.addEventListener('click', ()=> showCBU());
servicesEl.addEventListener('click', ()=> showServices());
depositsEl.addEventListener('click', ()=> showDeposits());
transfersEl.addEventListener('click', ()=> showTransfers());
logOutEl.addEventListener('click', ()=> logoutUser());