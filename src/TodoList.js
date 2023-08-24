import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo } from './Todoslice';

const TodoList = ({ handleEditClick, editFormVisibility }) => {
  const todos = useSelector((state) => state.Todo.value);
  const dispatch = useDispatch();

  const [editedTodoText, setEditedTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const handleEditTodo = (id, editedText) => {
    dispatch(editTodo({ id, updatedTodo: editedText }));
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  return todos.map((todo) => (
    <div key={todo.id} className='todo-box'>
      <div className='content'>
        {editingTodoId === todo.id ? (
          <input type='text' value={editedTodoText}onChange={(e) => setEditedTodoText(e.target.value)}/>
        ) : (
          <p
            className='mt-2'
            style={
              todo.completed === true
                ? { textDecoration: 'line-through' }
                : { textDecoration: 'none' }
            }
          >
            {todo.todo}
          </p>
        )}
      </div>
      <div className='actions-box'>
        {editFormVisibility === false && (
          <>
            {editingTodoId !== todo.id ? (
              <button
                onClick={() => setEditingTodoId(todo.id)}
                className='btn btn-dark m-1'
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleEditTodo(todo.id, editedTodoText)}
                className='btn btn-dark m-1'
              >
                Save
              </button>
            )}
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className='btn btn-danger m-1'
            >
            Delete
            </button>
          </>
        )}
      </div>
    </div>
  ));
};

export default TodoList;
