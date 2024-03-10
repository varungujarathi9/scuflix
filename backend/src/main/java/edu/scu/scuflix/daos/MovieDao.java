package edu.scu.scuflix.daos;

import edu.scu.scuflix.entities.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MovieDao extends MongoRepository<Movie, String> {
    Optional<List<Movie>> findAllByUserId(String id);
}
