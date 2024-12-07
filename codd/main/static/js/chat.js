const inputChat = document.querySelector('.chat__skin__right__messageinput__in2__text');
const form = document.querySelector('#form');


const userData = JSON.parse(localStorage.getItem('user'));
fetch('', {

  method: "POST",
  body: JSON.stringify({
    'userid':userData.userid,
    'type':'getMessages',
  }),
  headers: {
      "Content-Type": "application/json"
  }
})
.then((response) => {
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Ошибка:', error);
});