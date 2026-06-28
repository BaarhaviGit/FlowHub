package com.flowhub.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@Service
public class N8nService {

    private final WebClient webClient;

    public N8nService(@Value("${n8n.base-url}") String baseUrl,
                      @Value("${n8n.api-key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("X-N8N-API-KEY", apiKey)
                .build();
    }

    public Map<String, Object> deployWorkflow(String workflowJson) {
        try {
            // Force recompile via timestamp touch
            // n8n's POST /workflows endpoint is extremely strict and rejects extra fields.
            // When users export workflows, they include ids, createdAt, etc. We must strip them.
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> rawWorkflow = mapper.readValue(workflowJson, Map.class);
            
            Map<String, Object> sanitizedWorkflow = new HashMap<>();
            sanitizedWorkflow.put("name", rawWorkflow.getOrDefault("name", "FlowHub Deployment"));
            sanitizedWorkflow.put("nodes", rawWorkflow.getOrDefault("nodes", new Object[0]));
            sanitizedWorkflow.put("connections", rawWorkflow.getOrDefault("connections", new HashMap<>()));
            // n8n requires 'settings' to exist, but rejects it if it has any properties. Force empty.
            sanitizedWorkflow.put("settings", new HashMap<>());

            // Create the workflow in n8n
            Map createResponse = webClient.post()
                    .uri("/workflows")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(sanitizedWorkflow)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (createResponse != null && createResponse.containsKey("id")) {
                String workflowId = String.valueOf(createResponse.get("id"));
                Map<String, Object> result = new HashMap<>();
                try {
                    Map<String, Object> activationResult = activateWorkflow(workflowId);
                    if (activationResult != null) {
                        result.putAll(activationResult);
                    }
                } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {
                    // If n8n rejects activation due to a webhook conflict, treat the deployment as a success
                    // because the workflow WAS successfully imported into n8n.
                    if (e.getResponseBodyAsString() != null && e.getResponseBodyAsString().contains("conflict")) {
                        result.put("warning", "Imported successfully, but requires manual activation in n8n due to a webhook conflict.");
                    } else {
                        throw e;
                    }
                }
                result.put("n8nId", workflowId);
                return result;
            } else {
                throw new RuntimeException("Failed to deploy workflow to n8n");
            }
        } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {
            throw e; // Let the exact n8n error bubble up to the controller
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, Object> activateWorkflow(String workflowId) {
        return webClient.post()
                .uri("/workflows/{id}/activate", workflowId)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    public Map<String, Object> getWorkflowStatus(String workflowId) {
        return webClient.get()
                .uri("/workflows/{id}", workflowId)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }
}
