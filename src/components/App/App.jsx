import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import NotFound from '../../pages/NotFound/NotFound.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));

import css from './App.module.css';

export default function App() {
  return (
    <>
      <Navigation />

      <Suspense fallback={<div>LOADING PAGE...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
