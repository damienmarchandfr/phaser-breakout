import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import { HowScene } from './scenes/How';
import { MenuScene } from './scenes/Menu';

new Phaser.Game(
  Object.assign(config, {
    scene: [MenuScene,GameScene,HowScene],
  })
);