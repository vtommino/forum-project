import axios from "axios";
import { getAccessToken } from "../features/authentication/utils/local-storage";

//connect to backend
//refer to dotenv
//must do under VITE (Env Variables) to use its syntax with backend
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config; // ถ้าไม่มี จะเกิด axios(undefined)
  },
  (err) => Promise.reject(err)
);

export default axios;
