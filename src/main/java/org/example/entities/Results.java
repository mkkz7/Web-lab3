package org.example.entities;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Named("resultsBean")
@ApplicationScoped
public class Results {
    private double x = 0.0;
    private double y = 0.0;
    private double r = 0.0;
    private boolean hit = false;
    private double execTime = 0.0;
    private String time = "";

    public Results(double x, double y, double r, boolean hit, double execTime, String time) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.execTime = execTime;
        this.time = time;
    }
}
