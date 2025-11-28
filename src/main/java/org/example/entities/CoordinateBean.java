package org.example.entities;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Named("coordinateBean")
@SessionScoped
public class CoordinateBean implements Serializable {
    private Double x = 0.0;
    private Double y = null;
    private Double r = 0.0;
}
