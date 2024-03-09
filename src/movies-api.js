import axios from 'axios';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2MwMGY1NTE4OTg5ZDAyODcwMjc2NWQ3OWUxNTE0NCIsInN1YiI6IjY1ZTliNGRkNmJlYWVhMDE0ODc4ODhlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e_lZTjgdRE-9Ibbh0Y_DHr4-GEIDfx60aq2EEMdW6Yk';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default async function fetchData(path) {
  const response = await axios.get(path);
  return response.data;
}
