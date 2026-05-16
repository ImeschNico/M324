package com.example.demo;

/**
 * the simplest task
 */
public class Task {

    private String taskdescription;
    private String priority = "Mittel";
	private String createdAt = java.time.LocalDate.now().toString();

    public Task() {
    }

    public String getTaskdescription() {
        return taskdescription;
    }

    public void setTaskdescription(String taskdescription) {
        this.taskdescription = taskdescription;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
	public String getCreatedAt() {
    return createdAt;
}
}