import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../movies-api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [subData, setSubData] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(`movie/${movieId}/reviews?language=en-US`);
        setSubData(data);
      } catch (error) {}
    }
    getData();
  }, [movieId]);

  return (
    <>
      {subData.results && (
        <ul className={css.list}>
          {subData.results.map(item => (
            <li key={item.id}>
              <p>Author: {item.author}</p>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
