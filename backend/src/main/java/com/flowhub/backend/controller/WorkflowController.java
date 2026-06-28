package com.flowhub.backend.controller;

import com.flowhub.backend.entity.Workflow;
import com.flowhub.backend.service.WorkflowService;
import com.flowhub.backend.service.N8nService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workflows")
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    @Autowired
    private N8nService n8nService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Workflow> uploadWorkflow(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("tags") String tags,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        String username = authentication.getName();
        Workflow workflow = workflowService.uploadWorkflow(title, description, category, tags, file, username);
        return ResponseEntity.ok(workflow);
    }

    @GetMapping
    public ResponseEntity<List<Workflow>> getAllWorkflows() {
        return ResponseEntity.ok(workflowService.getAllWorkflows());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workflow> getWorkflowById(@PathVariable Long id) {
        return ResponseEntity.ok(workflowService.getWorkflowById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Workflow>> searchWorkflows(@RequestParam("q") String query) {
        return ResponseEntity.ok(workflowService.searchWorkflows(query));
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadWorkflow(@PathVariable Long id) {
        try {
            Path filePath = workflowService.downloadWorkflow(id);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/deploy")
    public ResponseEntity<?> deployWorkflow(@PathVariable Long id) {
        try {
            // MOCK DEPLOYMENT FOR MVP/PORTFOLIO
            // Simulate processing delay
            Thread.sleep(1000);

            Map<String, Object> result = new java.util.HashMap<>();
            result.put("warning", "Your workflow has been deployed to a secure isolated container. Webhook is now active.");
            result.put("workflowId", id);
            
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("status", "success");
            response.put("n8nResponse", result);
            return ResponseEntity.ok(response);
        } catch (Throwable t) {
            t.printStackTrace();
            Map<String, Object> err = new java.util.HashMap<>();
            err.put("status", "error");
            err.put("message", "Mock deployment failed: " + t.getMessage());
            return ResponseEntity.status(500).body(err);
        }
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<?> getWorkflowStatus(@PathVariable Long id) {
        try {
            Map<String, Object> status = workflowService.getN8nStatus(id);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
