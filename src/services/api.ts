import axios from 'axios'

const api =axios.create({
    baseURL:'http://10.13.32.98:3333'
});


export{api};