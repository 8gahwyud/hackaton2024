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
// функция для открытия модалки с регом
function handleLoginClick(){
    body.style.overflow = 'hidden';
    document.body.classList.add("no-scroll");
    popupOverlay.classList.remove('close');
    popupOverlay.classList.add('active');
}

loginBtn.addEventListener('click',handleLoginClick)

function changeFormToReg(form){
    form.innerHTML = `
                            <div class="login-form__title">регистрация</div>
                        <form id="form" action="#">
                            <input type="username" id="username" name="username" class="login-form__input" placeholder="Имя">
                            <input type="email" id="email" name="email" class="login-form__input" placeholder="Почта">
                            <div class="login-form__password">
                                <input type="password" id="id_password" name="password" class="login-form__input" placeholder="Введите пароль">
                                <i class="far fa-eye" id="togglePassword">
                                    <img src="/static/icons/eye.png" alt="eyebtn">
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
                                    <img src="/static/icons/eye.png" alt="eyebtn">
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
// localStorage.clear();    
function postData(form1) {
    form1.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.querySelector(".login-form__title");
        const req = {
            type: type.innerHTML,
        };
        const formData = new FormData(form1);
        for (var [key, value] of formData.entries()) {
            req[key] = value;
        }
        console.log(req);
        fetch('auth/', {
            method: "POST",
            body: JSON.stringify(req),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Сохранение данных в localStorage
            // localStorage.clear();
            localStorage.setItem('user', JSON.stringify(data));
            location.reload()
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });

        form1.reset();
    });
}
const userData = JSON.parse(localStorage.getItem('user')),
    name = document.querySelector('.header__login__name'),
    lk_link = document.querySelector('#lk_link'),
    points = document.querySelector('.lk__points__amount');
    if(userData){
        const allData = document.querySelector('.promo__allwrapper');
        allData.innerHTML = ''
        if(userData.adminAuth){
            document.querySelector('#lk_photo').src = 'static/icons/operator.png'
            allData.innerHTML = `
        <section class="oper">
            <div class="oper__wrapper">
                <div class="oper__tittle__wrapper">
                    <img src="static/img/map.png" alt="">
                    <button class="oper__openmapbtn"><a href="#">открыть карту</a></button>
                </div>
            </div>
        </section>
        <section class="oper__actions">
            <div class="oper__actions__wrapper">
                <div class="oper__actions__btn oper__actions__btn__photo">
                    <a href="#">
                        <p>посмотреть <br> происшествия</p>
                        <div class="arrow"></div>
                    </a>
                </div>
                <div class="oper__actions__btn oper__actions__btn__photo">
                    <a href="#">
                        <p>посмотреть обращения</p>
                        <div class="arrow"></div>
                    </a>
                </div>
            </div>
            
            <div class="oper__event">
                <h2 class="oper__event__header">ОЖИДАЕМЫЕ события в городе</h2>
                <div class="oper__event__wrapper">
                    <div class="oper__event__obj">
                        <span class="oper__event__obj__adress">Стадион ФК Краснодар</span>
                        <span class="oper__event__obj__possibleproblem">Возможна пробка по ул. Красная</span>
                        <div class="oper__event__bottomwrapper">
                            <div class="oper__event__bottomwrapper__textwrap">
                                <span class="oper__event__obj__name">Футбольный матч</span>
                                <span class="oper__event__obj__time">Вс, 08.12 21:30</span>
                            </div>
                            <div class="oper__event__obj__waiting_workload">ОЖИДАЕМАЯ <br> ЗАГРУЖЕННОСТЬ <span>9</span></div>
                        </div>
                    </div>
                    <div class="oper__event__obj">
                        <span class="oper__event__obj__adress">Кроп Арена</span>
                        <span class="oper__event__obj__possibleproblem">Возможна пробка по ул. Северная</span>
                        <div class="oper__event__bottomwrapper">
                            <div class="oper__event__bottomwrapper__textwrap">
                                <span class="oper__event__obj__name">Концерт Saluki</span>
                                <span class="oper__event__obj__time">Сб, 07.12 20:00</span>
                            </div>
                            <div class="oper__event__obj__waiting_workload">ОЖИДАЕМАЯ <br> ЗАГРУЖЕННОСТЬ <span>6</span></div>
                        </div>
                    </div>
                </div>
                <button class="oper__event__wantmore">увидеть еще</button>
            </div>
        </section>
        `
        }else if(!userData.adminAuth){
            allData.innerHTML = `
            <section class="promo">
                <div class="promo__wrapper">
                    <div class="promo__tittle__wrapper">
                        <h1 class="promo__tittle">Снижайте загруженность дорог и улучшайте <br> логистику региона</h1>
                    </div>
                    <div class="promo__descr__wrapper">
                        <p class="promo__descr">
                            Город без пробок — одна из самых актуальных и повсеместных проблем городов. 
                            Пробки ведут к экономическим убыткам, ухудшают экологическую обстановку и 
                            оказывают негативное влияние на качество жизни горожан, провоцируя стресс.
                        </p>
                    </div>
                </div>
            </section>
            <section class="actions">
                <div class="actions__wrapper">
                    <div class="actions__btn actions__btn__photo">
                        <a href="fvp/">
                            <p>смотрите <br> избранные маршруты</p>
                            <div class="arrow"></div>
                        </a>
                    </div>
                    <div class="actions__btn actions__btn__photo">
                        <a href="pickpath/">
                            Выбирайтe <br> оптимальный маршрут
                            <div class="arrow"></div>
                        </a>
                    </div>
                </div>
                
                <div class="actions__btn actions__btn__send">
                    <a href="operform/">
                        <div class="actions__btn__tittle">сообщайте о происшествиях</div>
                        <div class="actions__btn__descr">Оператор быстро и эффективно решит возникшую проблему</div>
                        <div class="arrow"></div>
                    </a>
                </div>
            </section>
            `
        }
    name.innerHTML = userData.username;
    lk_link.href = 'lk/'
    loginBtn.removeEventListener('click',handleLoginClick);
    // points.innerHTML = userData.points
    }else{
        console.log('нету тут ybxtu')
    }

  
userFormsSwitcher();
eye();
postData(form);

});




