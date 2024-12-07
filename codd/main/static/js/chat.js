const inputChat = document.querySelector('.chat__skin__right__messageinput__in2__text');
const form = document.querySelector('.chat__skin__right__messageinput__in2');
const smbBTN = document.querySelector('.chat__skin__right__messageinput__in2__btn')
const cont = document.querySelector('.chat__skin__right__mess')


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


    smbBTN.addEventListener('click', (e) => {
        const text = document.querySelector('.chat__skin__right__messageinput__in2__text')
        const userid = userData.userid
        fetch('', {

            method: "POST",
            body: JSON.stringify({
              'userid':userid,
              'type':'addMessageToDB',
              'message': text
            }),
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then((response) => {
            return response.json();
          })
          .then(data => {
            for (const key in data) {
              console.log(`${key}: ${data[key]}`);
          }
            console.log(data);
          })
          .catch(error => {
            console.error('Ошибка:', error);
          });
    });

