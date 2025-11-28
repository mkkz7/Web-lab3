package org.example.db;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.example.entities.Results;

import java.util.List;

@ApplicationScoped
public class ResultDAO implements ResultDAOInterface{
    @Override
    public void save(EntityManager em, Results result){
        em.persist(result);
    }

    @Override
    public List<Results> getAll(EntityManager em){
        return em.createQuery("select points from Results points", Results.class)
                .getResultList();
    }

    @Override
    public Results find(EntityManager em, long id){
        return em.find(Results.class, id);
    }

    @Override
    public void delete(EntityManager em, Results result){
        em.remove(result);
    }

    @Override
    public void clear(EntityManager em){
        Query query = em.createQuery("delete from Results point");
        query.executeUpdate();
    }
}
