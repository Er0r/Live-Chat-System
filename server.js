const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 



app.get('/', (req, res) => {
  res.render('index');
})

io.on('connect', socket => {
  console.log('User Connected')

  

  socket.on('chat message', msg => {
    let usermsg = `${msg['msg']} Sender: ${msg['user']} \r\n`;
    fs.appendFile('./.data/chat.txt', usermsg, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})