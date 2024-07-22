import axios from "../config/axios";

const commentApi = {};

commentApi.createComment = (body) => axios.post("/comment", body);

export default commentApi;
