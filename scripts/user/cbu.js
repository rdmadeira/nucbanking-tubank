const user = JSON.parse(localStorage.getItem('user'));
const h2El =  document.querySelector('.results-div h2');
const pEl =  document.querySelector('.results-div p');
h2El.innerHTML = 'CBU';
pEl.innerHTML = `${user.cbu}`;