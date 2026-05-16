package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
		assertTrue(true, "alles gut");
	}
	   @Test
    void taskShouldHaveDefaultPriority() {
        Task task = new Task();

        assertEquals("Mittel", task.getPriority());
    }
	 @Test
    void taskShouldStoreDescription() {
        Task task = new Task();
        task.setTaskdescription("Meine Aufgabe");

        assertEquals("Meine Aufgabe", task.getTaskdescription());
    }

        @Test
    void taskShouldHaveCreationDate() {
        Task task = new Task();

        assertNotNull(task.getCreatedAt());
    }

    @Test
void creationDateIsNotEmpty() {
    Task task = new Task();
    assertFalse(task.getCreatedAt().isEmpty());
}
}
