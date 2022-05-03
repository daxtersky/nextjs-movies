import { useState } from 'react';
import Link from 'next/link';
import movieStyles from '../styles/Movie.module.css';

export default function Home() {
  const movies = [];
  const [searchInput, setSearchInput] = useState('');
  const [moviesState, setMovieState] = useState(movies);
  const inputChange = (e) => setSearchInput(e.target.value);

  async function buttonClick() {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchInput}`
    );
    const movies = await response.json();
    setMovieState(movies);
  }

  return (
    <div>
      {/* <Head> */}
      <header>
        <title>🍿Next.js about</title>
        <meta name="meta keywords" content="Playing with Next.js" />
        {/* </Head> */}
      </header>
      <h1>Home</h1>
      <div className="search-field">
        <input
          type="text"
          placeholder="Search a movie"
          onChange={inputChange}
          value={searchInput}
        />
        <button onClick={buttonClick}>Search</button>
      </div>
      <div className={movieStyles.grid}>
        {moviesState.length > 0 &&
          moviesState.map((movie) => (
            <Link
              href="/movie/[id]"
              as={`/movie/${movie.show.id}`}
              key={movie.show?.id}
            >
              <a className={movieStyles.card}>
                <h3>{movie.show.name}</h3>
                <p>Score: {movie.score}</p>
                {movie.show?.image?.medium ? (
                  <img
                    src={movie.show?.image?.medium}
                    width={250}
                    height={250}
                    alt={movie.show?.image?.name}
                  ></img>
                ) : (
                  ''
                )}
                {movie.show?.summary?.substring(3)}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
