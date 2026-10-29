import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_TASKS_FILE = './data/tasks.json';

export async function loadTasks(filePath = DEFAULT_TASKS_FILE) {
  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error('Task data must be an array');
    }

    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON in task data');
    }

    if (error.message === 'Task data must be an array') {
      throw new Error('Task data must be an array');
    }

    throw error;
  }
}

export async function saveTasks(tasks, filePath = DEFAULT_TASKS_FILE) {
  const directory = path.dirname(filePath);

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, `${JSON.stringify(tasks, null, 2)}\n`, 'utf8');
}
