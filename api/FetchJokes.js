import axios from "axios";

// declare base url and export

export const jokeAPI = axios.create({
  baseURL: "https://v2.jokeapi.dev/joke/Any",
});
