export async function getTasks() {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error('Error loading data');
  }
  return response.json();
}

export async function createTask(title) {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('Error creating task');
  }

  return response.json();
}

export async function updateTask(id, updates) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Error updating task');
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error deleting task');
  }

  return response;
}