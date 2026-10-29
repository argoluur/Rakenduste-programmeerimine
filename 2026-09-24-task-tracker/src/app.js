import express from 'express';
import { loadTasks, saveTasks } from './taskStore.js';

export const app = express();

app.use(express.json());

const initialTasks = [
  { id: 1, title: 'Learn JSX', completed: true },
  { id: 2, title: 'Practise React state', completed: false },
  { id: 3, title: 'Build a Node.js API', completed: false },
];

const DEFAULT_TASKS_FILE = process.env.TASKS_FILE || './data/tasks.json';

let tasks = [];

export async function resetTasks(filePath = process.env.TASKS_FILE || DEFAULT_TASKS_FILE) {
  const targetFile = filePath || DEFAULT_TASKS_FILE;
  const loadedTasks = await loadTasks(targetFile);

  tasks = loadedTasks.length > 0 ? loadedTasks : [...initialTasks];

  if (tasks.length === 0) {
    await saveTasks(tasks, targetFile);
  }
}

await resetTasks();

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/tasks', (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined && completed !== 'true' && completed !== 'false') {
    return res.status(400).json({ error: 'completed must be true or false' });
  }

  let filteredTasks = tasks;

  if (completed !== undefined) {
    filteredTasks = tasks.filter(
      (task) => String(task.completed) === completed,
    );
  }

  return res.json(filteredTasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  return res.json(task);
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  await saveTasks(tasks, process.env.TASKS_FILE || DEFAULT_TASKS_FILE);

  return res.status(201).json(newTask);
});

app.patch('/api/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;

  if (
    (title !== undefined && (typeof title !== 'string' || title.trim() === '')) ||
    (completed !== undefined && typeof completed !== 'boolean')
  ) {
    return res.status(400).json({ error: 'Invalid task update' });
  }

  if (title !== undefined) {
    task.title = title.trim();
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  await saveTasks(tasks, process.env.TASKS_FILE || DEFAULT_TASKS_FILE);

  return res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  await saveTasks(tasks, process.env.TASKS_FILE || DEFAULT_TASKS_FILE);

  return res.status(204).end();
});
