package org.example.mbeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.RequestScoped;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.entities.Results;
import org.example.utils.AreaChecker;
import org.example.utils.CheckerInterface;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
@ApplicationScoped
public class AreaCheckBean {
    private final CheckerInterface areaChecker = new AreaChecker();

    public Results createResponse(double x, double y, double r){
        boolean hit = check(x, y, r);
        return Results.builder()
                .id(0L)
                .x(x)
                .y(y)
                .r(r)
                .hit(hit).build();
    }

    public boolean check(double x, double y, double r){
        return areaChecker.calculate(x, y, r);
    }
}
