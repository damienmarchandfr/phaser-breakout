import Phaser from 'phaser';

export class Level {
    public name : string = ''
    public data : string[] = []

    constructor(fileContent : string){
        const plain = JSON.parse(fileContent)

        this.name = plain.name || ''
        this.data = plain.data || []

    }

    init(scene: Phaser.Scene){
        
    }
}