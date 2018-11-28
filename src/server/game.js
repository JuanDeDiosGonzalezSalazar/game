const io = require('socket.io')()
const chalk = require('chalk')

const port = 3101

io.on('connection',  (socket) => {
    console.log('A player has joined the general room')
})

console.log(chalk.cyan('Starting ' + chalk.yellow('game server...')))
io.listen(port)
console.log(chalk.green(chalk.yellow('Game server') + chalk.cyan(' started at port ') + chalk.yellow(port)))