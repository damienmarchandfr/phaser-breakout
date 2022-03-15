import Phaser from 'phaser';

export class HowScene extends Phaser.Scene {
    private escapeKey : Phaser.Input.Keyboard.Key | null = null
    
    constructor() {
        super('HowScene');
    }

    preload() {
        this.load.image('player', 'assets/player.png');
    }

    create(){
        const clone = document.getElementById('how')?.cloneNode(true) as HTMLElement
        clone.style.display = "block"
        
        this.add.dom(this.cameras.default.width / 2, this.cameras.default.height / 2,clone)

        this.escapeKey = this.input.keyboard.addKey('ESC')
        this.escapeKey.on('down', ()=> { 
          this.scene.start('MenuScene')
        });
    
    }
}