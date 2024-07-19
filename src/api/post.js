import axios from "../config/axios";

const postApi = {};

postApi.createPost = (body) => axios.post("/post", body);
postApi.updatePost = (body) => axios.patch("/post", body);
postApi.deletePost = (postId) => axios.delete(`/post/${postId}`);

export default postApi;
