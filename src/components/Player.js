import { Lightning, VideoPlayer } from '@lightningjs/sdk'
import dashjs from 'dashjs'

export class MyPlayer extends Lightning.Component {
  static _template() {
    return {}
  }

  _init() {
    VideoPlayer.consumer(this)

    //VideoPlayer.show()

    console.log(this)
    //const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    //const videoUrl = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"

    // Note: this is in fact the default loader function

    const myLoader = (url, videoEl, config) => {
      videoEl.setAttribute('controls', '')
      videoEl.style['z-index'] = 99
      videoEl.style['width'] = '1920px'
      videoEl.style['height'] = '1080px'

      return new Promise(resolve => {
        console.log(videoEl)
        VideoPlayer.player = dashjs.MediaPlayer().create()

        VideoPlayer.player.initialize(videoEl, url, false)
        //VideoPlayer.player.setMute(true)
        resolve()
      })
    }

    VideoPlayer.loader(myLoader.bind(this))
  }

  close() {
    console.log('VideoPlayer.test', VideoPlayer)
    VideoPlayer.player.destroy()
    VideoPlayer.close()
    VideoPlayer.opened = false
  }

  play() {
    if (VideoPlayer.opened == true) {
      VideoPlayer.playPause()
    } else {
      const videoUrl =
        'https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd'
      VideoPlayer.open(videoUrl)
      VideoPlayer.opened = true
    }
  }

  fastForward() {
    console.log('right for seek')
    if (VideoPlayer.playing == true) {
      VideoPlayer.player.seek(VideoPlayer.currentTime + 10)
    }
  }

  fastBackward() {
    VideoPlayer.player.seek(VideoPlayer.currentTime - 10)
  }

  volumeUp() {
    VideoPlayer.player.setVolume(VideoPlayer.player.getVolume() + 0.1)
  }

  volumeDown() {
    VideoPlayer.player.setVolume(VideoPlayer.player.getVolume() - 0.1)
  }
}
