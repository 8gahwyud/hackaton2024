ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [55.751574, 37.573856], // Москва
        zoom: 10
    });

    let points = []; // Массив точек маршрута

    // Обработчик клика по карте
    map.events.add('click', function (e) {
        const coords = e.get('coords');
        addPoint(coords);
    });

    function addPoint(coords) {
        points.push(coords);

        // Добавляем точку на карту
        const placemark = new ymaps.Placemark(coords, {}, {
            draggable: true // Возможность перетаскивать точку
        });

        // При перетаскивании пересчитываем маршрут
        placemark.events.add('dragend', function (e) {
            const index = points.indexOf(coords);
            points[index] = placemark.geometry.getCoordinates();
            calculateRoute();
        });

        map.geoObjects.add(placemark);

        if (points.length > 1) {
            calculateRoute();
        }
    }

    function calculateRoute() {
        ymaps.route(points).then(
            function (route) {
                map.geoObjects.removeAll(); // Удаляем предыдущие маршруты
                map.geoObjects.add(route); // Добавляем новый маршрут
                points.forEach(point => map.geoObjects.add(new ymaps.Placemark(point)));
            },
            function (error) {
                alert('Ошибка построения маршрута: ' + error.message);
            }
        );
    }
}