import Phaser from 'phaser';
import config from './config';
import { Level } from './models/Level';
import GameScene from './scenes/Game';
import { HowScene } from './scenes/How';
import { MenuScene } from './scenes/Menu';

export let levels : Level[] = []


new Phaser.Game(
  Object.assign(config, {
    scene: [MenuScene,GameScene,HowScene],
  })
);