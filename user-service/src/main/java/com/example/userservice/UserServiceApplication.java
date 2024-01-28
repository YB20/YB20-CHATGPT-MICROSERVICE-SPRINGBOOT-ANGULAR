package com.example.userservice;

import com.example.userservice.entities.User;
import com.example.userservice.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
//@EnableDiscoveryClient
public class UserServiceApplication {

    @Bean
    public WebMvcConfigurer configurer(){
        return new WebMvcConfigurer(){
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedHeaders("*")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .allowCredentials(true);
            }
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    @Autowired
    private UserRepository repository;

    @PostConstruct
    public void initUsers() {
        List<User> users = Stream.of(
                new User(101, "youssef", "1234", "youssef@gmail.com"),
                new User(102, "user1", "pwd1", "user1@gmail.com"),
                new User(103, "user2", "pwd2", "user2@gmail.com"),
                new User(104, "user3", "pwd3", "user3@gmail.com")
        ).collect(Collectors.toList());
        repository.saveAll(users);
    }

}
