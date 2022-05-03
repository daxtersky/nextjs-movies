import Link from 'next/link';
import movieStyles from '../../../styles/Movie.module.css';

const Movie = ({ movie }) => {
  return (
    <div className={movieStyles.movie}>
      <h1>{movie.name}</h1>
      {movie.image?.medium ? (
        <img
          src={movie.image?.medium}
          width={250}
          height={250}
          alt={movie.show?.image?.name}
        ></img>
      ) : (
        ''
      )}
      <br />
      {movie.summary?.substring(3)}
      <a href={movie.officialSite} target="_blank" rel="noopener noreferrer">
        Official site
      </a>
      <p>Premiere: {movie.premiered}</p>
      <p>Average rating: {movie.rating.average}</p>
      <br />
      <Link href="/">Go back</Link>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`https://api.tvmaze.com/shows/${context.params.id}`);
  const movie = await res.json();
  return { props: { movie } };
};

export default Movie;
