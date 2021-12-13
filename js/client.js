const socket = io('http://localhost:4000');
const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector('.container');
const usernm = prompt('Enter Your Name:');
var audio = new Audio('ting.mp3');

const append = (message, position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    if(position == 'left'){
        audio.play();
}
       

}

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
})

socket.emit('new-user-joined', usernm);

socket.on('user-joined', usernm=>{
append(`${usernm} joined the chat`, 'right');
});


socket.on('receive', data=>{
append(`${data.usernm}: ${data.message}`, 'left');
});

socket.on('left', usernm=>{
    append(`${usernm} left the chat`, 'right');}
)