import React, { useEffect, useRef, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { Link, useNavigate, useParams } from 'react-router-dom';


const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const AUTH = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTE0MmExZmQzZjNlNGZmOWI0OGIzNmNkNzQwYzdjYyIsIm5iZiI6MTc2MDMzMTM5My40OTcsInN1YiI6IjY4ZWM4NjgxZWI4YjIwNzRjMGYxMTk5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-WQrlqznYUmxqytqsYvqdR3gMEy0kFrP9WG4Ayl7Lrg';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTH,
  },
};

/** Render filled / empty stars based on a 0–10 TMDB vote_average */
function StarRating({ score }) {
  const stars = Math.round((score / 10) * 5);
  return (
    <div className="player-stars" aria-label={`Rating: ${score} out of 10`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < stars ? 'star filled' : 'star'}>★</span>
      ))}
      <span className="player-score">{score?.toFixed(1)}</span>
    </div>
  );
}


export default function Player() {
  const { id } = useParams();
  const nav = useNavigate();
  const similarRef = useRef();

  /* ── Video data (existing) ── */
  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  /* ── Full YouTube title (fetched via oEmbed once key is known) ── */
  const [youtubeTitle, setYoutubeTitle] = useState('');

  /* ── Movie detail data (new) ── */
  const [movieDetails, setMovieDetails] = useState(null);

  /* ── Similar movies (new) ── */
  const [similarMovies, setSimilarMovies] = useState([]);

  /* ── Fetch all three in parallel ── */
  useEffect(() => {
    // 1. Trailer video
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0] ?? {}))
      .catch(err => console.error(err));

    // 2. Movie details (overview, genres, runtime, poster, vote_average …)
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(res => res.json())
      .then(res => setMovieDetails(res))
      .catch(err => console.error(err));

    // 3. Similar movies
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setSimilarMovies(res.results ?? []))
      .catch(err => console.error(err));
  }, [id]);

  /* ── Fetch full YouTube title via oEmbed once the video key is ready ── */
  useEffect(() => {
    if (!apiData.key) return;
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${apiData.key}&format=json`)
      .then(res => res.json())
      .then(res => setYoutubeTitle(res.title ?? ''))
      .catch(() => {}); // silently fall back to apiData.name
  }, [apiData.key]);

  /* ── Horizontal scroll with mouse-wheel on similar row ── */
  const handleWheel = (e) => {
    e.preventDefault();
    similarRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const el = similarRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  return (
    <div className="player-page">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — Video player (original layout)
      ═══════════════════════════════════════════════ */}
      <div className="player">
        <img
          src={back_arrow_icon}
          onClick={() => nav('/')}
          alt="back arrow icon"
        />
        <iframe
          width="80%"
          height="80%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        />
        <div className="player-info">
          <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
          <p>{youtubeTitle || apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — Movie details  (top half)
      ═══════════════════════════════════════════════ */}
      {movieDetails && (
        <div className="movie-details-section">
          <div className="movie-details-container">

            {/* Poster */}
            <figure className="movie-poster">
              <img
                src={
                  movieDetails.poster_path
                    ? IMG_BASE + movieDetails.poster_path
                    : IMG_BASE + movieDetails.backdrop_path
                }
                alt={`${movieDetails.title} poster`}
              />
            </figure>

            {/* Info panel */}
            <div className="movie-details-info">
              <h2 className="movie-details-title">{movieDetails.title}</h2>

              {movieDetails.tagline && (
                <p className="movie-tagline">"{movieDetails.tagline}"</p>
              )}

              <StarRating score={movieDetails.vote_average} />

              <div className="movie-meta-row">
                {movieDetails.release_date && (
                  <span className="movie-meta-pill">
                    📅 {movieDetails.release_date.slice(0, 4)}
                  </span>
                )}
                {movieDetails.runtime > 0 && (
                  <span className="movie-meta-pill">
                    ⏱ {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
                  </span>
                )}
                {movieDetails.status && (
                  <span className="movie-meta-pill">{movieDetails.status}</span>
                )}
              </div>

              {movieDetails.genres?.length > 0 && (
                <div className="movie-genres">
                  {movieDetails.genres.map(g => (
                    <span key={g.id} className="genre-tag">{g.name}</span>
                  ))}
                </div>
              )}

              <div className="movie-summary">
                <h3 className="movie-summary-title">Overview</h3>
                <p className="movie-summary-para">{movieDetails.overview}</p>
              </div>

              <div className="movie-extra-stats">
                <div className="stat-item">
                  <span className="stat-label">Vote Count</span>
                  <span className="stat-value">{movieDetails.vote_count?.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Popularity</span>
                  <span className="stat-value">{movieDetails.popularity?.toFixed(0)}</span>
                </div>
                {movieDetails.budget > 0 && (
                  <div className="stat-item">
                    <span className="stat-label">Budget</span>
                    <span className="stat-value">${(movieDetails.budget / 1_000_000).toFixed(0)}M</span>
                  </div>
                )}
                {movieDetails.revenue > 0 && (
                  <div className="stat-item">
                    <span className="stat-label">Revenue</span>
                    <span className="stat-value">${(movieDetails.revenue / 1_000_000).toFixed(0)}M</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          SECTION 3 — Similar Movies  (bottom half)
      ═══════════════════════════════════════════════ */}
      {similarMovies.length > 0 && (
        <div className="similar-section">
          <div className="similar-container">
            <h2 className="similar-title">More Like This</h2>
            <div className="similar-card-list" ref={similarRef}>
              {similarMovies.slice(0, 5).map((movie) => (
                <Link
                  to={`/player/${movie.id}`}
                  className="similar-card"
                  key={movie.id}
                >
                  <img
                    src={IMG_BASE + movie.backdrop_path}
                    alt={movie.title}
                  />
                  <p className="similar-card-title">{movie.title}</p>
                  <p className="similar-card-year">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}