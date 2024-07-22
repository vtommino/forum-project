import axios from "../config/axios";

const adminApi = {};

adminApi.getAllForumPageInfo = () => axios.get("/admin");
adminApi.updateUserStatus = (body) => axios.patch("/admin/update-user", body);

export default adminApi;
