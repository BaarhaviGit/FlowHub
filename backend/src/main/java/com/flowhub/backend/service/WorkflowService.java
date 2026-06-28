package com.flowhub.backend.service;

import com.flowhub.backend.entity.User;
import com.flowhub.backend.entity.Workflow;
import com.flowhub.backend.repository.UserRepository;
import com.flowhub.backend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@Service
public class WorkflowService {

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Workflow uploadWorkflow(String title, String description, String category, String tags, MultipartFile file, String username) throws IOException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = StringUtils.cleanPath(System.currentTimeMillis() + "_" + file.getOriginalFilename());
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Workflow workflow = new Workflow();
        workflow.setTitle(title);
        workflow.setDescription(description);
        workflow.setCategory(category);
        workflow.setTags(tags);
        workflow.setFilename(fileName);
        workflow.setUser(user);

        return workflowRepository.save(workflow);
    }

    public List<Workflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }

    public Workflow getWorkflowById(Long id) {
        return workflowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workflow not found with id " + id));
    }

    public List<Workflow> searchWorkflows(String query) {
        return workflowRepository.searchWorkflows(query);
    }

    @Autowired
    private N8nService n8nService;

    public Path downloadWorkflow(Long id) {
        Workflow workflow = getWorkflowById(id);
        workflow.setDownloadCount(workflow.getDownloadCount() + 1);
        workflowRepository.save(workflow);
        return Paths.get(uploadDir).resolve(workflow.getFilename());
    }

    public Map<String, Object> deployToN8n(Long id) throws IOException {
        Path filePath = downloadWorkflow(id);
        String workflowJson = Files.readString(filePath);
        
        Map<String, Object> result = n8nService.deployWorkflow(workflowJson);
        String n8nId = (String) result.get("n8nId");
        
        Workflow workflow = getWorkflowById(id);
        workflow.setN8nId(n8nId);
        workflowRepository.save(workflow);
        
        return result;
    }

    public Map<String, Object> getN8nStatus(Long id) {
        Workflow workflow = getWorkflowById(id);
        if (workflow.getN8nId() == null) {
            throw new RuntimeException("Workflow has not been deployed to n8n yet.");
        }
        return n8nService.getWorkflowStatus(workflow.getN8nId());
    }
}
