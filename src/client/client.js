window.onload = () => {
    console.log('Joining game server')

    const socket = io('http://localhost:3101')

    socket.on('connect', () => {
        console.log('You are in general room')
    })
}