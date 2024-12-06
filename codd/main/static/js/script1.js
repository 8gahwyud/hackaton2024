document.querySelectorAll('.favorite__menu__header').forEach(function(header) {
    header.addEventListener('click', function() {
      const content = header.nextElementSibling; // Получаем следующий элемент после заголовка (контент меню)
      const toggle = header.querySelector('.favorite__menu__toggle'); // Находим кнопку toggle внутри текущего заголовка
  
      content.classList.toggle('favorite__menu__content--active');
  
      // Меняем стрелку направления
      if (content.classList.contains('favorite__menu__content--active')) {
        toggle.innerHTML = '<img src="../static/icons/arrowup.png" alt="arrowup">'; // Стрелка вверх
      } else {
        toggle.innerHTML = '<img src="../static/icons/arrowdown.png" alt="arrowdown">'; // Стрелка вниз
      }
    });
  });
  const storedData = JSON.parse(localStorage.getItem('user')),
    points = document.querySelector('.lk__points__amount'),
    name_lk = document.querySelector('.lk__fio__obj__name');
  if(storedData){
    console.log(storedData.username)
    name_lk.innerHTML = storedData.username;
    points.innerHTML = storedData.points
    }else{
        console.log('нету тут нихуя')
    }
  