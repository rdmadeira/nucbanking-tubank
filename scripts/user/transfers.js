user = JSON.parse(localStorage.getItem('user'));
usersArray = JSON.parse(localStorage.getItem('users'));
let savedUsers = user.savedUsers;
const ownerCbuInputEl = document.getElementById('cbu-input');
const amountInputEl = document.getElementById('amount');
const selectAliasInputEl = document.getElementById('saved-users-select');
const selectUserEl = document.getElementById('saved-users-select');
const transferForm = document.getElementById('transfer-form');
const searchForm = document.getElementById('search-user');
const searchCbu = document.getElementById('cbu-search');
const saveForm = document.getElementById('save-user');
const saveCbuInputEl = document.getElementById('cbu-save-input');
const saveNameInputEl =  document.getElementById('name-save-input');
const saveUserDiv = document.getElementById('save-user-div');
const ownerNameP = document.getElementById('cbu-owner-name');
const registerError = document.getElementById('register-error');
const searchError = document.getElementById('search-error');
const closeBtns = document.querySelectorAll('.close-btn');
const buttonSubmit = document.querySelector('button[type="submit"]');

function limpiarNumero(e) {
    /* El evento "change" sólo saltará si son diferentes */
    e.value = e.value.replace(/\D/g, '');
}
function getCbuToSave(e) {
    e.preventDefault();
    let savedUsers = user.savedUsers;
    searchError.style.visibility = 'hidden';
    let cbuToValid = searchCbu.value;
    let newSavedUser = {};
    let findedUser = usersArray.find(item=>item.cbu === cbuToValid);
    searchCbu.addEventListener('input', ()=>{
        cleanSpanBorder(searchCbu);
    })
    if (findedUser && !savedUsers.find(item=>item.cbu === cbuToValid)) {
        newSavedUser.cbu = findedUser.cbu;
        newSavedUser.name = findedUser.name;
        newSavedUser.lastname = findedUser.lastname;
        goToSaveAlias(newSavedUser);
    } else if(savedUsers.find(item=>item.cbu === cbuToValid)) {
        searchCbu.style.border = '#b70000 2px solid';
        searchError.innerHTML = 'CBU already saved!';
        searchError.style.visibility = 'visible';
        
    } else {
        searchCbu.style.border = 'red 2px solid';
        searchError.innerHTML = 'Invalid CBU';
        searchError.style.visibility = 'visible';
    }
    function goToSaveAlias(newSavedUser) {
        location.href = '#save-user-div';
        saveCbuInputEl.setAttribute('value', newSavedUser.cbu);
        ownerNameP.innerHTML= `${newSavedUser.name} ${newSavedUser.lastname}`;
        saveForm.addEventListener('submit', (e)=> saveNewAlias(e));
    }
    function saveNewAlias(e) {
        e.preventDefault();
        const alias =  document.getElementById('save-alias').value;
        newSavedUser.alias = alias;
        user = JSON.parse(localStorage.getItem('user'));
        user.savedUsers.push(newSavedUser);
        setItemUserAndUsers(user);
        showSuccessfulOperation('Alias saved!')
    }
}
function showSuccessfulOperation(string) {
    const newDiv = document.createElement('div');
    const newH4 = document.createElement('h4');
    const newBtnOk = document.createElement('button');
    const contentDiv = document.getElementById('content');
    newH4.innerText = string;
    newBtnOk.setAttribute('class','button-ok');
    newBtnOk.innerText = 'OK';
    newDiv.insertAdjacentElement('afterbegin', newH4);
    newDiv.insertAdjacentElement("beforeend", newBtnOk);
    contentDiv.insertAdjacentElement("afterbegin", newDiv);
    newDiv.setAttribute('class', 'success-alert');
    saveUserDiv.style.display = 'none';
    document.querySelector('.button-ok').addEventListener('click', ()=> location.href = 'transfers.html');
}
function cleanSpanBorder(element) {
    searchError.style.visibility = 'hidden';
    registerError.style.visibility = 'hidden';
    /* if (registerError.firstChild) {
        registerError.removeChild(registerError.firstChild);
    } */
    element.removeAttribute('style');
}
function setItemUserAndUsers(u, ot) {
    let userJson = JSON.stringify(u);
    localStorage.setItem('user', userJson);
    let usersArray = JSON.parse(localStorage.getItem('users'));
    const userIndex = usersArray.findIndex(item=>item.username === u.username && item.cbu === u.cbu);
    if(ot) {
        const otherUserIndex =  usersArray.findIndex(item=>item.username === ot.username && item.cbu === ot.cbu);
        if (otherUserIndex !== -1) {
            usersArray[otherUserIndex] = ot;
        }
    }
    if (userIndex !== -1) {
        usersArray[userIndex] = u;
    }
    let usersJson = JSON.stringify(usersArray);    
    localStorage.setItem('users', usersJson);
}
function transferAmount(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    let usersArray = JSON.parse(localStorage.getItem('users'));
    let amount = amountInputEl.value;
    let selectedCbu = selectAliasInputEl.value;
    let otherUser = usersArray.find(item => item.cbu === selectedCbu);
    if (amount === ''){
        amountInputEl.style.outline = 'red 3px solid';
        registerError.innerHTML = 'Please Complete all fields!';
        registerError.style.visibility = 'visible';
    }
    if (!otherUser) {
        selectAliasInputEl.style.outline = 'red 3px solid';
        registerError.innerHTML = 'Please Complete all fields!';
        registerError.style.visibility = 'visible';
    }
    if (user.amount >= Number(amount) && amount !== '') {
        user.amount -= Number(amount);
        otherUser.amount += Number(amount);
        setItemUserAndUsers(user, otherUser);
        showSuccessfulOperation('Successful Operation!');
        buttonSubmit.disabled = true;
    } else if(user.amount < Number(amount)) {
        amountInputEl.style.outline = 'red 3px solid';
        registerError.innerHTML = 'Unavailable Amount!';
        registerError.style.visibility = 'visible';
    }

}
function closeDivs() {
    location.href = 'transfers.html';
}

savedUsers.forEach(item => {
    let newOption = document.createElement('option');
    newOption.appendChild(document.createTextNode(`${item.alias}`));
    newOption.setAttribute('value', item.cbu)
    selectUserEl.appendChild(newOption);
});

if (ownerCbuInputEl.hasAttribute('readonly')) {
    ownerCbuInputEl.setAttribute('value', user.cbu);
}
searchError.style.visibility = 'hidden';
searchError.appendChild(document.createTextNode('Invalid CBU!'));
transferForm.addEventListener('submit', e => transferAmount(e));
searchForm.addEventListener('submit', e => getCbuToSave(e));
closeBtns.forEach(item=>item.addEventListener('click', e => closeDivs(e)));
amountInputEl.addEventListener('input', ()=> cleanSpanBorder(amountInputEl));
selectAliasInputEl.addEventListener('change', ()=> cleanSpanBorder(selectAliasInputEl));