import axios from "../config/axios";

const forumApi = {};

forumApi.getAllForum = () => axios.get("/forum");

export default forumApi;
