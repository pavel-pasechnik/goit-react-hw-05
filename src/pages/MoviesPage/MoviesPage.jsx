import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import fetchData from '../../movies-api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const value = params.get('query') ?? '';

  useEffect(() => {
    setQuery(value);
    async function getData() {
      try {
        !params.size === 0 && setQuery(params.get('query'));
        const data = await fetchData(
          `search/movie?query=${query}&include_adult=false&language=en-US`
        );

        setMovies(data.results);
      } catch (error) {}
    }
    getData();
  }, [setQuery, setMovies, query, params]);

  const handleSubmit = (values, actions) => {
    if (values.query === '') {
      setMovies([]);
      return;
    }
    setQuery(values.query);
    params.set('query', values.query);
    setParams(params);
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field type='text' name='query' />
          <button type='submit'>Search</button>
        </Form>
      </Formik>
      <div className={css.list}>
        <MovieList movies={movies} state={{ from: location }} />
      </div>
    </div>
  );
}
