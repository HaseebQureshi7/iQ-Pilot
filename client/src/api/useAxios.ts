import axios from "axios";

const useAxios = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
    withCredentials: true
})

export default useAxios