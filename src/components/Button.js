import { Lightning, Router } from '@lightningjs/sdk'
import { MyPlayer } from './Player'

export class PlayerButton extends Lightning.Component {
  static _template() {
    return {
      w: 150,
      h: 50,
      alpha: 0.7,
      rect: true,
      color: 0xffaaaaaa,
      Title: {
        x: (w) => w/2,
        y: (h) => h/2,
        mountX: 0.5, 
        mountY: 0.5,
        text: {
          text: this.bindProp('title'),
          fontSize: 20,
          textColor: 0xff000000,
        },
      },
    }
  }

  _handleEnter() {
    console.log(`play/${this.url}`)
    Router.navigate('play', { url: this.url, originalPage: this.originalPage })
  }

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
