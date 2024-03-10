package edu.scu.scuflix.services;

import edu.scu.scuflix.entities.User;
import edu.scu.scuflix.exceptions.UserDetailsNotFoundException;

public interface UserService {
    User createUser(User user);

    User findUser(String id) throws UserDetailsNotFoundException;
    // List<String> moviesOfUser(String userId);
}
