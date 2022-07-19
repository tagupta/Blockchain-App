import axios from 'axios';
import { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setgifUrl] = useState("");

    const fetchGifs = async () => {
        try {
            const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)
            const { data } = response.data;

            setgifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setgifUrl("https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif")
        }
    }

    useEffect(() => {
        if (keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
}

export default useFetch;
