async function getMovies(page){
    if(!page){
        page = 1
    }
    const result = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b457b58a1b4e6d67bee7382dda52cfcf&page=${page}`)


    return result.json()
}

async function getMovieDetail(movieID){
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=b457b58a1b4e6d67bee7382dda52cfcf`)
    const json = await result.json()
    return Object.assign(json, {trailers: [
        {
            url: "https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd",
            name: "trailer-vod"
        },
        {
            url: "https://ll-usw2.akamaized.net/live/disk/sky/DASH-LL-sky.toml/sky.mpd",
            name: "trailer-live1"
        },
        {
            url: "https://akamaibroadcasteruseast.akamaized.net/cmaf/live/657078/akasource/out.mpd",
            name: "trailer-live2"
        }
    ]})
}

async function getSimilarMovies(movieID){
    const result = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=b457b58a1b4e6d67bee7382dda52cfcf`)


    return result.json()
}

export { getMovies, getMovieDetail, getSimilarMovies }