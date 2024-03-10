import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../movies-api';
import css from '../MovieCast/MovieCast.module.css';

const image = 'https://image.tmdb.org/t/p/w200';

export default function MovieCast() {
  const [subData, setSubData] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(`movie/${movieId}/credits?language=en-US`);
        setSubData(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <>
      {subData.cast && (
        <ul className={css.list}>
          {subData.cast.map(item => (
            <li key={item.id}>
              <img src={image + item.profile_path} alt={item.name} width='200' height='300' />
              <p>{item.name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
