import { Lightning, Router } from '@lightningjs/sdk'
import { MyPlayer } from './Player'

export class PlayerButton extends Lightning.Component {
  static _template() {
    return {
      w: 100,
      h: 50,
      alpha: 0.7,
      rect: true,
      color: 0xffaaaaaa,
      Title: {
        text: {
          text: this.title,
          fontSize: 20,
          textColor: 0xff000000,
        },
      },
      Player: {
        type: MyPlayer,
        w: 800,
        h: 450,
      },
    }
  }

  _handleEnter() {
    console.log(`play/${this.url}`)
    Router.navigate('play', { url: this.url, originalPage: this.originalPage })
  }

  // _handleEsc(){

  // }

  // _handleBack(){
  //     this.tag("Player").close()
  // }

  // _handleEnter(){
  //     this.tag("Player").play()
  // }

  // _handleRight(){
  //     this.tag("Player").fastForward()
  // }

  // _handleLeft(){
  //     this.tag("Player").fastBackward()
  // }

  // _handleUp(){
  //     console.log("_handleUp")
  //     //let current = VideoPlayer.player.setVolume(1)

  //     this.tag("Player").volumeUp()

  // }

  // _handleDown(){
  //     console.log("_handleDown")
  //     //VideoPlayer.player.setVolume(0)
  //     this.tag("Player").volumeDown()
  // }

  _focus() {
    console.log('focused')
    this.patch({
      alpha: 1,
    })
  }

  _unfocus() {
    console.log('focused')
    this.patch({
      alpha: 0.7,
    })
  }
}
