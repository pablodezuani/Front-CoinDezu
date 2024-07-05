import axios from 'axios'

const api =axios.create({
    baseURL:'https://backend-coin-dezu.vercel.app'
});


export{api};