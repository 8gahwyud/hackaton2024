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
  let block = cont.appendChild(document.createElement('div'))
  block.classList.add('chat__skin__right__mess__forms__user');
  let message = data['AdminssMessage'][0].messageText; 
  console.log(message); 
  block.innerText = message


for (let i = 0; i < message.length - 1; i++) {
  for (let j = 0; j < message.length - 1 - i; j++) {
      if (new Date(message[j].messageDateTime) > new Date(message[j + 1].messageDateTime)) {
          const temp = message[j];
          message[j] = message[j + 1];
          message[j + 1] = temp;
        }
    }
}



})
//
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

            console.log(data);
          })
          .catch(error => {
            console.error('Ошибка:', error);
          });
    });