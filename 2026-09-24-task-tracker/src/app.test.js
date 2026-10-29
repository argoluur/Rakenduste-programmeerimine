import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { describe, it, expect, beforeEach } from 'vitest';
import { app, resetTasks } from './app.js';

describe('API integration tests', () => {
  beforeEach(async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'task-api-test-'));
    const tempFile = path.join(dir, 'tasks.json');
    process.env.TASKS_FILE = tempFile;
    await resetTasks(tempFile);
  });

  it('GET /api/tasks returns all tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  it('POST /api/tasks creates a valid task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Learn Express' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Learn Express',
      completed: false,
    });
  });

  it('POST /api/tasks rejects an empty title', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' });

    expect(response.status).toBe(400);
  });

  it('GET /api/tasks/:id returns 404 for an unknown task', async () => {
    const response = await request(app).get('/api/tasks/999');

    expect(response.status).toBe(404);
  });

  it('DELETE /api/tasks/:id removes a task', async () => {
    const response = await request(app).delete('/api/tasks/1');

    expect(response.status).toBe(204);
    const listResponse = await request(app).get('/api/tasks');
    expect(listResponse.body.some((task) => task.id === 1)).toBe(false);
  });
});
