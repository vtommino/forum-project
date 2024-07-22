import axios from "../config/axios";
import { getAccessToken } from "../features/authentication/utils/local-storage";

const authApi = {};

authApi.register = (body) => axios.post("/auth/register", body); //axios({method: 'post', url:'/auth/register', data: body})
authApi.login = (body) => axios.post("/auth/login", body);
authApi.resetPassword = (body) => axios.patch("/auth/reset-password", body);
authApi.getAuthUser = () =>
  axios.get("/auth/me", {
    headers: { Authorization: `Bearer ${getAccessToken}` },
  });

export default authApi;
