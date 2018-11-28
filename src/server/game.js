const io = require('socket.io')()

const port = 3101

io.on('connection',  (socket) => {
    console.log('A player has joined the general room')
})

console.log('Starting game server...')
io.listen(port)
console.log('Game server started at port ' + port)