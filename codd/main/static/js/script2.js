document.querySelector('.userForm__form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

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

        if (response.ok) {
            const result = await response.json();
            console.log('Успешно отправлено:', result);

        } else {
            // console.log(result);
            console.error('Ошибка отправки:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
});
