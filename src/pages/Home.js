import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { MovieCard } from "../components/MovieCard";
import { getMovies } from "../lib/apis"
import { getImageSrc } from "../lib/tools"

const MOVE_ANIMATION_DURATION = 0.5
const MOVIE_CARD_MARGIN = 50
const PRELOAD_INDEX = 3

export class Home extends Lightning.Component {
    static _template(){
        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff000000,
                rect: true
            },
            MovieList: {
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
    }

    pageTransition() {
        return 'fade';
    }

    _init(){
        this.selectedMovieIndex = 0;        
        this.loadMovies()
    }

    loadMovies(){
        this.isLoading = true
        getMovies(this.nextPage)
            .then((data) => {
                this.nextPage = data.page + 1

                this.tag("MovieList").patch({
                    children: this.tag("MovieList").children.concat(data.results.map((movie) => ({
                        type: MovieCard,
                        w: 300,
                        h: 400,
                        movieID: movie.id,
                        title: movie.original_title,
                        src: getImageSrc(movie.poster_path),
                        flexItem:{ margin: MOVIE_CARD_MARGIN },
                    })))
                })
            })
            .finally(() => {
                this.isLoading = false
            })
    }

    getSelectedMovie(){
        return this.tag("MovieList").children[this.selectedMovieIndex] 
    }

    _getFocused(){
        let movie = this.getSelectedMovie()

        if(!movie){
            return
        }

        this.patch({
            Title: {
                x: 60,
                y: 850,
                text: {
                    text: movie.title,
                    fontSize: 64,
                    textColor: 0xffaaaaaa,
                },
            },
        })

        return this.getSelectedMovie()
    }

    _handleLeft(){
        if(this.moveAnimation && this.moveAnimation.isActive()){
            this.moveAnimation.finish()
        }

        if(this.selectedMovieIndex > 0){
            this.selectedMovieIndex--
            this.moveAnimation = this.getMoveAnimation()
            this.moveAnimation.start()
        }
    }

    _handleRight(){
        if(this.moveAnimation && this.moveAnimation.isActive()){
            this.moveAnimation.finish()
        }

        if(this.selectedMovieIndex < this.tag("MovieList").children.length - 1){
            this.selectedMovieIndex++
            this.moveAnimation = this.getMoveAnimation()
            this.moveAnimation.start()

        } 
        
        if(!this.isLoading && this.selectedMovieIndex < this.tag("MovieList").children.length - PRELOAD_INDEX){
            this.loadMovies()
        }
    }

    _handleUp(){
        if(this.moveAnimation && this.moveAnimation.isActive()){
            this.moveAnimation.finish()
        }

        this.selectedMovieIndex = 0
        this.moveAnimation = this.getMoveAnimation()
        this.moveAnimation.start()
    }



    getMoveAnimation(){
        return this.tag("MovieList").animation({
            duration: MOVE_ANIMATION_DURATION,
            repeat: 0,
            actions: [
                {
                    t: '',
                    p: 'x',
                    v: { 
                        0: this.tag("MovieList").x,
                        [MOVE_ANIMATION_DURATION]: - (this.getSelectedMovie().w + MOVIE_CARD_MARGIN * 2) * this.selectedMovieIndex
                    },
                },
            ],
        })
    }

    goToDetailPage(){
        Router.navigate(`detail/${this.getSelectedMovie().movieID}`)
    }

    _handleEnter(){
        this.goToDetailPage()
    }

    _handleDown(){
        this.goToDetailPage()
    }
}