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
            route = ymaps.route([startPoint, endPoint], {
                mapStateAutoApply: true,
                traffic: true // Включаем учет пробок
            }).then(function (r) {
                map.geoObjects.add(r);
                console.log("Маршрут с пробками построен:", r.getPaths());
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
    });
}