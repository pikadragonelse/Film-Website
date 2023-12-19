import axios from "axios";

export const request = axios.create({
    baseURL:'http://movies.southeastasia.cloudapp.azure.com:8000/api/'
})