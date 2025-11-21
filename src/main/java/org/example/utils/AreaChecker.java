package org.example.utils;

public class AreaChecker implements CheckerInterface{
    @Override
    public boolean calculate(double x, double y, double r){

        //1 четверть
        if (x >= 0 && y >= 0) {
            if ((x * x + y * y) <= (r/2)*(r/2)) {
                return true;
            }
        }

        //2 четверть
        if (x <= 0 && y >= 0) {
            if (x >= -r && y <= r) {
                return true;
            }
        }

        //3 четверть
        if (x <= 0 && y <= 0) {
            if (y >= -x/2 - r/2) {
                return true;
            }
        }

        return false;
    }
}
