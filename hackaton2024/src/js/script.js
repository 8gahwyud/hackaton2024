//глазик на форме с паролем
function eye(){
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#id_password');

  togglePassword.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
}
//модалка вход\рег
const toggleFormBtn = document.querySelector('.login-form__button--secondary'),
    formWrapper = document.querySelector('.login-form'),
    popupOverlay = document.querySelector('.popup__overlay'),
    loginBtn = document.querySelector('.header__login'),
    body = document.querySelector('body')
    closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click',()=>{
        closeModal(popupOverlay);
    })
function closeModal(modal){
    body.style.overflow = ''
    modal.classList.remove('active');
    modal.classList.add('close');
}
loginBtn.addEventListener('click',()=>{
    body.style.overflow = 'hidden'
    document.body.classList.add("no-scroll");
    popupOverlay.classList.remove('close');
    popupOverlay.classList.add('active')
})

function changeFormToReg(form){
    form.innerHTML = `
                            <div class="login-form__title">регистрация</div>
                        <form action="#">
                            <input type="username" id="username" class="login-form__input" placeholder="Имя">
                            <input type="email" id="email" class="login-form__input" placeholder="Почта">
                            <div class="login-form__password">
                                <input type="password" id="id_password" class="login-form__input" placeholder="Введите пароль">
                                <i class="far fa-eye" id="togglePassword">
                                    <img src="icons/eye.png" alt="eyebtn">
                                </i>
                            </div>
                            <button type="submit" class="login-form__button login-form__button--primary">зарегистрироваться</button>
                            <button type="button" id='goToLog'class="login-form__button login-form__button--secondary">У меня есть аккаунт</button>
                        </form>
    `
    
}
function changeFormToOper(form){
    form.innerHTML = `
                            <div class="login-form__title">Авторизация</div>
                        <form action="#">
                            <input type="username" id="username" class="login-form__input" placeholder="Имя">
                            <input type="email" id="email" class="login-form__input" placeholder="Почта">
                            <div class="login-form__password">
                                <input type="password" id="id_password" class="login-form__input" placeholder="Введите пароль">
                                <i class="far fa-eye" id="togglePassword">
                                    <img src="icons/eye.png" alt="eyebtn">
                                </i>
                            </div>
                            <button type="submit" class="login-form__button login-form__button--primary">начать</button>
                        </form>
    `
}
const originalContent = formWrapper.innerHTML;
const userBtn = document.querySelector('#userbtn'),
    operBtn = document.querySelector('#operbtn');
operBtn.addEventListener('click',()=>{
    userBtn.classList.remove('popup__btns__active');
    operBtn.classList.add('popup__btns__active');
    updateForm()
})
userBtn.addEventListener('click',()=>{
    operBtn.classList.remove('popup__btns__active');
    userBtn.classList.add('popup__btns__active');
    updateForm();
    eye();
    

})


function updateForm() {
    if (userBtn.classList.contains('popup__btns__active')) {
      formWrapper.innerHTML = originalContent; 
    } else if (operBtn.classList.contains('popup__btns__active')) {
        changeFormToOper(formWrapper)
        eye();
    }
  }




function userFormsSwitcher(){
    formWrapper.addEventListener('click', (event) => {
        if (event.target.id === 'goToLog') {
            formWrapper.innerHTML = originalContent; 
            eye();
        } else if (event.target.id === 'goToReg') {
            changeFormToReg(formWrapper); 
            eye();

        }
    });
}
userFormsSwitcher();
eye();