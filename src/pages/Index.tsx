
import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import MovieRecommendations from '../components/MovieRecommendations';
import TavernLoadingIndicator from '../components/TavernLoadingIndicator';
import AudioControl from '../components/AudioControl';
import { Movie, searchMovies, addGenreNamesToMovies, discoverMovies } from '../services/tmdbService';
import { getRandomRecommendationPhrase, getRandomThinkingPhrase } from '../utils/dwarfUtils';

const Index = () => {
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Process user responses and generate recommendations after a few messages
  useEffect(() => {
    const generateRecommendations = async () => {
      // Generate recommendations after 3 user responses or if certain keywords are detected
      if (userResponses.length >= 3 || 
          userResponses.some(response => 
            response.toLowerCase().includes('покажи') || 
            response.toLowerCase().includes('рекомендуй')
          )) {
        setLoading(true);
        
        try {
          // Simple keyword extraction from user messages
          const allText = userResponses.join(' ').toLowerCase();
          
          // Check for genre mentions
          const genreKeywords: Record<string, number> = {
            'боевик': 28,
            'приключения': 12,
            'комедия': 35,
            'драма': 18,
            'фантастика': 878,
            'фэнтези': 14,
            'ужасы': 27,
            'триллер': 53,
            'мультфильм': 16,
            'семейный': 10751,
            'криминал': 80,
            'документальный': 99,
            'романтика': 10749
          };
          
          let selectedGenres: number[] = [];
          
          Object.entries(genreKeywords).forEach(([keyword, id]) => {
            if (allText.includes(keyword)) {
              selectedGenres.push(id);
            }
          });
          
          // Check for year mentions
          let year: number | undefined;
          const yearMatch = allText.match(/\b(19\d{2}|20\d{2})\b/);
          if (yearMatch) {
            year = parseInt(yearMatch[0]);
          }
          
          let results: Movie[] = [];
          
          // If we have specific criteria, use discover API
          if (selectedGenres.length > 0 || year) {
            const params: Record<string, any> = {
              sort_by: 'popularity.desc',
              'vote_average.gte': 6.0,
            };
            
            if (selectedGenres.length > 0) {
              params.with_genres = selectedGenres.join(',');
            }
            
            if (year) {
              params.year = year;
            }
            
            results = await discoverMovies(params);
          } else {
            // Extract potential keywords for search
            const keywords = allText
              .split(/\s+/)
              .filter(word => word.length > 4)
              .slice(0, 3)
              .join(' ');
              
            if (keywords) {
              results = await searchMovies(keywords);
            } else {
              // Fallback to popular movies
              results = await discoverMovies({ sort_by: 'popularity.desc' });
            }
          }
          
          // Limit to 10 results and add genre names
          results = results.slice(0, 10);
          results = await addGenreNamesToMovies(results);
          
          setMovieResults(results);
          setShowRecommendations(true);
        } catch (error) {
          console.error('Error generating recommendations:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    generateRecommendations();
  }, [userResponses]);
  
  const handleSendMessage = (message: string) => {
    setUserResponses(prev => [...prev, message]);
  };
  
  return (
    <div className="min-h-screen bg-tavern-paper wooden-bg">
      <AudioControl />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-fantasy text-tavern-dark text-center mb-8 drop-shadow-lg">
            Таверна Гнома
          </h1>
          
          <div className="rounded-lg overflow-hidden shadow-2xl h-[60vh]">
            <ChatInterface 
              onSendMessage={handleSendMessage} 
              isLoading={loading}
            />
          </div>
          
          {loading && (
            <TavernLoadingIndicator text={getRandomThinkingPhrase()} />
          )}
          
          {showRecommendations && movieResults.length > 0 && !loading && (
            <MovieRecommendations 
              movies={movieResults} 
              introText={getRandomRecommendationPhrase()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
