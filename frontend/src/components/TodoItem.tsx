import React from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h5 className={`card-title ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {todo.title}
            </h5>
            {todo.description && (
              <p className={`card-text ${todo.completed ? 'text-muted' : ''}`}>
                {todo.description}
              </p>
            )}
            <small className="text-muted">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </small>
          </div>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${todo.completed ? 'btn-warning' : 'btn-success'}`}
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(todo)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;