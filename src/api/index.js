// get your own key from unsplash please 😇
const axios = require('axios');

const KEY =
    '?client_id=5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';
const URL = `https://api.unsplash.com/photos/`;

const fetchImages = async page => {
    try {
        const datas = await axios.get(`${URL}${KEY}&per_page=3&page=${page}`);
        let images = datas.data
        return images
    } catch (error){
        console.error(error);
    }
};

const fetchImageStats = async id => {
    const response = await fetch(`${URL}/${id}/statistics${KEY}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export { fetchImages, fetchImageStats };
