import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from './TaskCard';

describe('TaskCard Component', () => {
  const dummyTask = {
    id: 1,
    title: 'Learn JSX',
    completed: false,
  };

  it('renders task title correctly', () => {
    render(<TaskCard task={dummyTask} />);
    
    expect(screen.getByText('Learn JSX')).toBeInTheDocument();
  });

  it('calls onToggle callback when button is clicked', () => {
    const handleToggle = vi.fn();
    render(<TaskCard task={dummyTask} onToggle={handleToggle} />);

    const button = screen.getByRole('button', { name: /Set as completed/i });
    fireEvent.click(button);

    expect(handleToggle).toHaveBeenCalledWith(1);
  });
});