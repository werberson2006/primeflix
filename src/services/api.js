import axios from "axios";

//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API /movie/550?api_key=e8c3415a23286844c9434f9798eeb317

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
