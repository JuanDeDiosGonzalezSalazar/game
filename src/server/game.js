const io = require('socket.io')()
const chalk = require('chalk')
const Player = require('./models/player')

const port = 3101
const players = []

io.on('connection',  (socket) => {
    console.log('A player has joined the general room')

    const player = new Player(socket.id, socket);

    console.log("Player:", player)

    players.push(player)
})

console.log(chalk.cyan('Starting ' + chalk.yellow('game server...')))
io.listen(port)
console.log(chalk.green(chalk.yellow('Game server') + chalk.cyan(' started at port ') + chalk.yellow(port)))