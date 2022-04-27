import { Lightning, Router, Utils } from "@lightningjs/sdk";
import { getMovieDetail, getSimilarMovies } from "../lib/apis";
import { MovieCard } from "../components/MovieCard";

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
    }

    _enable(){
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
                    h: 1080,
                    w: 810,
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
                    x: 830,
                    y: 1080 - 200,
                    text: {
                        text: "You may also like",
                        fontSize: 32,
                        textColor: 0xffaaaaaa,
                    },
                },

                RelatedMovies: {
                    rect: true,
                    h: 150,
                    x: 830,
                    y: 1080 - 150,
                    color: 0xff000000,
                    flex: {
                        direction: "row",
                        padding: 10,
                    },
                    children: data.results.map((movie) => ({
                        type: MovieCard,
                        w: 90,
                        h: 120,
                        movieID: movie.id,
                        title: movie.original_title,
                        src: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                        flexItem:{ margin: 10 },
                        alpha: 1
                    }))
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