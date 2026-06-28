package com.flowhub.backend.config;

import com.flowhub.backend.entity.User;
import com.flowhub.backend.entity.Workflow;
import com.flowhub.backend.repository.UserRepository;
import com.flowhub.backend.repository.WorkflowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkflowRepository workflowRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (workflowRepository.count() == 0) {
            // Create a mock user
            User mockUser = new User();
            mockUser.setUsername("johndoe");
            mockUser.setEmail("johndoe@example.com");
            mockUser.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(mockUser);

            // Create mock workflows
            Workflow w1 = new Workflow();
            w1.setTitle("Slack to Notion Sync");
            w1.setDescription("Automatically syncs saved Slack messages to a Notion database.");
            w1.setCategory("Productivity");
            w1.setTags("slack,notion");
            w1.setDownloadCount(1420);
            w1.setFilename("slack_notion.json");
            w1.setUser(mockUser);

            Workflow w2 = new Workflow();
            w2.setTitle("OpenAI Auto-Responder");
            w2.setDescription("Uses OpenAI to generate intelligent replies to customer emails.");
            w2.setCategory("AI");
            w2.setTags("openai,gmail");
            w2.setDownloadCount(890);
            w2.setFilename("openai_gmail.json");
            w2.setUser(mockUser);

            Workflow w3 = new Workflow();
            w3.setTitle("Daily Weather Report");
            w3.setDescription("Sends a daily weather forecast to your Telegram.");
            w3.setCategory("Utility");
            w3.setTags("weather,telegram");
            w3.setDownloadCount(56);
            w3.setFilename("weather_telegram.json");
            w3.setUser(mockUser);

            Workflow w4 = new Workflow();
            w4.setTitle("Stripe Payment to Discord");
            w4.setDescription("Get a Discord notification every time a Stripe payment succeeds.");
            w4.setCategory("Sales");
            w4.setTags("stripe,discord");
            w4.setDownloadCount(340);
            w4.setFilename("stripe_discord.json");
            w4.setUser(mockUser);

            Workflow w5 = new Workflow();
            w5.setTitle("GitHub Issue Summarizer");
            w5.setDescription("Summarize weekly GitHub issues using Claude.");
            w5.setCategory("AI");
            w5.setTags("github,claude");
            w5.setDownloadCount(220);
            w5.setFilename("github_claude.json");
            w5.setUser(mockUser);

            workflowRepository.saveAll(List.of(w1, w2, w3, w4, w5));
            System.out.println("Data Seeder: Injected 5 mock workflows successfully.");
        }
    }
}
