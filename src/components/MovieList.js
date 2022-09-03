import { Lightning, Utils, Router } from "@lightningjs/sdk";
import { MovieCard } from "./MovieCard";
import { getMovies } from "../lib/apis"
import { getImageSrc } from "../lib/tools"

const MOVE_ANIMATION_DURATION = 0.5
const MOVIE_CARD_MARGIN = 10


export class MovieList extends Lightning.Component {
    static _template(){
        return {
            rect: true,
            h: 500,
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

    loadMovies(){
        if(this.isLoading){
            return
        }

        this.isLoading = true

        if(!this.nextPage){
            this.nextPage = 1
        }
        
        this.getMovies().then((data) => {
                if(!this.preloadIndex){
                    this.preloadIndex = data.results.length / 2
                }

                this.nextPage = data.page + 1

                let h = this.h - MOVIE_CARD_MARGIN * 2
                let w = (h / 4) * 3

                this.patch({
                    children: this.children.concat(data.results.map((movie) => ({
                        type: MovieCard,
                        w: w,
                        h: h,
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

    async getMovies(){
        console.log("fetchMovieUrl", this.fetchMovieUrl)
        let result = await fetch(`${this.fetchMovieUrl}&page=${this.nextPage}`)

        return result.json()
    }

    getSelectedMovie(){
        return this.children[this.selectedMovieIndex] 
    }

    _getFocused(){
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

        if(this.selectedMovieIndex < this.children.length - 1){
            this.selectedMovieIndex++
            this.moveAnimation = this.getMoveAnimation()
            this.moveAnimation.start()

        } 
        
        if(!this.isLoading && this.selectedMovieIndex >= this.children.length - this.preloadIndex){
            this.loadMovies()
        }
    }

    // _handleUp(){
    //     if(this.moveAnimation && this.moveAnimation.isActive()){
    //         this.moveAnimation.finish()
    //     }

    //     this.selectedMovieIndex = 0
    //     this.moveAnimation = this.getMoveAnimation()
    //     this.moveAnimation.start()
    // }



    getMoveAnimation(){
        return this.animation({
            duration: MOVE_ANIMATION_DURATION,
            repeat: 0,
            actions: [
                {
                    t: '',
                    p: 'x',
                    v: { 
                        0: this.x,
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

    // _handleDown(){
    //     this.goToDetailPage()
    // }
}