package org.example.entities;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Named("coordinateBean")
@ApplicationScoped
public class CoordinateBean {
    private Double x = 0.0;
    private Double y = null;
    private Double r = 0.0;
}
