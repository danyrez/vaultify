import axios from "./axios";

export const getCountsRequest = async () => axios.get("/stats");