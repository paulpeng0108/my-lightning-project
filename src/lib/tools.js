function getImageSrc(imagePath){
    //return "http://34.222.188.218:14004/image/Comcast-Emblem.jpg"
    return `https://image.tmdb.org/t/p/w500/${imagePath}`
}

module.exports.getImageSrc = getImageSrc