import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import fetchData from '../../movies-api';
import css from '../MovieCast/MovieCast.module.css';

const image = 'https://image.tmdb.org/t/p/w200';

export default function MovieCast() {
  const [subData, setSubData] = useState({ cast: [] });
  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(`movie/${movieId}/credits?language=en-US`);
        setSubData(data);
      } catch {
        toast.error('Something went wrong! Please reload the page!');
      }
    }
    getData();
  }, [movieId]);

  return (
    <>
      {subData.cast.length === 0 ? (
        <div>No information about the cast is available.</div>
      ) : (
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
