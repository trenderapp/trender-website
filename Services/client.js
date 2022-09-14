import Client from "trender-client";
import axios from "axios";
import { apibaseurl } from "./constante";

var token;

if(typeof window !== "undefined") token = JSON.parse(localStorage.getItem("user_info"))?.token;

export const client = new Client({
  token: token,
  apiurl: apibaseurl
});
export var user_token = token;

export const axiosInstance = axios.create({
    baseURL: apibaseurl,
    headers: {
      trendertokenapi: user_token ?? null
    },
    validateStatus: s => s < 501
});

export default client;