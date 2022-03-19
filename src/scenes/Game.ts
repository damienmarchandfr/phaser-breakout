import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {

  private cursorKey : Phaser.Types.Input.Keyboard.CursorKeys | null = null
  private player : Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null = null
  private ball : Phaser.Types.Physics.Arcade.ImageWithDynamicBody | null = null
  private lifebarImages : Phaser.GameObjects.Image[]= []
  private floor : Phaser.GameObjects.Rectangle | null = null

  private playerSpeed = 260
  private playerLife = 10

  private score = 0
 
  private scoreText : Phaser.GameObjects.Text | null = null

  private escapeKey : Phaser.Input.Keyboard.Key | null = null

  private numberOfBlocksDestroyed = 0

  private mustReset = false

  private spikeFrequency = 250
  private spikeTimer = 0

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('ball','assets/ball.png')
    this.load.image('block','assets/block.png')
    this.load.image('life','assets/life.png')
    this.load.image('no-life','assets/no-life.png')
    this.load.image('small-spike','assets/small-spike.png')
  }

  create() {
    this.escapeKey = this.input.keyboard.addKey('ESC')
    this.escapeKey.on('down', ()=> { 
      this.scene.start('MenuScene')
    });

    this.floor = this.add.rectangle(0,this.cameras.default.height - 25,this.cameras.default.width,200).setOrigin(0)
    this.physics.add.existing(this.floor,true);
    
    this.player = this.physics.add.image(400,560,'player').setScale(1.5)

    this.player.setCollideWorldBounds(true)
    this.player.setPushable(false)
    
    this.ball = this.physics.add.image(400,500,'ball')
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1)

    this.cursorKey = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player,this.floor)

    this.initPlayer()
    this.initBall()
    this.initBlocks()
    this.initLifeBar()

    this.scoreText = this.add.text(20,20,'',{
      fontFamily: 'scoreFont',
      color: '#ff7b25'
    })
   
    this.physics.add.collider(this.ball,this.player,()=>{
      this.numberOfBlocksDestroyed = 0
    })

    this.physics.add.collider(this.ball,this.floor,()=>{
      this.mustReset = true
    })
  }

  update(){
    this.spikeTimer++

    if(this.spikeFrequency === this.spikeTimer){
      this.spikeTimer = 0
      const spike = this.physics.add.image(this.cameras.default.width + 50,this.cameras.default.height - 30,'small-spike').setScale(.45).setImmovable(false)
      spike.body.setAllowGravity(false)
      spike.setVelocityX(-200)
    

      if(this.player) {
        this.physics.add.collider(spike,this.player,()=>{
          spike.destroy()
          this.playerLife--
          this.updateLifeBar()
          
      
         
        
        })
      }


      
    }


    


    const bonus = 250
    let spaceDown = this.cursorKey?.space.isDown
    let upDown = this.cursorKey?.up.isDown
    const onFloor = this.player?.body.onFloor()

    let velocityX = this.player?.body.velocity.x || 0
    let velocityY = this.player?.body.velocity.y || 0

    if(this.cursorKey?.left.isDown){
      velocityX = spaceDown ? -this.playerSpeed - bonus : -this.playerSpeed
    }
    if(this.cursorKey?.right.isDown){
      velocityX = spaceDown ? this.playerSpeed + bonus : this.playerSpeed
    }
    if(upDown && onFloor){
      velocityY = -220
    }

    if(this.player?.body.velocity.x !== velocityX || this.player?.body.velocity.y !== velocityY){
      this.player?.setVelocity(velocityX,velocityY)
    }
   
    if(this.mustReset){
      this.playerLife--
      this.updateLifeBar()
      this.initPlayer()
      this.initBall()
      this.mustReset = false
    }
  }

  private initBall(){
    if(!this.ball) return

    this.numberOfBlocksDestroyed = 0
    this.ball.setPosition(400,500)

    // Random x velocity
    const xVelocity = Math.floor(Math.random() * 300) + 100;
    const xSign = Math.floor(Math.random() * 2) > 0 ? 1 : -1

    this.ball.setVelocity(xSign * xVelocity,-450)
  }

  private initPlayer(){
    if(!this.player) return
    this.player.setVelocity(0)
    this.player.body.setGravityY(300)
    this.player.setPosition(400,560)
  }

  private initBlocks(){
    let numberOfBlocks = 22
    // Create all blocks
    for (let i = 0; i < 22; i++) {
      const block = this.physics.add.staticImage(64 + 32 * i,16 * 2,'block');

      if(this.ball)
        this.physics.add.collider(this.ball,block,()=>{
          block.destroy()
          numberOfBlocks--;
          this.score+= this.numberOfBlocksDestroyed + 1
          this.numberOfBlocksDestroyed++
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
    if(this.playerLife === this.lifebarImages.length) return

    if(this.lifebarImages[this.playerLife])
      this.lifebarImages[this.playerLife].setTexture('no-life')
  }

}
