import { Lightning } from "@lightningjs/sdk"

export class MovieCard extends Lightning.Component {
    static _template(){
        return {
            rect: true,
            h: 500,
            mountY: 0.5,
            y: 540,
            color: 0xff000000,
            flex: {
                direction: "row",
                padding: 10,
            }
        }
    }

    _init(){
        this.selectedMovieIndex = 0;        
        this.loadMovies()
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