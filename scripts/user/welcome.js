const user = JSON.parse(localStorage.getItem('user'));
document.querySelector('#welcome').innerText = `Hi, ${user.name}! Nice to see you here again.`;
document.querySelector('#welcome-p').innerText = `TuBank. Your finances in good hands!`;