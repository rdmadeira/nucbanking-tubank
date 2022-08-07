window.addEventListener('load', ()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    const welcomeContentMain = document.getElementById('welcome-content-main');
    document.querySelector('#welcome').innerText = `Hi, ${user.name}! Nice to see you here again.`;
    document.querySelector('#welcome-p').innerText = `TuBank. Your finances in good hands!`;
    function slideOutAllUl() {
        const slidesOnLeft =  document.querySelectorAll('.slide-in-left');
        slidesOnLeft.forEach(item => {
            item.classList.replace('slide-in-left', 'slide-out-left');
            setTimeout( ()=> {
                item.classList.replace('slide-out-left', 'displayNone');
            },1000 );
        });
    }
    welcomeContentMain.addEventListener('mouseover', ()=> slideOutAllUl());
}
)