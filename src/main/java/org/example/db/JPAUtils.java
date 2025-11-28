package org.example.db;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import java.io.*;
import java.util.Properties;

public class JPAUtils {
    private static EntityManagerFactory factory;
    private JPAUtils(){}

    public static EntityManagerFactory getFactory(){
        if(factory == null){
            setFactory();
        }
        return factory;
    }

    private static void setFactory(){
        try(InputStream is = JPAUtils.class.getClassLoader().getResourceAsStream("db.cfg")){
            if (is == null) {
                throw new RuntimeException("db.cfg not found in classpath");
            }
            Properties info = new Properties();
            info.load(is);
            factory = Persistence.createEntityManagerFactory("default", info);
        } catch (IOException e) {
            System.err.println("Something went wrong: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
