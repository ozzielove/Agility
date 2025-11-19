/**
 * Agility - A simple task management application
 * This module provides core functionality for managing tasks
 */

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  /**
   * Add a new task
   * @param {string} title - The task title
   * @param {string} description - The task description
   * @param {string} priority - Task priority (low, medium, high)
   * @returns {object} The created task
   */
  addTask(title, description, priority = 'medium') {
    if (!title || typeof title !== 'string') {
      throw new Error('Task title is required and must be a string');
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
      throw new Error('Priority must be low, medium, or high');
    }

    const task = {
      id: this.nextId++,
      title: title.trim(),
      description: description ? description.trim() : '',
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    this.tasks.push(task);
    return task;
  }

  /**
   * Get a task by ID
   * @param {number} id - The task ID
   * @returns {object|null} The task or null if not found
   */
  getTask(id) {
    return this.tasks.find(task => task.id === id) || null;
  }

  /**
   * Get all tasks
   * @param {string} status - Optional filter by status
   * @returns {array} Array of tasks
   */
  getAllTasks(status = null) {
    if (status) {
      return this.tasks.filter(task => task.status === status);
    }
    return [...this.tasks];
  }

  /**
   * Update task status
   * @param {number} id - The task ID
   * @param {string} status - New status (pending, in-progress, completed)
   * @returns {object|null} Updated task or null if not found
   */
  updateTaskStatus(id, status) {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status. Must be pending, in-progress, or completed');
    }

    const task = this.getTask(id);
    if (!task) {
      return null;
    }

    task.status = status;
    if (status === 'completed') {
      task.completedAt = new Date().toISOString();
    }

    return task;
  }

  /**
   * Delete a task
   * @param {number} id - The task ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }

  /**
   * Get tasks by priority
   * @param {string} priority - Priority level
   * @returns {array} Array of tasks with specified priority
   */
  getTasksByPriority(priority) {
    return this.tasks.filter(task => task.priority === priority);
  }

  /**
   * Clear all tasks
   */
  clearAllTasks() {
    this.tasks = [];
    this.nextId = 1;
  }
}

module.exports = TaskManager;
