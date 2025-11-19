/**
 * Test Suite for TaskManager
 * Generated for TestSprite validation
 */

const TaskManager = require('../src/index');

describe('TaskManager - Core Functionality', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  describe('Task Creation (US-1)', () => {
    test('should create a task with valid title and default priority', () => {
      const task = taskManager.addTask('Complete project documentation');

      expect(task).toBeDefined();
      expect(task.id).toBe(1);
      expect(task.title).toBe('Complete project documentation');
      expect(task.priority).toBe('medium');
      expect(task.status).toBe('pending');
      expect(task.createdAt).toBeDefined();
    });

    test('should create a task with custom priority', () => {
      const task = taskManager.addTask('Fix critical bug', 'Bug in payment system', 'high');

      expect(task.priority).toBe('high');
      expect(task.description).toBe('Bug in payment system');
    });

    test('should increment task IDs correctly', () => {
      const task1 = taskManager.addTask('First task');
      const task2 = taskManager.addTask('Second task');
      const task3 = taskManager.addTask('Third task');

      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
      expect(task3.id).toBe(3);
    });

    test('should trim whitespace from title and description', () => {
      const task = taskManager.addTask('  Spaces everywhere  ', '  Description with spaces  ');

      expect(task.title).toBe('Spaces everywhere');
      expect(task.description).toBe('Description with spaces');
    });

    test('should throw error when title is missing', () => {
      expect(() => taskManager.addTask()).toThrow('Task title is required and must be a string');
      expect(() => taskManager.addTask('')).toThrow('Task title is required and must be a string');
      expect(() => taskManager.addTask(null)).toThrow('Task title is required and must be a string');
    });

    test('should throw error for invalid title type', () => {
      expect(() => taskManager.addTask(123)).toThrow('Task title is required and must be a string');
      expect(() => taskManager.addTask({})).toThrow('Task title is required and must be a string');
    });

    test('should throw error for invalid priority', () => {
      expect(() => taskManager.addTask('Task', 'Description', 'urgent')).toThrow('Priority must be low, medium, or high');
      expect(() => taskManager.addTask('Task', 'Description', 'critical')).toThrow('Priority must be low, medium, or high');
    });
  });

  describe('Task Retrieval (US-2)', () => {
    beforeEach(() => {
      taskManager.addTask('Task 1', 'First task', 'low');
      taskManager.addTask('Task 2', 'Second task', 'medium');
      taskManager.addTask('Task 3', 'Third task', 'high');
    });

    test('should get task by ID', () => {
      const task = taskManager.getTask(2);

      expect(task).toBeDefined();
      expect(task.id).toBe(2);
      expect(task.title).toBe('Task 2');
    });

    test('should return null for non-existent task ID', () => {
      const task = taskManager.getTask(999);

      expect(task).toBeNull();
    });

    test('should get all tasks', () => {
      const tasks = taskManager.getAllTasks();

      expect(tasks).toHaveLength(3);
      expect(tasks[0].title).toBe('Task 1');
      expect(tasks[2].title).toBe('Task 3');
    });

    test('should filter tasks by status', () => {
      taskManager.updateTaskStatus(1, 'completed');
      taskManager.updateTaskStatus(2, 'in-progress');

      const pendingTasks = taskManager.getAllTasks('pending');
      const completedTasks = taskManager.getAllTasks('completed');

      expect(pendingTasks).toHaveLength(1);
      expect(completedTasks).toHaveLength(1);
      expect(completedTasks[0].id).toBe(1);
    });

    test('should get tasks by priority', () => {
      const highPriorityTasks = taskManager.getTasksByPriority('high');
      const lowPriorityTasks = taskManager.getTasksByPriority('low');

      expect(highPriorityTasks).toHaveLength(1);
      expect(highPriorityTasks[0].title).toBe('Task 3');
      expect(lowPriorityTasks).toHaveLength(1);
    });

    test('should return empty array when no tasks match priority', () => {
      taskManager.clearAllTasks();
      const tasks = taskManager.getTasksByPriority('high');

      expect(tasks).toHaveLength(0);
    });
  });

  describe('Task Status Update (US-3)', () => {
    beforeEach(() => {
      taskManager.addTask('Test task');
    });

    test('should update task status to in-progress', () => {
      const updatedTask = taskManager.updateTaskStatus(1, 'in-progress');

      expect(updatedTask).toBeDefined();
      expect(updatedTask.status).toBe('in-progress');
      expect(updatedTask.completedAt).toBeNull();
    });

    test('should update task status to completed and set timestamp', () => {
      const beforeUpdate = new Date();
      const updatedTask = taskManager.updateTaskStatus(1, 'completed');
      const afterUpdate = new Date();

      expect(updatedTask.status).toBe('completed');
      expect(updatedTask.completedAt).toBeDefined();

      const completedTime = new Date(updatedTask.completedAt);
      expect(completedTime.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
      expect(completedTime.getTime()).toBeLessThanOrEqual(afterUpdate.getTime());
    });

    test('should return null when updating non-existent task', () => {
      const result = taskManager.updateTaskStatus(999, 'completed');

      expect(result).toBeNull();
    });

    test('should throw error for invalid status', () => {
      expect(() => taskManager.updateTaskStatus(1, 'done')).toThrow('Invalid status');
      expect(() => taskManager.updateTaskStatus(1, 'cancelled')).toThrow('Invalid status');
    });
  });

  describe('Task Deletion (US-4)', () => {
    beforeEach(() => {
      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');
      taskManager.addTask('Task 3');
    });

    test('should delete task by ID', () => {
      const result = taskManager.deleteTask(2);

      expect(result).toBe(true);
      expect(taskManager.getAllTasks()).toHaveLength(2);
      expect(taskManager.getTask(2)).toBeNull();
    });

    test('should return false when deleting non-existent task', () => {
      const result = taskManager.deleteTask(999);

      expect(result).toBe(false);
      expect(taskManager.getAllTasks()).toHaveLength(3);
    });

    test('should maintain other tasks when one is deleted', () => {
      taskManager.deleteTask(2);

      expect(taskManager.getTask(1)).toBeDefined();
      expect(taskManager.getTask(3)).toBeDefined();
    });
  });

  describe('Task Manager Utilities', () => {
    test('should clear all tasks', () => {
      taskManager.addTask('Task 1');
      taskManager.addTask('Task 2');

      taskManager.clearAllTasks();

      expect(taskManager.getAllTasks()).toHaveLength(0);
    });

    test('should reset ID counter when clearing tasks', () => {
      taskManager.addTask('Task 1');
      taskManager.clearAllTasks();

      const newTask = taskManager.addTask('New Task');
      expect(newTask.id).toBe(1);
    });
  });

  describe('Edge Cases and Data Integrity', () => {
    test('should handle empty description', () => {
      const task = taskManager.addTask('Task with no description', '');

      expect(task.description).toBe('');
    });

    test('should handle undefined description', () => {
      const task = taskManager.addTask('Task without description');

      expect(task.description).toBe('');
    });

    test('should maintain task immutability for getAllTasks', () => {
      taskManager.addTask('Original task');
      const tasks = taskManager.getAllTasks();
      tasks.push({ id: 999, title: 'Fake task' });

      expect(taskManager.getAllTasks()).toHaveLength(1);
    });
  });
});
