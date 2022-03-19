import Phaser from 'phaser';
import {generateLevel} from '../level.helper'
import { Level } from '../models/Level';
export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload(){
        // Load all levels
        this.load.text('level.1','assets/levels/1.json')
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

        const content = this.cache.text.get('level.1')
        console.log(content)
        const level = new Level(content)
        console.log(level)
    }



    


}