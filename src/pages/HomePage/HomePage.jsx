import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import fetchData from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData('trending/movie/day?language=en-US');
        setMovies(data.results);
      } catch {
        toast.error('Something went wrong! Please reload the page!');
      }
    }
    getData();
  }, [setMovies]);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} state={{ from: location }} />
    </div>
  );
}
