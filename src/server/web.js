const express   = require('express')
const app       = express()
const chalk     = require('chalk')


const port = 3100

console.log(chalk.cyan("Starting") + chalk.magenta(" web server"))
app.use(express.static('src/client'))
app.use('/socket.io', express.static('node_modules/socket.io-client/dist'))
app.use('/phaser-ce', express.static('node_modules/phaser-ce'))

app.listen(port, () => console.log(chalk.magenta("Web server") + chalk.cyan(" running at port ") + chalk.magenta(port)))