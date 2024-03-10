package edu.scu.scuflix.services;

import edu.scu.scuflix.entities.Movie;
import edu.scu.scuflix.exceptions.MovieDetailsNotFoundException;

import java.util.List;

public interface MovieService {
    List<Movie> fetchMovie(String user_id) throws MovieDetailsNotFoundException;

    Movie addMovie(Movie movie);

    boolean deleteMovie(String id);
}
