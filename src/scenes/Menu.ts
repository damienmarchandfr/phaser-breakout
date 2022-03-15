import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create(){
        const clone = document.getElementById('menu')?.cloneNode(true) as HTMLElement
        clone.style.display = "block"

        this.add.dom(this.cameras.default.width / 2, this.cameras.default.height / 2,clone)

        document.getElementById('start-button')?.addEventListener('click',()=>{
            this.scene.start('GameScene')
        })

        document.getElementById('how-to-play-button')?.addEventListener('click',()=>{
            this.scene.start('HowScene')
        })
    }
}