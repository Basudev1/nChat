//node server that is responsible for handlinging socket.io connections
const io = require('socket.io')(4000, {
    cors: {
      origin: '*',
    }
  });
const users = {}
io.on('connection', socket =>{
    socket.on('new-user-joined', usernm =>{
        console.log("New User", usernm);
        users[socket.id] = usernm;
        socket.broadcast.emit('user-joined', usernm);
        
    });
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, usernm: users[socket.id]});
    })
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', message)
    })
})
