// document.querySelectorAll('.favorite__menu__header').forEach(function(header) {
//     header.addEventListener('click', function() {
//       const content = header.nextElementSibling; // Получаем следующий элемент после заголовка (контент меню)
//       const toggle = header.querySelector('.favorite__menu__toggle'); // Находим кнопку toggle внутри текущего заголовка
  
//       content.classList.toggle('favorite__menu__content--active');
  
//       // Меняем стрелку направления
//       if (content.classList.contains('favorite__menu__content--active')) {
//         toggle.innerHTML = '<img src="../static/icons/arrowup.png" alt="arrowup">'; // Стрелка вверх
//       } else {
//         toggle.innerHTML = '<img src="../static/icons/arrowdown.png" alt="arrowdown">'; // Стрелка вниз
//       }
//     });
//   });

















const localdata = JSON.parse(localStorage.getItem('user'));
const data = { userid: localdata.userid };

// Функция для создания маршрута и карты с дополнительными действиями
function createRouteElement(route, index) {
  // Добавляем функцию в объект маршрута
  route.calculateDistance = function() {
    try {
      const startPoint = JSON.parse(route.startPoint);
      const endPoint = JSON.parse(route.endPoint);
      const start = ymaps.geocode([startPoint[0], startPoint[1]]);
      const end = ymaps.geocode([endPoint[0], endPoint[1]]);

      start.then(startGeo => {
        end.then(endGeo => {
          const startCoords = startGeo.geoObjects.get(0).geometry.getCoordinates();
          const endCoords = endGeo.geoObjects.get(0).geometry.getCoordinates();
          const distance = ymaps.coordSystem.geo.getDistance(startCoords, endCoords);
          console.log(`Расстояние между точками: ${distance} метров`);
        });
      });
    } catch (error) {
      console.error("Ошибка при расчете расстояния:", error.message);
    }
  };

  // Создаем структуру HTML для маршрута
  const routeElement = document.createElement('div');
  routeElement.classList.add('favorite__menu');
  
  routeElement.innerHTML = `
    <div class="favorite__menu__header">
      <span>${route.pathName}</span>
      <button class="favorite__menu__toggle"><img src="../static/icons/arrowdown.png" alt="arrowdown"></button>
    </div>
    <div class="favorite__menu__content">
      <div class="favorite__menu__map" id="map-${index}"></div>
      
      <div class="route">

        <div class="point start"></div>
        <div class="line"></div>
        <div class="point end"></div>
      </div>
      
      
      <div class="favorite__menu__botomwrapper">
        <div class="favorite__menu__incidents">
          <div class="favorite__menu__incidents__header">происшествия</div>
          <div class="favorite__menu__incidents__descr">Не найдены</div>
          <img src="../static/icons/whitewarning.png" alt="warning">
        </div>
        <div class="favorite__menu__notification">
          <div class="favorite__menu__notification__header">уведомлять</div>
          <div class="favorite__menu__notification__descr">о происшествиях на маршруте</div>
        </div>
        <label class="switch">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
      </div>
    </div>
  `;

  // Добавляем элемент на страницу
  document.querySelector('.favorite__menu__maps-container').appendChild(routeElement);

  // Инициализируем карту для маршрута
  ymaps.ready(() => {
    const map = new ymaps.Map(`map-${index}`, {
      center: [45.05, 39.03], // Центр карты
      zoom: 11,
    });

    try {
      const startPoint = JSON.parse(route.startPoint);
      const endPoint = JSON.parse(route.endPoint);

      ymaps.route([startPoint, endPoint], {
        avoidTrafficJams: true,
      }).then(route => {
        map.geoObjects.add(route);
        map.setBounds(route.getBounds(), { checkZoomRange: true });
      }).catch(error => {
        console.error("Ошибка построения маршрута:", error.message);
      });
    } catch (error) {
      console.error("Ошибка обработки данных маршрута:", error.message);
    }
  });

  // Вызываем функцию для расчета расстояния
  route.calculateDistance();
}

// Функция для открытия/закрытия содержимого маршрута
function setupToggle() {
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
}

// Выполняем запрос на сервер и строим маршруты
fetch('', {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(response => response.json())
  .then(data => {
    // Преобразуем объект в массив
    const routes = Object.values(data);

    // Для каждого маршрута создаем объект на странице
    routes.forEach((route, index) => {
      createRouteElement(route, index);
    });

    // Настроим обработку кликов на заголовки
    setupToggle();
  })
  .catch(error => {
    console.error("Ошибка получения данных:", error.message);
  });