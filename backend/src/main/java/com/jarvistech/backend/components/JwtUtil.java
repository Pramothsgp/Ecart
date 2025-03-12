package com.jarvistech.backend.components;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jarvistech.backend.model.user.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    // Token validity set to 1 hour (3600000 milliseconds)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY); // Decode base64 secret key
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String userJson = objectMapper.writeValueAsString(user);
            return Jwts.builder()
            .claim("user", userJson)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(getSigningKey(), Jwts.SIG.HS256)
            .compact();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error generating JWT token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey()) // ✅ Ensure correct key usage
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // ✅ Corrected method
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
