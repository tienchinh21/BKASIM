import apiUrl from "@/assets/api"
import axios from "axios"

async function getNews() {
    try {
        const news = await axios.get(apiUrl.getNews);
        console.log(news.data)
        return news.data

    } catch (error) {
        console.log(error)
    }
}


export default getNews