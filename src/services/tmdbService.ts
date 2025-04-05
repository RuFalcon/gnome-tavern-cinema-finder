
// TMDb API Service
// This service handles all communication with The Movie Database API

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // This is a public demo key for TMDb
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      profile_path: string | null;
    }[];
  };
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      type: string;
      site: string;
    }[];
  };
}

// Cache genres to avoid repeated API calls
let genresCache: Genre[] | null = null;

// Get list of genres
export const getGenres = async (): Promise<Genre[]> => {
  if (genresCache) return genresCache;
  
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`
    );
    const data = await response.json();
    genresCache = data.genres;
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Search movies by query
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (id: number): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=credits,videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Discover movies by parameters
export const discoverMovies = async (
  params: {
    with_genres?: string;
    year?: number;
    "vote_average.gte"?: number;
    with_cast?: string;
    with_crew?: string;
    sort_by?: string;
  }
): Promise<Movie[]> => {
  try {
    // Convert all params to strings to fix the type error
    const queryParams = Object.entries(params).reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string, string>);
    
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: "ru-RU",
      page: "1",
      include_adult: "false",
      ...queryParams
    });
    
    const response = await fetch(`${BASE_URL}/discover/movie?${searchParams}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error discovering movies:", error);
    return [];
  }
};

// Get poster or backdrop URL
export const getImageUrl = (path: string | null, size = "w500"): string => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE_URL.replace("w500", size)}${path}`;
};

// Convert genre IDs to names
export const addGenreNamesToMovies = async (movies: Movie[]): Promise<Movie[]> => {
  const genres = await getGenres();
  
  return movies.map(movie => {
    const movieGenres = movie.genre_ids.map(id => 
      genres.find(genre => genre.id === id)
    ).filter(Boolean) as Genre[];
    
    return {
      ...movie,
      genres: movieGenres
    };
  });
};
