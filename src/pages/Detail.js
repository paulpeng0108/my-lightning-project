import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovieDetail, getSimilarMovies } from "../lib/apis";
import { MovieCard } from "../components/MovieCard";
import { MovieList } from "../components/MovieList";

export class Detail extends Lightning.Component {
    static _template(){
        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff000000,
                rect: true
            }
        }
    }

    set params({movieID}){
        this.movieID = movieID
        

        this.refresh()
    }

    _getFocused(){
       return this.tag("RelatedMovies")
    }

    refresh(){

        this.patch({
            Poster: undefined,
            Title: undefined,
            ReleaseDate: undefined,
            Overview: undefined,
            RelatedMoviesTitle: undefined,
            RelatedMovies: undefined,
        })

        console.log(this)

        getMovieDetail(this.movieID).then((movie) => {
            console.log(movie)

            this.patch({
                Poster: {
                    h: 800,
                    w: 600,
                    src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                },

                Title: {
                    x: 830,
                    y: 200,
                    text: {
                        text: movie.original_title,
                        fontSize: 64,
                        textColor: 0xffaaaaaa,
                    },
                },

                ReleaseDate: {
                    x: 830,
                    y: 280,
                    text: {
                        text: movie.release_date,
                        fontSize: 32,
                        textColor: 0xffaaaaaa,
                    },
                },

                Overview: {
                    x: 830,
                    y: 400,
                    text: {
                        text: movie.overview,
                        fontSize: 20,
                        textColor: 0xffaaaaaa,
                        wordWrapWidth: 750,
                    },
                }
            })
        })

        getSimilarMovies(this.movieID).then((data) => {
            console.log(data)
            this.patch({
                RelatedMoviesTitle:{
                    x: 10,
                    y: 880,
                    mountY: 1,
                    text: {
                        text: "You may also like",
                        fontSize: 32,
                        textColor: 0xffaaaaaa,
                    },
                },

                RelatedMovies: {
                    type: MovieList,
                    h: 200,
                    y: 880,
                    color: 0xff000000,
                    fetchMovieUrl: `https://api.themoviedb.org/3/movie/${this.movieID}/similar?api_key=b457b58a1b4e6d67bee7382dda52cfcf`
                }
            })
        })
    
    }

    pageTransition() {
        return 'fade';
    }

    goToHomePage(){
        Router.navigate("home")
    }
    
    _handleBack(){
        this.goToHomePage()
    }

    _handleUp(){
        this.goToHomePage()
    }

    
}