import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {

  private cursorKey : Phaser.Types.Input.Keyboard.CursorKeys | null = null
  private player : Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null = null
  private ball : Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null = null
  private lifebarImages : Phaser.GameObjects.Image[]= []

  private playerSpeed = 260
  private playerLife = 10
  private score = 0

  private numberOfBlocks = 0
 
  private scoreText : Phaser.GameObjects.Text | null = null

  private escapeKey : Phaser.Input.Keyboard.Key | null = null

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('ball','assets/ball.png')
    this.load.image('block','assets/block.png')
    this.load.image('life','assets/life.png')
    this.load.image('no-life','assets/no-life.png')
  }

  create() {
    this.escapeKey = this.input.keyboard.addKey('ESC')
    this.escapeKey.on('down', ()=> { 
      this.scene.start('MenuScene')
    });

    this.physics.world.setBoundsCollision(true,true,true,false)
    
    this.player = this.physics.add.image(400,560,'player').setScale(1.5)
    this.player.body.setAllowGravity(false)
    this.player.setCollideWorldBounds(true)
    this.player.setPushable(false)
    
    this.ball = this.physics.add.image(400,500,'ball')
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1)

    this.cursorKey = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player,this.ball)

    this.initPlayer()
    this.initBall()
    this.initBlocks()
    this.initLifeBar()

    this.scoreText = this.add.text(20,20,'',{
      fontFamily: 'scoreFont',
      color: '#ff7b25'
    })

  }

  update(){
    const bonus = 250
    let spaceDown = this.cursorKey?.space.isDown
    if(this.cursorKey?.left.isDown){
      this.player?.body.setVelocity(spaceDown ? -this.playerSpeed - bonus : -this.playerSpeed,0)
    }
    if(this.cursorKey?.right.isDown){
      this.player?.body.setVelocity(spaceDown ? this.playerSpeed + bonus : this.playerSpeed,0)
    }

    if(this.player && this.ball){
      if(this.ball.y > this.player.y + 50){
        this.playerLife--
        this.updateLifeBar()
        this.initPlayer()
        this.initBall()

      }
    }


  
  }

  private initBall(){
    if(!this.ball) return

    this.ball.setPosition(400,500)

    // Random x velocity
    const xVelocity = Math.floor(Math.random() * 300) + 100;
    const xSign = Math.floor(Math.random() * 2) > 0 ? 1 : -1

    this.ball.setVelocity(xSign * xVelocity,-450)
  }

  private initPlayer(){
    if(!this.player) return

    this.player.setVelocity(0)
    this.player.setPosition(400,560)
  }

  private initBlocks(){
    this.numberOfBlocks = 22
    // Create all blocks
    for (let i = 0; i < 22; i++) {
      const block = this.physics.add.staticImage(64 + 32 * i,16,'block');

      if(this.ball)
        this.physics.add.collider(this.ball,block,()=>{
          block.destroy()
          this.numberOfBlocks--;
          this.score++
          this.scoreText?.setText(this.score.toString())
        })    
    }
  }

  private initLifeBar(){
    for (let i = 0; i < this.playerLife; i++) {
      const image = this.add.image(5 + i * 20,0,'life').setOrigin(0).setScale(2)    
      this.lifebarImages.push(image)
    }
  }

  private updateLifeBar(){
    // Destroy some image if life changed
    if(this.playerLife === this.lifebarImages.length) return

    if(this.lifebarImages[this.playerLife])
      this.lifebarImages[this.playerLife].setTexture('no-life')
  }
}
