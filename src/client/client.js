console.log('test')
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

        let player;
        let velocity = 256;
        let cursors;

        function preload() {
            game.load.image('ground', '/assets/ground.png');
            game.load.image('tree', '/assets/tree.png')
            game.load.spritesheet('player', '/assets/player.png', 64, 64);       
        }
        
        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // GROUND
            game.add.sprite(0, 0, 'ground');
            
            // TREES
            trees = game.add.group();        
            trees.enableBody = true;
            const group_trees = [];
            group_trees.push(trees.create(game.world.width * 0.25, game.world.height * 0.5 - 64, 'tree'));
            group_trees.push(trees.create(game.world.width * 0.5, game.world.height * 0.5 - 64, 'tree'));
            group_trees.push(trees.create(game.world.width * 0.75, game.world.height * 0.5 - 64, 'tree'));
            
            group_trees.forEach(tree => tree.body.immovable = true)

            // The player and its settings
            player = game.add.sprite(0, 0, 'player');
            player.animations.add('iddle', [0, 1], 5, true);
            game.physics.arcade.enable(player);

            cursors = game.input.keyboard.createCursorKeys();
        }
        
        function update() {
            game.physics.arcade.collide(player, trees);

            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            // player.animations.stop();
            // player.frame = 0;
            player.animations.play('iddle');

            if (cursors.up.isDown)
            {
                //  Move to the left
                player.body.velocity.y = -velocity;
            }
            else if (cursors.down.isDown)
            {
                //  Move to the right
                player.body.velocity.y = velocity;
            }

            if (cursors.left.isDown)
            {
                //  Move to the right
                player.body.velocity.x = -velocity;
            }else if(cursors.right.isDown){
                player.body.velocity.x = velocity;
            }
        }
    }
}