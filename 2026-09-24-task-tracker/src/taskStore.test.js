import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { loadTasks, saveTasks } from './taskStore.js';

describe('taskStore', () => {
  it('returns a valid task array from a file', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'task-store-'));
    const filePath = path.join(dir, 'tasks.json');

    await saveTasks([{ id: 1, title: 'Persisted task', completed: false }], filePath);
    const tasks = await loadTasks(filePath);

    expect(tasks).toEqual([{ id: 1, title: 'Persisted task', completed: false }]);

    await rm(dir, { recursive: true, force: true });
  });

  it('returns an empty array when the file does not exist', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'task-store-missing-'));
    const filePath = path.join(dir, 'missing-tasks.json');

    const tasks = await loadTasks(filePath);

    expect(tasks).toEqual([]);

    await rm(dir, { recursive: true, force: true });
  });

  it('throws a clear error for invalid JSON', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'task-store-bad-'));
    const filePath = path.join(dir, 'broken.json');

    await import('node:fs/promises').then(({ writeFile }) =>
      writeFile(filePath, '{bad json', 'utf8'),
    );

    await expect(loadTasks(filePath)).rejects.toThrow('Invalid JSON in task data');

    await rm(dir, { recursive: true, force: true });
  });

  it('saves and loads tasks from a temporary file', async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'task-store-save-'));
    const filePath = path.join(dir, 'tasks.json');
    const originalTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    await saveTasks(originalTasks, filePath);
    const loadedTasks = await loadTasks(filePath);

    expect(loadedTasks).toEqual(originalTasks);

    await rm(dir, { recursive: true, force: true });
  });
});
