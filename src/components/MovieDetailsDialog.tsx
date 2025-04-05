
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MovieDetails, getImageUrl } from '../services/tmdbService';
import { Star, Clock, Film, Calendar } from 'lucide-react';
import { stylizeMovieSynopsis } from '../utils/dwarfUtils';
import { Button } from '@/components/ui/button';

interface MovieDetailsDialogProps {
  movie: MovieDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsDialog: React.FC<MovieDetailsDialogProps> = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;
  
  // Get director
  const director = movie.credits?.crew.find(crewMember => crewMember.job === 'Director');
  
  // Get trailer if available
  const trailer = movie.videos?.results.find(
    video => video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  );
  
  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}мин`;
  };
  
  const stylizedSynopsis = stylizeMovieSynopsis(movie.overview);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-tavern-paper border-tavern">
        <DialogHeader>
          <DialogTitle className="font-fantasy text-2xl text-tavern-dark">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="relative pb-[150%] overflow-hidden rounded border-2 border-tavern">
              <img 
                src={getImageUrl(movie.poster_path)} 
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* Movie info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-tavern-dark">
                <Star className="h-5 w-5 text-tavern-gold fill-tavern-gold" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-tavern-dark">
                <Calendar className="h-5 w-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              
              {movie.runtime && (
                <div className="flex items-center gap-2 text-tavern-dark">
                  <Clock className="h-5 w-5" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>
            
            {/* Trailer button */}
            {trailer && (
              <div className="mt-4">
                <Button 
                  className="w-full bg-tavern-gold hover:bg-tavern-accent text-tavern-dark font-bold py-3 px-4 rounded-md shadow-md transition-all flex items-center justify-center gap-2"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                >
                  <Film className="h-5 w-5" />
                  Смотреть трейлер
                </Button>
              </div>
            )}
          </div>
          
          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Synopsis */}
            <div className="tavern-panel">
              <h3 className="font-tavern text-xl mb-2">О фильме</h3>
              <p className="font-serif">{stylizedSynopsis}</p>
            </div>
            
            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="font-tavern text-lg mb-2">Жанры</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre.id} 
                      className="px-3 py-1 bg-tavern-light text-tavern-dark rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Director */}
            {director && (
              <div>
                <h3 className="font-tavern text-lg mb-2">Режиссер</h3>
                <p>{director.name}</p>
              </div>
            )}
            
            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div>
                <h3 className="font-tavern text-lg mb-2">В ролях</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {movie.credits.cast.slice(0, 6).map(actor => (
                    <div key={actor.id} className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-tavern-light rounded-full flex items-center justify-center text-tavern-dark">
                        {actor.name.substring(0, 1)}
                      </span>
                      <span className="text-sm truncate">{actor.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
