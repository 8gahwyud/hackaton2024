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
  const storedData = JSON.parse(localStorage.getItem('user')),
    points = document.querySelector('.lk__points__amount'),
    name_lk = document.querySelector('.lk__fio__obj__name');
  if(storedData){
    if(storedData.adminAuth){
      document.querySelector('.lk__points').remove();
      name_lk.innerHTML = storedData.username;
      document.querySelector('.lk__fio__obj__surname').remove();
      document.querySelector('.lk__fio__obj__patronymic').remove();
      document.querySelector('.lk__downwrapper').remove();
    }else if(!storedData.adminAuth){
      console.log(storedData)
      name_lk.innerHTML = storedData.username;
      points.innerHTML = storedData.points
    }
    }else{
        console.log('нету тут нихуя')
    }
const quitBtn = document.querySelector('.lk__quitbtn');
quitBtn.addEventListener('click',()=>{
  localStorage.clear(); 
})
// //     async function getData() {
// //       const url = '';
// //       const data = JSON.parse(localStorage.getItem('user'));
// //       const req = ({'userid':data.userid})
// //       console.log(req)

// //       try {
// //         const response = await fetch(url,{
// //           method: "POST",
// //           body: req,
          
// //         });
// //         if (!response.ok) {
// //           throw new Error(`Response status: ${response.status}`);
// //         }
// //         const json = await response.json();
// //         console.log(json);
// //       } catch (error) {
// //         console.error(error.message);
// //       }
// //     } 
// // getData()






// const localdata =  JSON.parse(localStorage.getItem('user'))
// const data = ({'userid': localdata.userid}) 
// fetch('', {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//       "Content-Type": "application/json"
//   }
// })
// .then((response) => {
//   console.log(1)
//   return response.json();
// })
// .then(data => {
//   console.log(data);
// })
// .catch(error => {
//   console.error('Ошибка:', error);
// });








// try {
  // console.log(data)
  // const response = fetch('', { 
  //     method: 'POST', 
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: data,
  // });

  // // Проверяем статус ответа
  // if (!response.ok) {
  //     throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
  // }

  // Парсим только если ответ действительно JSON
  // const contentType = response.headers.get('content-type');
  // if (contentType && contentType.includes('application/json')) {
  //     const result = await response.json();
  //     console.log(data)
  //     console.log('Успешно отправлено:', result);
  // } else {
  //     throw new Error('Ответ сервера не в формате JSON');
  // }
// } catch (error) {
//   console.error('Ошибка запроса:', error.message);
//   alert(`Ошибка: ${error.message}`);
// }