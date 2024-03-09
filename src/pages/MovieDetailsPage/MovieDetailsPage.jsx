import { Suspense, useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import fetchData from '../../movies-api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const { genres = [] } = movie;

  const image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

  const { movieId } = useParams();

  const location = useLocation();

  console.log(location);

  const backLinkRef = useRef(location.state ?? '/');

  console.log(backLinkRef);

  useEffect(() => {
    async function getData() {
      const data = await fetchData(`movie/${movieId}?language=en-US`);
      setMovie(data);
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link className={css.link} to={backLinkRef.current}>
        Go back
      </Link>
      <div className={css.card}>
        <img src={image} alt={movie.original_title} width='500' height='750' />
        <h2>{movie.original_title}</h2>
        <p>User Score: {movie.vote_average * 10}%</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{genres.map(genre => genre.name).join(' ')}</p>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul className={css.list}>
          <li>
            <NavLink to='cast'>Cast</NavLink>
          </li>
          <li>
            <NavLink to='reviews'>Reviews</NavLink>
          </li>
        </ul>

        <Suspense fallback={''}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
