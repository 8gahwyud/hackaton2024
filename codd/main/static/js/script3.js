ymaps.ready(init);

let startPoint = null;  // Начальная точка
let endPoint = null;    // Конечная точка
let route = null;       // Построенный маршрут

function init() {
    const map = new ymaps.Map("map", {
        center: [45.0352, 38.9753],  // Центр карты (Краснодар)
        zoom: 10,
        controls: ['searchControl', 'typeSelector', 'zoomControl', 'trafficControl']
    });

    const timeElement = document.querySelector(".pickPath__map__imgwrapper__mincount");
    const workloadElement = document.querySelector(".pickPath__map__footer__workload__count");

    // Функция для вывода уровня загруженности города
    function logTrafficLevel() {
        const trafficProvider = new ymaps.traffic.provider.Actual();
        trafficProvider.state.events.add('change', function () {
            const trafficLevel = trafficProvider.state.get('level');
            const validTrafficLevel = trafficLevel != null ? Math.floor(trafficLevel) : 0; // Проверка на null
            console.log(`Текущий уровень загруженности города: ${validTrafficLevel}/10`);
            workloadElement.textContent = validTrafficLevel; // Обновляем значение на странице
        });
        trafficProvider.setMap(map);
    }

    // Функция для добавления точки
    function addPoint(coords, type) {
        const placemark = new ymaps.Placemark(coords, {}, {
            preset: type === "start" ? "islands#greenDotIcon" : "islands#redDotIcon",
            draggable: true
        });

        placemark.events.add('dragend', function (e) {
            const newCoords = e.get('target').geometry.getCoordinates();
            if (type === "start") startPoint = newCoords;
            if (type === "end") endPoint = newCoords;
            console.log("Координаты после перетаскивания:", newCoords);
            updateRoute(); // Обновить маршрут после изменения точки
        });

        map.geoObjects.add(placemark);
        return placemark;
    }

    // Функция для обновления маршрута
    function updateRoute() {
        if (startPoint && endPoint) {
            if (route) {
                map.geoObjects.remove(route); // Удаляем старый маршрут
            }
            // Создаем новый маршрут с учетом пробок
            ymaps.route([startPoint, endPoint], {
                mapStateAutoApply: true,
                traffic: true // Включаем учет пробок
            }).then(function (r) {
                route = r;
                map.geoObjects.add(route);

                // Вывод информации о времени маршрута
                const timeWithTraffic = Math.round(route.getJamsTime() / 60); // время в минутах
                const timeWithoutTraffic = Math.round(route.getTime() / 60); // время без пробок
                console.log(`Маршрут построен. Время в пути: ${timeWithTraffic} мин (с пробками), ${timeWithoutTraffic} мин (без пробок).`);

                // Обновляем значение времени на странице
                timeElement.textContent = timeWithTraffic;
            });
        }
    }

    // Обработка кликов на карту
    map.events.add('click', function (e) {
        const coords = e.get('coords');

        if (!startPoint) {
            startPoint = coords;
            addPoint(coords, "start");
        } else if (!endPoint) {
            endPoint = coords;
            addPoint(coords, "end");
        }

        // Обновить маршрут, если обе точки заданы
        updateRoute();

        // Выводим координаты в консоль
        console.log("Начальная точка:", startPoint);
        console.log("Конечная точка:", endPoint);
    });

    // Очистка точек и маршрута
    document.getElementById('clearRoute').addEventListener('click', function () {
        startPoint = null;
        endPoint = null;
        map.geoObjects.removeAll();
        if (route) {
            map.geoObjects.remove(route);
        }
        console.log("Точки и маршрут очищены");

        // Сброс значений на странице
        timeElement.textContent = "0";
        workloadElement.textContent = "0";
    });

    // Логируем уровень загруженности города при запуске
    logTrafficLevel();
}
