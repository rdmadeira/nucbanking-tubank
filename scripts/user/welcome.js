const user = JSON.parse(localStorage.getItem('user'));
document.querySelector('#welcome').innerText = `Welcome, ${user.name}!`;