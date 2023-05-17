const socket = io();

let username = "";
document.getElementById("join-btn").addEventListener("click", (e) => {
  e.preventDefault();
  username = document.getElementById("username-input").value;
  if (username.trim() != "") {
    document.querySelector(".form-username").style.display = "none";
    document.querySelector(".chatroom-container").style.display = "block";
  }
});

document.getElementById("send-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    username: username,
    message: document.getElementById("message-input").value,
  };
  socket.emit("message", data);
  addMessage(data, true);
});

socket.on("message", (data) => {
  if (data.username !== username) {
    addMessage(data, false);
  }
});

function addMessage(data, check) {
  let msgDiv = document.createElement("div");
  msgDiv.innerText = `${data.username}: ${data.message}`;
  if (check) {
    msgDiv.setAttribute("class", "message sent");
  } else {
    msgDiv.setAttribute("class", "message recieved");
  }
  document.getElementById("messages-container").appendChild(msgDiv);
}
