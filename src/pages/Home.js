import { Lightning, Utils, Router, VideoPlayer } from "@lightningjs/sdk";
import { MovieList } from "../components/MovieList";
import { MyPlayer } from "../components/Player";
import dashjs from "dashjs";


export class Home extends Lightning.Component {
    
    static _template(){


        //video.src = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';



        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff000000,
                rect: true
            },

            MovieList: {
                type: MovieList,
                h: 500,
                mountY: 0.5,
                y: 540,
                color: 0xff000000,
                fetchMovieUrl: "https://api.themoviedb.org/3/movie/popular?api_key=b457b58a1b4e6d67bee7382dda52cfcf"
            }
        }
    }

    _getFocused(){
        //return this.tag("Player")
        let movieList = this.tag("MovieList")

        if(!movieList){
            return
        }
 
        this.patch({
            Title: {
                x: 60,
                y: 850,
                text: {
                    text: movieList.getSelectedMovie().title,
                    fontSize: 64,
                    textColor: 0xffaaaaaa,
                },
            },
        })

        return movieList
    }


    pageTransition() {
        return 'fade';
    }
}