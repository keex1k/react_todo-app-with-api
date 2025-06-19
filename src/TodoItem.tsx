import React, { useState } from 'react';
import { Todo } from './types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo | null;
  onDeleted: (todoId: number) => void;
  loading: boolean;
  onChecked: (todoId: number) => void;
};

export const TodoItem = ({
  todo,
  onChecked,
  onDeleted,
  loading = false,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!todo) {
    return null;
  }

  const handleDelete = () => {
    setIsDeleting(true);
    onDeleted?.(todo.id);
  };

  const isLoading = isDeleting || loading;

  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={classNames({
        todo: true,
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onChecked(todo.id)}
        />
        {/* Możesz tu dodać tekst jeśli chcesz, ale masz osobny span */}
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
        disabled={isLoading}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
