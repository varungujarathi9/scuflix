package edu.scu.scuflix.exceptionhandlers;

import edu.scu.scuflix.exceptions.UserDetailsNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(value = UserDetailsNotFoundException.class)
    public ResponseEntity HandleUserExceptionHandler() {
        return new ResponseEntity("User does not exists with id ", HttpStatus.BAD_REQUEST);
    }
}
