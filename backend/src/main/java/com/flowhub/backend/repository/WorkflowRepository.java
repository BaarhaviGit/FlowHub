package com.flowhub.backend.repository;

import com.flowhub.backend.entity.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkflowRepository extends JpaRepository<Workflow, Long> {
    
    @Query("SELECT w FROM Workflow w WHERE LOWER(w.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(w.description) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(w.tags) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Workflow> searchWorkflows(@Param("query") String query);
}
