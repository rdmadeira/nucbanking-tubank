let user = JSON.parse(localStorage.getItem('user'));
let usersArray = JSON.parse(localStorage.getItem('users'));
let savedUsers = user.savedUsers;
const ownerCbuInputEl =  document.getElementById('cbu');
const saveCbuInputEl = document.getElementById('cbu-save-input');
const saveNameInputEl =  document.getElementById('name-save-input');
const selectUserEl = document.getElementById('saved-users-select');
const searchForm = document.getElementById('search-user');
const searchCbu = document.getElementById('cbu-search').value;
const saveForm = document.getElementById('save-user');
const saveUserDiv = document.getElementById('search-user-div');

function getCbuToSave(e) {
    e.preventDefault();
    let userDestiny = usersArray.find(item=>item.cbu === searchCbu);
    if (userDestiny) {
        saveNameInputEl.setAttribute('value', userDestiny.name);

        location.href = '#save-user-div';
    }
    

}

savedUsers.forEach(item => {
    let newOption = document.createElement('option');
    newOption.appendChild(document.createTextNode(`${item.nick}`));
    newOption.setAttribute('value', item.cbu)
    selectUserEl.appendChild(newOption);
});
if (ownerCbuInputEl.hasAttribute('readonly')) {
    ownerCbuInputEl.setAttribute('value', user.cbu);
}

searchForm.addEventListener('submit', (e)=>getCbuToSave(e))