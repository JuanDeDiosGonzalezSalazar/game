class Player{
    constructor(id, socket){
        this.id = id;
        this.position = {
            x: -32,
            y: -32
        };
        this.velocity = {
            x: 256,
            y: 256
        };
        this.socket = socket;
    }

    sanitize(){
        let player = {
            id: this.id,
            position: this.position
        };

        return player;
    }
}

module.exports = Player