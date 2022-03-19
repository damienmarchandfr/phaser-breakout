import Phaser from 'phaser';

export function generateLevel(scene : Phaser.Scene,name : string){
    scene.load.text('currentLevel','assets/../levels/1.json')
    scene.load.start()
    console.log(scene.game.cache.text.get('currentLevel'))
}