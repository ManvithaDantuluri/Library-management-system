// src/main/java/com/library/config/CorsConfig.java
package com.library.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		// Allow your Vite dev server
		config.setAllowedOrigins(List.of("http://localhost:5173"));

		// For maximum dev flexibility (you can tighten this later)
		config.setAllowedOriginPatterns(List.of("*")); // Remove this line in production

		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true); // Important for cookies, Authorization headers, etc.

		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
}