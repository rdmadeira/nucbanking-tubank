let user = JSON.parse(localStorage.getItem('user'));
let usersArray = JSON.parse(localStorage.getItem('users'));
const checkingEl = document.getElementById('checking-li');
const servicesEl = document.getElementById('services-li');
const depositsEl = document.getElementById('deposits-li');
const depositsUlEl = document.getElementById('deposits-ul');
const ownerAccountLi = depositsUlEl.children[0];
const otherAccountLi = depositsUlEl.children[1];
const transfersEl = document.getElementById('transfers-li');
const logOutEl =  document.getElementById('logout');
const checkingUlEl = document.getElementById('checking-ul');
const balanceEl = document.getElementById('balance-amount');
const cbuEl = document.getElementById('cbu');
const homeIframeEl = document.getElementById('content-iframe');
const servicesUlEl = document.getElementById('services-ul');
const addServiceLi = servicesUlEl.children[0];
const delServiceLi = servicesUlEl.children[1];
const payServiceLi =  servicesUlEl.children[2];
const myPaymentsLi =  servicesUlEl.children[3];
const submenuLisEl = document.querySelectorAll('nav#menu>ul>li>ul>li');

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

/* ******************************************************************************************** */
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
function showAddService() {
    homeIframeEl.setAttribute('src', './addservice.html')
}
function showPayServices() {
    homeIframeEl.setAttribute('src', './payservices.html')
}
function showDelServices() {
    homeIframeEl.setAttribute('src', './delservices.html')
}
function showMyPayments() {
    homeIframeEl.setAttribute('src', './servicesproofs.html');
}

/* ******************************************************************************************** */
function showDeposits() {
    if(!depositsUlEl.classList.contains('slide-in-left')) {
        depositsUlEl.classList.replace('displayNone','slide-in-left');
        return
    }
    if (depositsUlEl.classList.contains('slide-in-left')) {
        depositsUlEl.classList.replace('slide-in-left', 'slide-out-left');
        setTimeout( ()=> {
            return depositsUlEl.classList.replace('slide-out-left', 'displayNone');
        },1000)
    }
}
function showDepositOwner() {
    homeIframeEl.setAttribute('src', './depositowner.html');
}
function showDepositOther() {
    homeIframeEl.setAttribute('src', './depositother.html');
}
/* ******************************************************************************************** */
function showTransfers() {
    homeIframeEl.setAttribute('src', './transfers.html');
    if (menuUlEl.hasAttribute('style')) {
        menuUlEl.removeAttribute('style');
    }
}
function logoutUser() {
    user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userIndex = usersArray.findIndex(item=>item.username === user.username && item.cbu === user.cbu);
            if (userIndex !== -1) {
                usersArray[userIndex] = user;
            }
    }
    let usersJson = JSON.stringify(usersArray);    
    localStorage.setItem('users', usersJson);
    localStorage.removeItem('user');
    location.href = '../../public/user/login.html';
}
function slideOutAllUl() {
    const slidesOnLeft =  document.querySelectorAll('.slide-in-left');
    slidesOnLeft.forEach(item => {
        item.classList.replace('slide-in-left', 'slide-out-left');
        setTimeout( ()=> {
            item.classList.replace('slide-out-left', 'displayNone');
        },1000 );
    });
}

const menuUlEl = document.querySelector('nav#menu>ul');
if(window.matchMedia('(max-width:780px)').matches) {
    document.getElementById('logo-2-ctn').addEventListener('click', ()=> {
        if (!menuUlEl.hasAttribute('style')) {
            menuUlEl.style.transform = 'scaleX(1)';
        } else {
            menuUlEl.removeAttribute('style');
        }
    })
}
submenuLisEl.forEach(item => {
    item.addEventListener('click', () => menuUlEl.removeAttribute('style'));
})
checkingEl.addEventListener('click', ()=> showChecking());
balanceEl.addEventListener('click', ()=> showBalance());
cbuEl.addEventListener('click', ()=> showCBU());
depositsEl.addEventListener('click', ()=> showDeposits());
ownerAccountLi.addEventListener('click', ()=> showDepositOwner());
otherAccountLi.addEventListener('click', ()=> showDepositOther())
transfersEl.addEventListener('click', ()=> showTransfers());
servicesEl.addEventListener('click', ()=> showServices());
addServiceLi.addEventListener('click', ()=> showAddService())
delServiceLi.addEventListener('click', ()=> showDelServices())
payServiceLi.addEventListener('click', ()=> showPayServices())
myPaymentsLi.addEventListener('click', ()=> showMyPayments())
logOutEl.addEventListener('click', ()=> logoutUser());
homeIframeEl.addEventListener('mouseover', () => slideOutAllUl());