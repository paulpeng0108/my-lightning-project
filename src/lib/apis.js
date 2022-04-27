async function getMovies(page){
    if(!page){
        page = 1
    }
    const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b457b58a1b4e6d67bee7382dda52cfcf&page=${page}`)


    return result.json()
}

async function getMovieDetail(movieID){
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=b457b58a1b4e6d67bee7382dda52cfcf`)


    return result.json()
}

async function getSimilarMovies(movieID){
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=b457b58a1b4e6d67bee7382dda52cfcf`)


    return result.json()
}

export { getMovies, getMovieDetail, getSimilarMovies }