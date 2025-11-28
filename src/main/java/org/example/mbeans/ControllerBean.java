package org.example.mbeans;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import org.example.entities.CoordinateBean;
import org.example.entities.Results;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Setter
@Getter
@Named("controllerBean")
@SessionScoped
public class ControllerBean implements Serializable {

    @Inject
    private CoordinateBean coordinate;
    @Inject
    private ServiceBean serviceBean;
    @Inject
    private AreaCheckBean areaCheckBean;
    private List<Results> resultsList;

    @PostConstruct
    public void init(){
        resultsList = serviceBean.getAllResults();
    }

    public ControllerBean() {}

    public void onRadiusChange(){
        resultsList = serviceBean.getAllResults().stream()
                .map(r -> areaCheckBean.createResponse(r.getX(), r.getY(), r.getR()))
                .collect(Collectors.toList());
    }

    public void submitFromForm(){
        submitPoint(coordinate.getX(), coordinate.getY(), coordinate.getR());
    }

    public void submitFromClick(){
        Map<String, String> params = FacesContext.getCurrentInstance()
                .getExternalContext()
                .getRequestParameterMap();

        double x = Double.parseDouble(params.get("clickX"));
        double y = Double.parseDouble(params.get("clickY"));
        double r = Double.parseDouble(params.get("clickR"));

        submitPoint(x, y, r);
    }

    public void submitPoint(double x, double y, double r){
        if(y < -3 || y > 3){
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Y must be from -3 to 3", null);
            FacesContext.getCurrentInstance().addMessage(null, msg);
            return;
        }

        System.out.println(x);
        System.out.println(y);
        System.out.println(r);

        Results result = areaCheckBean.createResponse(x, y, r);

        resultsList.add(result);
        serviceBean.addNewResult(result);
    }
}
