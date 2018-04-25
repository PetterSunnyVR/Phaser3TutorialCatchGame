var config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scene: [LoadingScene, LevelScene]
};

var game = new Phaser.Game(config);
//by passing scene class names in the config upon creating Phaser.Game it automatically creates our scenes
//we can check it by typing "game.scene.scenes" in the console
//the first scene in the scene array is started