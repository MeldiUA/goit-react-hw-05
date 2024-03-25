import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Loader from './components/loader/Loader';

const HomePage = lazy(() => import('./pages/homePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/moviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/movieCast/MovieCast'));
const MovieDetailsPage = lazy(() =>
  import('./pages/movieDetailsPage/MovieDetailsPage')
);
const MovieReviews = lazy(() =>
  import('./components/movieReviews/MovieReviews')
);

function App() {
  return (
    <div>
      <Navigation></Navigation>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
