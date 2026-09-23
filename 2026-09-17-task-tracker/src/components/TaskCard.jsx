export function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>State: {task.completed ? 'Completed' : 'Not completed'}</p>
      {onToggle && (
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Set as not completed' : 'Set as completed'}
        </button>
      )}
      {onDelete && (
        <button onClick={() => onDelete(task.id)}>Delete</button>
      )}
    </div>
  );
}