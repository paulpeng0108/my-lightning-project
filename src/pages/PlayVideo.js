import { Lightning, Router, VideoPlayer } from '@lightningjs/sdk'
import dashjs from 'dashjs'

export class PlayVideo extends Lightning.Component {
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

        VideoPlayer.player = dashjs.MediaPlayer().create()

        /* restart playback in muted mode when auto playback was not allowed by the browser */
        VideoPlayer.player.on(dashjs.MediaPlayer.events.PLAYBACK_NOT_ALLOWED, function (data) {
            console.log('Playback did not start due to auto play restrictions. Muting audio and reloading');
            videoEl.muted = true;
            VideoPlayer.player.initialize(videoEl, url, true);
        });

        VideoPlayer.player.initialize(videoEl, url, true)
        resolve()
      })
    }

    VideoPlayer.loader(myLoader)
  }

  set params({ url, originalPage }) {
    console.log(url)
    this._handleEnter(url)
    VideoPlayer.originalPage = originalPage
  }

  _handleBack() {
    console.log('VideoPlayer.test', VideoPlayer)
    VideoPlayer.player.destroy()
    VideoPlayer.close()
    VideoPlayer.opened = false
    Router.navigate(VideoPlayer.originalPage)
  }

  _handleEnter(url) {
    if (VideoPlayer.opened == true) {
      VideoPlayer.playPause()
    } else {
      const videoUrl = url
      VideoPlayer.open(videoUrl)
      VideoPlayer.opened = true
    }
  }

  _handleRight() {
    console.log('right for seek')
    if (VideoPlayer.playing == true) {
      VideoPlayer.player.seek(VideoPlayer.currentTime + 10)
    }
  }

  _handleLeft() {
    VideoPlayer.player.seek(VideoPlayer.currentTime - 10)
  }

  _handleUp() {
    const currentVolume = VideoPlayer.player.getVolume() + 0.1
    if (currentVolume <= 1) {
      VideoPlayer.player.setVolume(currentVolume)
    }
  }

  _handleDown() {
    const currentVolume = VideoPlayer.player.getVolume() - 0.1
    if (currentVolume >= 0) {
      VideoPlayer.player.setVolume(currentVolume)
    }
  }
}
