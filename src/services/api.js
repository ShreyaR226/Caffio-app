import axios from "axios";

const API = axios.create({
  baseURL: "http://10.233.168.211:5000/api"
});

export default API;