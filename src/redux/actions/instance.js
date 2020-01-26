import axios from "axios";
const instance = axios.create({
  baseURL: "https://64a7f4cd.ngrok.io/"
});
export default instance;
