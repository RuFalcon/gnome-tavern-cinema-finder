
import React, { useState } from 'react';
import { Movie, MovieDetails, getMovieDetails } from '../services/tmdbService';
import MovieCard from './MovieCard';
import MovieDetailsDialog from './MovieDetailsDialog';
import DwarfAvatar from './DwarfAvatar';
import { audioService } from '../services/audioService';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface MovieRecommendationsProps {
  movies: Movie[];
  introText: string;
  onNewSearch?: () => void;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ 
  movies, 
  introText,
  onNewSearch 
}) => {
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
  
  const handleNewSearch = () => {
    audioService.playUISound('click');
    if (onNewSearch) onNewSearch();
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
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleNewSearch}
          className="tavern-button flex items-center gap-2 text-lg py-3 px-6"
        >
          <RefreshCw className="w-5 h-5" />
          Начать новый поиск
        </Button>
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
