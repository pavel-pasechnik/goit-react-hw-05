import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
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

    if (query === '' || value === '') {
      setMovies([]);
      return;
    }

    async function getData() {
      try {
        const data = await fetchData(
          `search/movie?query=${query}&include_adult=false&language=en-US`
        );

        data.total_results === 0 &&
          toast('No pictures for your request', {
            icon: '❗️',
          });

        setMovies(data.results);
      } catch {
        toast.error('Something went wrong! Please reload the page!');
      }
    }
    getData();
  }, [setQuery, setMovies, query, value]);

  const handleSubmit = (values, actions) => {
    if (values.query === '') {
      toast.error('Please enter a search term');
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
