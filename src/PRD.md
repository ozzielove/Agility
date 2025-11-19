# Product Requirements Document - Agility Task Manager

## Overview
Agility is a lightweight task management system that allows users to create, manage, and track tasks with different priority levels.

## Core Features

### 1. Task Creation
- Users can create tasks with a title, description, and priority level
- Priority levels: low, medium, high
- Each task gets a unique ID
- Tasks start with "pending" status
- Timestamp recorded on creation

### 2. Task Retrieval
- Get individual task by ID
- Get all tasks
- Filter tasks by status (pending, in-progress, completed)
- Filter tasks by priority level

### 3. Task Management
- Update task status (pending → in-progress → completed)
- Delete tasks by ID
- Track completion timestamp when task is marked completed
- Clear all tasks

### 4. Data Validation
- Title is required and must be a string
- Priority must be one of: low, medium, high
- Status must be one of: pending, in-progress, completed

## User Stories

### US-1: Create Task
**As a** user
**I want to** create a new task with title and priority
**So that** I can track my work items

**Acceptance Criteria:**
- Task requires a valid title
- Priority defaults to "medium" if not specified
- Task gets unique incremental ID
- Task starts with "pending" status

### US-2: View Tasks
**As a** user
**I want to** view all my tasks
**So that** I can see what needs to be done

**Acceptance Criteria:**
- Can retrieve all tasks
- Can filter by status
- Can filter by priority
- Can get individual task by ID

### US-3: Update Task Status
**As a** user
**I want to** update task status
**So that** I can track progress

**Acceptance Criteria:**
- Can change status to pending, in-progress, or completed
- Completion timestamp recorded when marked completed
- Invalid status throws error

### US-4: Delete Task
**As a** user
**I want to** delete tasks
**So that** I can remove items I no longer need

**Acceptance Criteria:**
- Can delete by task ID
- Returns true if deleted, false if not found
- Task is removed from list

## Technical Requirements

- Pure JavaScript implementation (Node.js compatible)
- No external dependencies for core functionality
- In-memory storage (array-based)
- Class-based architecture
- Proper error handling for invalid inputs

## Error Handling

1. Missing or invalid title → Error
2. Invalid priority level → Error
3. Invalid status → Error
4. Operations on non-existent tasks → Return null/false

## Future Enhancements (Out of Scope)

- Persistent storage (database)
- Due dates and reminders
- Task categories/tags
- User authentication
- Task assignment to users
- Sub-tasks
