
import React from 'react';
import { Movie } from '../services/tmdbService';
import { Star } from 'lucide-react';
import { getImageUrl } from '../services/tmdbService';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="tavern-panel hover:shadow-xl cursor-pointer transition-all transform hover:scale-105"
      onClick={() => onClick(movie)}
    >
      <div className="relative pb-[150%] overflow-hidden rounded mb-2 border-2 border-tavern">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <h3 className="font-tavern text-tavern-dark font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
        {movie.title}
      </h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm">
          {new Date(movie.release_date).getFullYear()}
        </span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-tavern-gold fill-tavern-gold" />
          <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      {movie.genres && (
        <div className="mt-2">
          <p className="text-xs text-tavern-dark/70 line-clamp-1">
            {movie.genres.map(g => g.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
