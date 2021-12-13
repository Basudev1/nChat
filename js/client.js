const socket = io('http://localhost:4000');
const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInp');
const msgContainer = document.querySelector('.container');
const usernm = prompt('Enter Your Name:');
const append = (message, position) =>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);

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