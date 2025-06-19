import React from 'react';
import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[] | null;
  tempTodo: Todo | null;
  loadingIds: number[];
  onChecked: (todoId: number) => void;
  onDeleted: (todoId: number) => void;
  isLoading: boolean;
};

export const TodoList = ({
  todos /*, onChecked*/,
  tempTodo,
  loadingIds,
  onDeleted,
  isLoading,
  onChecked,
}: Props) => {
  if (!todos) {
    return null;
  }

  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          loading={loadingIds.includes(todo.id)}
          onDeleted={onDeleted}
          onChecked={onChecked}
        />
      ))}
      {isLoading && (
        <TodoItem
          key={'temp'}
          todo={tempTodo}
          loading={true}
          onDeleted={onDeleted}
          onChecked={onChecked}
        />
      )}
    </>
  );
};
