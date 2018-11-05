// controls.js - handles all user input

import Globals from './globals';

const stickThreshold = 0.1;

class Controls {

  constructor(game, justPressed = false) {
    this.game = game;
    // This might need a better way of being passed to the class!
    this.justPressed = justPressed;

    if (game.input.gamepad) {
      this.pad1 = game.input.gamepad.pad;
    }

    // add all possible keyboard inputs
    this.keys = {
      ups: [
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      ],
      downs: [
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      ],
      lefts: [
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      ],
      rights: [
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      ],
      attack: [
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O),
        game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
      ],
      // kicks: [
      //   game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      //   game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
      //   game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE)
      // ],
      // jumps: [
      //   game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      //   game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      // ]
    };

    // allow for testing game stuff
    // these should be disabled in production builds
    if (Globals.debug) {
      this.keys = {
        ...this.keys,
        killAll: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        killNearby: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        killVisible: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V),
        warpAtEnd: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B),
        hurtHero: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N),
        healHero: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
        showDialog: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        makeRain: game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
      };
    }
  }

  _keyPressed(keys) {
    for (const k of keys) {

      if (this.justPressed) {
        if (k.justPressed())
          return true;
      } else {
        if (k.isDown)
          return true;
      }

    }
    return false;
  }

  _padPressed(button) {
    if (this.justPressed) {
      return this.pad1.justPressed(button, 25);
    }

    return this.pad1.isDown(button);
  }

  _stickMoved(isAxisOverTreshold) {
    if (this.justPressed) {
      return false;
    }

    return isAxisOverTreshold;
  }

  get up() {
    return this._keyPressed(this.keys.ups);
    // return (
    //   this._keyPressed(this.keys.ups) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_DPAD_UP) ||
    //   this._stickMoved(
    //     this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -stickThreshold
    //   )
    // );
  }

  get down() {
    this._keyPressed(this.keys.downs);
    // return (
    //   this._keyPressed(this.keys.downs) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN) ||
    //   this._stickMoved(
    //     this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > stickThreshold
    //   )
    // );
  }

  get left() {
    this._keyPressed(this.keys.lefts);
    // return (
    //   this._keyPressed(this.keys.lefts) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
    //   this._stickMoved(
    //     this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -stickThreshold
    //   )
    // );
  }

  get right() {
    this._keyPressed(this.keys.rights);
    // return (
    //   this._keyPressed(this.keys.rights) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
    //   this._stickMoved(
    //     this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > stickThreshold
    //   )
    // );
  }

  get punch() {
    this._keyPressed(this.keys.punches);
    // return (
    //   this._keyPressed(this.keys.punches) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_X)
    // );
  }

  get attack() {
    this._keyPressed(this.keys.attack);
    // return (
    //   this._keyPressed(this.keys.kicks) ||
    //   this._padPressed(Phaser.Gamepad.XBOX360_A)
    // );
  }

  // DEBUG

  debug(what) {
    return this.keys[what].justPressed();
  }

}

export default Controls;
