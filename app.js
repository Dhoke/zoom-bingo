const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Set up server
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

let roomIsPaused = true

// TODO - Admin hello 
let toValidate = null

let players = []

// Configure web sockets
io.on("connection", (socket) => {
  console.log("New client connected");
  
  // Inform user if play is allowed
  socket.emit('hello', {roomIsPaused, players})

  // Ask for their name
  socket.emit('name')

  // Processes receival of given name
  socket.on('giveName', msg => {
    socket.name = msg
    console.log("Received name: ", msg)
    if (msg !== 'admin') players.push(msg)
    io.emit('players', players)
  })

  // Validate a players board
  socket.on('validate', msg => {
    io.emit('stop', "Checking for a winner...")
    io.emit('adminValidate', msg)
    console.log("Was asked to validate: ", msg)
  })

  // Admin methods
  socket.on('startGame', () =>{
    console.log("Game start requested")
    io.emit('start')
  })

  socket.on('pauseGame', () => {
    console.log('Game pause requested.')
    io.emit('stop', "Admin paused game...")
  })

  socket.on('winnerChosen', (winner) => {
    io.emit('stop')
    io.emit('winner', `${winner} has won! Congratulations!`)
  })

  // Finally, disconnect if needed
  socket.on('disconnect', () => {
    console.log("A player has disconnected!")
    if(socket.name !== undefined) {
      players = players.filter(n => n !== socket.name)
      io.emit('players', players)
    }
  })

});

server.listen(port, () => console.log(`Listening on port ${port}`));