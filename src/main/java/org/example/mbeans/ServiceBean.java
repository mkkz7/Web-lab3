package org.example.mbeans;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import org.example.db.JPAUtils;
import org.example.db.ResultDAO;
import org.example.entities.Results;

import java.util.List;

@ApplicationScoped
@Named("serviceBean")
public class ServiceBean {
    @Inject
    private ResultDAO resultDAO;

    public void addNewResult(Results result){
        EntityManager em = JPAUtils.getFactory().createEntityManager();
        try {
            em.getTransaction().begin();
            resultDAO.save(em, result);
            em.getTransaction().commit();
        }catch (Exception e){
            if(em.getTransaction().isActive()) em.getTransaction().rollback();
            throw e;
        }finally {
            em.close();
        }
    }

    public List<Results> getAllResults(){
        EntityManager em = JPAUtils.getFactory().createEntityManager();
        try {
            return resultDAO.getAll(em);
        }finally {
            em.close();
        }
    }

    public void updateResult(long id, Results result){
        EntityManager em = JPAUtils.getFactory().createEntityManager();
        try {
            em.getTransaction().begin();
            Results existing = resultDAO.find(em, id);
            if(existing!=null) {
                existing.setX(result.getX());
                existing.setY(result.getY());
                existing.setR(result.getR());
                existing.setHit(result.isHit());
            }
            em.getTransaction().commit();
        }catch (Exception e){
            if(em.getTransaction().isActive()) em.getTransaction().rollback();
            throw e;
        }finally {
            em.close();
        }
    }

    public void clearTable(){
        EntityManager em = JPAUtils.getFactory().createEntityManager();
        try{
            em.getTransaction().begin();
            resultDAO.clear(em);
            em.getTransaction().commit();
        } catch (Exception e){
            if(em.getTransaction().isActive()) em.getTransaction().rollback();
            throw e;
        }finally {
            em.close();
        }
    }

    public void deleteResult(Results result){
        EntityManager em = JPAUtils.getFactory().createEntityManager();
        try {
            em.getTransaction().begin();
            Results existing = resultDAO.find(em, result.getId());
            if (existing != null) {
                resultDAO.delete(em, result);
            }
        }catch (Exception e){
            if(em.getTransaction().isActive()) em.getTransaction().rollback();
            throw e;
        }finally {
            em.close();
        }
    }
}