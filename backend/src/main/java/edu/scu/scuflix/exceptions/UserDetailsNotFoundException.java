package edu.scu.scuflix.exceptions;

import java.util.function.Supplier;

public class UserDetailsNotFoundException extends Exception {
    public UserDetailsNotFoundException(String s) {
        super(s);
    }
}
