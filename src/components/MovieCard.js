import { Lightning } from "@lightningjs/sdk"

export class MovieCard extends Lightning.Component {
    static _template(){
        return {
            w: 300,
            h: 400,
            alpha: 0.5
            //rect: true,
            //src: this.bindProp("posterSrc"),
            //movieId: this.bindProp("movieId"),
        }
    }

    _focus(){
        console.log("focused")
        this.patch({
            alpha: 1
        })
    }

    _unfocus(){
        console.log("focused")
        this.patch({
            alpha: 0.7
        })
    }
}