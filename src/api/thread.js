import axios from "../config/axios";

const threadApi = {};

threadApi.getThreadById = (id) => axios.get(`/thread/${id}`);

export default threadApi;
