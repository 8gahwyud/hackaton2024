document.querySelector('.userForm__form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('operform/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }

        // Парсим только если ответ действительно JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            console.log('Успешно отправлено:', result);
            alert('Сообщение успешно отправлено!');
        } else {
            throw new Error('Ответ сервера не в формате JSON');
        }
    } catch (error) {
        console.error('Ошибка запроса:', error.message);
        alert(`Ошибка: ${error.message}`);
    }
});