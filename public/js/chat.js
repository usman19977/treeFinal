const url = `http://localhost:3000`;
var socket = io.connect(url);

const chatQuery = +window.location.search?.split('chat')[1]?.split('=')[1] || 1;
console.log('url', url);
// var socket = io.connect(`ws://localhost:3000`, { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('connected');
  console.log(socket.id);
  socket.on('message', (data) => {
    console.log('data', data);
  });
  socket.on('newMessage', (data) => {
    const userId = document.getElementById('userIdValue');
    console.log('data', data);
    const messagesContainer = document.getElementById('chat');
    const message = document.createElement('div');
    message.classList.add('message');
    message.classList.add(
      userId.textContent.trim() === data.userId ? 'parker' : 'start'
    );
    message.textContent = data.newMessage.message;

    messagesContainer.appendChild(message);

    var chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const newMsgForm = document.getElementById('message-form');
  newMsgForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMsgInput = document.getElementById('newMsg');
    const username = document.getElementById('userIdValue');
    const newMsg = newMsgInput.value;
    console.log('username.textContent', username.textContent);

    console.log('newMsg', newMsg);
    socket.emit('newMessage', {
      message: newMsg,
      chatId: chatQuery,
      userId: +username.textContent,
    });

    newMsgInput.value = '';
  });
});
