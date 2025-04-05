
import React, { useState } from 'react';
import { Movie, MovieDetails, getMovieDetails } from '../services/tmdbService';
import MovieCard from './MovieCard';
import MovieDetailsDialog from './MovieDetailsDialog';
import DwarfAvatar from './DwarfAvatar';
import { audioService } from '../services/audioService';

interface MovieRecommendationsProps {
  movies: Movie[];
  introText: string;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ movies, introText }) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleMovieClick = async (movie: Movie) => {
    audioService.playUISound('click');
    try {
      const details = await getMovieDetails(movie.id);
      if (details) {
        setSelectedMovie(details);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };
  
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 mb-6">
        <DwarfAvatar size="lg" />
        <div className="tavern-panel font-tavern text-lg">
          {introText}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={handleMovieClick}
          />
        ))}
      </div>
      
      <MovieDetailsDialog
        movie={selectedMovie}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default MovieRecommendations;
