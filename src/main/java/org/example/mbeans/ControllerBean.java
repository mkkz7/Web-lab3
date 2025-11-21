package org.example.mbeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.example.entities.CoordinateBean;
import org.example.entities.Results;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Named("controllerBean")
@ApplicationScoped
public class ControllerBean {

    @Inject
    private CoordinateBean coordinate;

    private List<Results> resultsList = new ArrayList<>();

    public ControllerBean() {}

    public void submit(){
        double x = coordinate.getX();
        double y = coordinate.getY();
        double r = coordinate.getR();
        long startTime = System.nanoTime();

        AreaCheckBean checkBean = new AreaCheckBean();

        Results results = checkBean.createResponse(x, y, r, startTime);

        resultsList.add(results);
    }
}
