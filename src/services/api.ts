import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "6e7e588cc2d3e2063f2799b84c43e4d1",
    lenguage: "pt-BR",
    include_adults: false,
  },
});
