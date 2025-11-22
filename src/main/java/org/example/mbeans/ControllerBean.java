package org.example.mbeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.example.entities.CoordinateBean;
import org.example.entities.Results;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@Named("controllerBean")
@ApplicationScoped
public class ControllerBean {

    @Inject
    private CoordinateBean coordinate;

    private List<Results> resultsList = new ArrayList<>();

    public ControllerBean() {}

    public void submitFromForm(){
        try{
            submitPoint(coordinate.getX(), coordinate.getY(), coordinate.getR());
        }catch(NullPointerException e){
            System.out.println(e.getMessage());
        }
    }

    public void submitFromClick(){
        Map<String, String> params = FacesContext.getCurrentInstance()
                .getExternalContext()
                .getRequestParameterMap();

        double x = 0, y = 0, r = 0;

        try {
            x = Double.parseDouble(params.get("clickX"));
            y = Double.parseDouble(params.get("clickY"));
            r = Double.parseDouble(params.get("clickR"));
        }catch (NullPointerException e){
            System.out.println(e.getMessage());
        }

        submitPoint(x, y, r);
    }

    public void submitPoint(double x, double y, double r){
        if(y < -3 || y > 3){
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Y must be from -3 to 3", null);
            FacesContext.getCurrentInstance().addMessage(null, msg);
            return;
        }

        long startTime = System.nanoTime();

        System.out.println(x);
        System.out.println(y);
        System.out.println(r);

        AreaCheckBean checkBean = new AreaCheckBean();
        Results results = checkBean.createResponse(x, y, r, startTime);
        resultsList.add(results);
    }
}
