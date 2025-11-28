package org.example.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="point_model")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id = 0;
    private double x = 0.0;
    private double y = 0.0;
    private double r = 0.0;
    private boolean hit = false;
}
