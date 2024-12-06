window.addEventListener('DOMContentLoaded', () =>{
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
                        <form id="form" action="#">
                            <input type="username" id="username" name="username" class="login-form__input" placeholder="Имя">
                            <input type="email" id="email" name="email" class="login-form__input" placeholder="Почта">
                            <div class="login-form__password">
                                <input type="password" id="id_password" name="password" class="login-form__input" placeholder="Введите пароль">
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
                        <form id="form" action="#">
                            <input type="username" id="username" name="username" class="login-form__input" placeholder="Имя">
                            <input type="email" id="email" name="email" class="login-form__input" placeholder="Почта">
                            <div class="login-form__password">
                                <input type="password" id="id_password" name="password" class="login-form__input" placeholder="Введите пароль">
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
    operBtn = document.querySelector('#operbtn'),
    form = document.querySelector('#form');
operBtn.addEventListener('click',()=>{
    userBtn.classList.remove('popup__btns__active');
    operBtn.classList.add('popup__btns__active');
    updateForm();

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
        const form = document.querySelector('#form');
        postData(form);
        
    }
  }




function userFormsSwitcher(){
    formWrapper.addEventListener('click', (event) => {
        if (event.target.id === 'goToLog') {
            formWrapper.innerHTML = originalContent; 
            eye();
            const form = document.querySelector('#form');
            postData(form);
           
        } else if (event.target.id === 'goToReg') {
            changeFormToReg(formWrapper); 
            eye();
            const form = document.querySelector('#form');
            postData(form)

        }
    });
}

function postData(form1){
    form1.addEventListener('submit', (e) =>{
        e.preventDefault();
        const type = document.querySelector(".login-form__title")
        const req = {
            type: type.innerHTML,
        }
        const formData = new FormData(form1);
        for (var [key, value] of formData.entries()) {
            req[key]  = value
          }
          console.log(req)
            fetch('auth/',{
                method: "POST",
                body:JSON.stringify(req),
                headers:
                {
                "Content-Type":"application/json"
                }
                })
                .then((response) => {
                    return response.json()
                })
                .then(data => console.log(data))
                form.reset();

           
          
    })

}
async function loadData() {
    try {
      // Запрашиваем данные с сервера
      const response = await fetch('auth/');
      
      if (response.ok) {
        const data = await response.json(); // Получаем данные
        // Сохраняем данные в localStorage в виде строки JSON
        localStorage.setItem('serverData', JSON.stringify(data));
        console.log(localStorage.getItem('serverData'))
      } else {
       console.log('Ошибка загрузки данных.')
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  // Функция для открытия страницы на бэкенде и использования сохранённых данных
  function openBackendPage() {
    // Получаем данные из localStorage
    const savedData = JSON.parse(localStorage.getItem('serverData'));
    const lkLink = document.querySelector('#lk_link');
  
    if (savedData) {
      console.log('Сохраненные данные:', savedData);
      // Перенаправляем на страницу бэкенда или используем данные в логике
      lkLink.href = 'lk/';
      loginBtn.removeEventListener();
    } else {
      console.log('Данные не найдены в localStorage');
    }
  }
  
  
userFormsSwitcher();
eye();
postData(form);
// openBackendPage();
// loadData();
});




