import { useParams, Link } from 'react-router-dom';

export function TaskDetailPage({ tasks }) {
  const { taskId } = useParams();
  const task = tasks.find((t) => t.id === Number(taskId));

  if (!task) {
    return (
      <div>
        <h2>Task not found!</h2>
        <Link to="/tasks">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Olek: {task.completed ? 'Completed' : 'Not completed'}</p>
      <p>ID: {task.id}</p>
      <Link to="/tasks">Back to list</Link>
    </div>
  );
}