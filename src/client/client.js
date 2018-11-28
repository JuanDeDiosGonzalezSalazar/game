window.onload = () => {
    console.log('Joining game server')

    const socket = io('http://localhost:3101')

    socket.on('connect', () => {
        console.log('You are in general room')
        startGame()
    })

    function startGame(){
        console.log("Starting game...")
        const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update})
        
    }
}