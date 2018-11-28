const express   = require('express')
const app       = express()

const port = 3100

console.log("Starting web server")
app.use(express.static('src/client'))
app.use('/socket.io', express.static('node_modules/socket.io-client/dist'))

app.listen(port, () => console.log("Web server running at port " + port))