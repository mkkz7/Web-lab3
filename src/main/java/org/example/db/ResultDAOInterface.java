package org.example.db;

import jakarta.persistence.EntityManager;
import org.example.entities.Results;
import java.util.List;

public interface ResultDAOInterface {
    public void save(EntityManager em, Results result);
    public Results find(EntityManager em, long id);
    public List<Results> getAll(EntityManager em);
    public void delete(EntityManager em, Results result);
    public void clear(EntityManager em);
}
