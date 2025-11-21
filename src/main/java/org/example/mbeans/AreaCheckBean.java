package org.example.mbeans;

import org.example.entities.Results;
import org.example.utils.AreaChecker;
import org.example.utils.CheckerInterface;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AreaCheckBean {
    private final CheckerInterface areaChecker = new AreaChecker();

    public Results createResponse(double x, double y, double r, long startTime){
        boolean hit = areaChecker.calculate(x, y, r);
        double executionTime = ((System.nanoTime() - startTime) / 1_000_000.0);
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return new Results(x, y, r, hit, executionTime, currentTime);
    }



    public boolean check(float x, float y, int r){
        return areaChecker.calculate(x, y, r);
    }
}
