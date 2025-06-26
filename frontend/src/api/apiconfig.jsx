import axios from "axios"

const instance = axios.create({

    baseURL : "https://skillswap-backend-9uvh.onrender.com"
})

export default instance