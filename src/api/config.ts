import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  export  default apiClient
  