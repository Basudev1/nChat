const socket = io("https://nchat-production.up.railway.app");
// const socket = io("http://localhost:3000");
const form = document.getElementById("send-container");
const msgInput = document.getElementById("msgInp");
const msgContainer = document.querySelector(".container");
const usernm = prompt("Enter Your Name:");
var audio = new Audio("ting.mp3");
let type = document.getElementById("type");
// type.innerText = "none";

const append = (message, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = message;
  msgElement.classList.add("message");
  msgElement.classList.add(position);
  msgContainer.append(msgElement);
  if (position == "left") {
    audio.play();
  }
};

function typing() {
  console.log(`username: ${usernm} "Typing" `);
  // socket.emit("typing", usernm);
}

msgInput.addEventListener("keypress", function () {
  socket.emit("typing", usernm);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = msgInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  msgInput.value = "";
});

socket.emit("new-user-joined", usernm);

socket.on("user-joined", (usernm) => {
  append(`${usernm} joined the chat`, "right");
});

socket.on("receive", (data) => {
  type.innerHTML = "";
  append(`${data.usernm}: ${data.message}`, "left");
});

socket.on("left", (usernm) => {
  append(`${usernm} left the chat`, "right");
});
socket.on("typing", (usernm) => {
  // append(`${usernm} Typing`);
  type.innerHTML = `<p>${usernm} is typing...</p>`;
});
