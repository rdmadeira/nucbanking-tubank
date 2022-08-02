const user = JSON.parse(localStorage.getItem('user'));
const h2El =  document.querySelector('.results-div h2');
const pEl =  document.querySelector('.results-div p');
h2El.innerHTML = `${user.name}, your available balance is:`;
const dollarFormat = { style: 'currency', currency: 'USD' };
const currencyDollar = new Intl.NumberFormat('en-US', dollarFormat);
pEl.innerHTML = `${currencyDollar.format(user.amount)}`;
