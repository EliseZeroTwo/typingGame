import axios from "axios";
const instance = axios.create({
  baseURL: "https://104.248.166.81/"
});
export default instance;
