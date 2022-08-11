package com.dimas.api.kyn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.dimas.api.kyn.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class KynFinalAssignmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(KynFinalAssignmentApplication.class, args);
	}

}
