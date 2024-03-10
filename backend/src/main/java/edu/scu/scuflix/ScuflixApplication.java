package edu.scu.scuflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@SpringBootApplication
@OpenAPIDefinition
public class ScuflixApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScuflixApplication.class, args);
	}

}