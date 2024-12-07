const inputChat = document.querySelector('.chat__skin__right__messageinput__in2__text');
const form = document.querySelector('#form');
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

  for (const key in data){
    let message = data[key]
  let block = cont.appendChild(document.createElement('div'))

  if (message.AdminReplyID === 1) {
    block.classList.add('chat__skin__right__mess__forms__operator');
    block.innerText=message.MessageText
  } else {
    block.classList.add('chat__skin__right__mess__forms__user');
    block.innerText=message.MessageText

  }

  }
  
  // block.classList.add('chat__skin__right__mess__forms__user');




})
//
.catch(error => {
  console.error('Ошибка:', error);
});


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const text = document.querySelector('.chat__skin__right__messageinput__in2__text').innerText
        const userid = userData.userid
        console.log(text)
        req={'userid':userid,
              'type':'addMessageToDB',
        }
        const formData = new FormData(form);
        for (var [key, value] of formData.entries()) {
          req[key] = value;
          console.log(value)
      }
        fetch('', {

            method: "POST",
            body: JSON.stringify(req),
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