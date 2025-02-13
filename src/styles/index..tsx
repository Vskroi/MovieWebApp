type Genre = {
    id: number ;
    name: string;
  };
  type PosterProps = {
    MovieDetail: (MovieDetail: number) => void;
    moviee: {
      original_title: string;
      poster_path: string;
      title: string;
      overview: string;
      vote_average: number;
      id: number;
      genre_ids: number[];
    }[];
    GenreName: string;
    PageName: string;
  };
  type genre = {
    id: string ;
    name: string;
  };
  
  type Movie = {
    original_title: string;
    poster_path: string;
    backdrop_path:string
    title: string;
    overview: string;
    vote_average: number;
    id: number;
    genre_ids: number[];
    release_date: string;
    vote_count: number;
  };type MovieCredits = {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
      known_for_department: string;
    }[];
    crew: {
      name: string;
    };
  };
  type movieNowPlaying ={
    original_title: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  id:number;
  genre_ids: number[];
  backdrop_path:string;
  }
  type allMovie = {
    moviePopular
    :{
      original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    id:number;
    genre_ids: number[];
    }[],
    movieUpcoming:{
      original_title: string;
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    id:number;
    genre_ids: number[];
    }[],
    movieNowPlaying: movieNowPlaying[]
    movieTopRated:{
      original_title: string;
      poster_path: string;
      title: string;
      overview: string;
      vote_average: number;
      id:number;
      genre_ids: number[];
    }[],
  }

type ContentProps = {
    MovieDetail: (selectedMovieId: number | null) => void;
  };
  type Props = {
    moviee: {
      original_title: string;
      poster_path: string;
      title: string;
      overview: string;
      vote_average: number;
    }[];
    GenreName: string;

  };
  type HeaderProps = {
    setStep?: (step: number) => void;
  }
  type HeaderData = {
    darkLightMode: string;
    darkLigthTest: boolean;
    ganreSearch: boolean;
    page: string;
    movies: {
      original_title: string;
      poster_path: string;
      title: string;
      overview: string;
      vote_average: number;
    }[];
  }
