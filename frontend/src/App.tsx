import React, { useState, useEffect } from 'react';
import './App.css';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types/Todo';
import { todoApi } from './services/todoApi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await todoApi.getAllTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData: CreateTodoRequest) => {
    try {
      const newTodo = await todoApi.createTodo(todoData);
      setTodos([...todos, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
    }
  };

  const handleUpdateTodo = async (todoData: CreateTodoRequest) => {
    if (!editingTodo) return;

    try {
      const updateData: UpdateTodoRequest = {
        title: todoData.title,
        description: todoData.description,
      };
      const updatedTodo = await todoApi.updateTodo(editingTodo.id, updateData);
      setTodos(todos.map(todo => todo.id === editingTodo.id ? updatedTodo : todo));
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await todoApi.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoApi.deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete todo');
      }
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">Todo App</h1>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && (
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total: {totalCount} todos</h5>
                <h5>Completed: {completedCount}/{totalCount}</h5>
              </div>
              {totalCount > 0 && (
                <div className="progress mt-2">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  >
                    {Math.round((completedCount / totalCount) * 100)}%
                  </div>
                </div>
              )}
            </div>
          )}

          <TodoForm
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            editingTodo={editingTodo}
            onCancel={handleCancelEdit}
          />

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
