import { Suspense, useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import fetchData from '../../movies-api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});

  const image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(`movie/${movieId}?language=en-US`);
        setMovie(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <button className={css.back} type='button' onClick={() => navigate(backLinkRef.current)}>
        Go back
      </button>

      <div className={css.card}>
        <img src={image} alt={movie.original_title} width='500' height='750' />
        <div className={css.description}>
          <h2>{movie.original_title}</h2>
          <p>User Score: {movie.vote_average * 10}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          {movie.genres && <p>{movie.genres.map(genre => genre.name).join(' ')}</p>}
        </div>
      </div>

      <hr />

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul className={css.list}>
          <li>
            <NavLink to='cast' state={backLinkRef.current}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to='reviews' state={backLinkRef.current}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <hr />

        <Suspense fallback={<div>LOADING SUB PAGE...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
