import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { PageSection } from './components/PageSection';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getTasks } from './services/taskApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    let ignore = false;
    getTasks()
      .then((data) => {
        if (!ignore) {
          setTasks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'incomplete') return !t.completed;
    return true;
  });

  return (
    <HashRouter>
      <main style={{ padding: '20px' }}>
        <Header />
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/tasks">Tasks</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<h2>Welcome to Task Tracker!</h2>}
          />
          <Route
            path="/tasks"
            element={
              <PageSection title="Task list">
                <TaskForm onAddTask={handleAddTask} />

                <div style={{ margin: '10px 0' }}>
                  <button onClick={() => setFilter('all')}>All</button>
                  <button onClick={() => setFilter('completed')}>Completed</button>
                  <button onClick={() => setFilter('incomplete')}>Incompleted</button>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                {!loading && !error && filteredTasks.length === 0 ? (
                  <p>No tasks found</p>
                ) : (
                  filteredTasks.map((task) => (
                    <div key={task.id}>
                      <TaskCard
                        task={task}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                      />
                      <Link to={`/tasks/${task.id}`}>Details</Link>
                    </div>
                  ))
                )}
              </PageSection>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={<TaskDetailPage tasks={tasks} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </HashRouter>
  );
}