import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import fetchData from '../../movies-api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [subData, setSubData] = useState({ results: [] });
  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData(`movie/${movieId}/reviews?language=en-US`);
        setSubData(data);
      } catch {
        toast.error('Something went wrong! Please reload the page!');
      }
    }
    getData();
  }, [movieId]);

  return (
    <>
      {subData.results.length === 0 ? (
        <div>We don`t have any reviews for this movie.</div>
      ) : (
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
