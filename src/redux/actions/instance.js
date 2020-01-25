import axios from "axios";
const instance = axios.create({
  baseURL: "http://94a77985.ngrok.io/"
});
export default instance;
