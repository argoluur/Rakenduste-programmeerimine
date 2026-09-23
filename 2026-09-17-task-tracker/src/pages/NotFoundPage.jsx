import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page not foud</h2>
      <Link to="/">Back to homepage</Link>
    </div>
  );
}