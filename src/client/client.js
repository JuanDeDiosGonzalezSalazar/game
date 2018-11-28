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

window.onload = () => {
    console.log('Joining game server')

    const socket = io('http://localhost:3101')
    let reconnect = false;

    socket.on('connect', () => {
        if(reconnect){
            return;
        }

        reconnect = true
        console.log('You are in general room')
        startGame()
    })

    function startGame(){
        console.log("Starting game...")
        const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update})

        const player = new Player(socket.id, socket);
        let cursors;
        let world = {
            width: 1920,
            height: 1920
        }

        function preload() {
            game.load.image('ground', '/assets/ground.png');
            game.load.image('tree', '/assets/tree.png')
            game.load.spritesheet('player', '/assets/player.png', 64, 64);       
        }
        
        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // GROUND
            game.add.tileSprite(-world.width/2, -world.height/2, world.width, world.height, 'ground');
            game.world.setBounds(-world.width/2, -world.height/2, world.width, world.height)
            
            // TREES
            trees = game.add.group();        
            trees.enableBody = true;
            const group_trees = [];
            group_trees.push(trees.create(-game.world.width * 0.25 - 48, -48, 'tree'));
            group_trees.push(trees.create(-48, -48, 'tree'));
            group_trees.push(trees.create(game.world.width * 0.25 - 48, -48, 'tree'));
            
            group_trees.forEach(tree => tree.body.immovable = true)

            // The player and its settings
            player.sprite = game.add.sprite(-32, -32, 'player');
            player.sprite.animations.add('iddle', [0, 1], 5, true);
            game.physics.arcade.enable(player.sprite);
            game.camera.follow(player.sprite)

            cursors = game.input.keyboard.createCursorKeys();
        }
        
        function update() {
            game.physics.arcade.collide(player.sprite, trees);

            player.sprite.body.velocity.x = 0;
            player.sprite.body.velocity.y = 0;
            // player.sprite.animations.stop();
            // player.sprite.frame = 0;
            player.sprite.animations.play('iddle');

            if (cursors.up.isDown)
            {
                player.sprite.body.velocity.y = -player.velocity.y;
            }
            else if (cursors.down.isDown)
            {
                player.sprite.body.velocity.y = player.velocity.y;
            }

            if (cursors.left.isDown)
            {
                player.sprite.body.velocity.x = -player.velocity.x;
            }else if(cursors.right.isDown){
                player.sprite.body.velocity.x = player.velocity.x;
            }
        }
    }
}