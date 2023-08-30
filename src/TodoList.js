import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, editTodo, fetchdata } from './Todoslice';
import { getDocs, collection } from "firebase/firestore"; 
import { Add_item, } from './Todoslice';

import db from './Firebase'

const TodoList = ({ handleEditClick, editFormVisibility }) => {
  const todos = useSelector((state) => state.Todo.todos);
  const dispatch = useDispatch();
  const [editedTodoText, setEditedTodoText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    dispatch(fetchdata());
  }, []);

  const handleEditTodo = (id, editedText) => {
    dispatch(editTodo({ id, updatedTodo: editedText }));
    setEditingTodoId(null);
    setEditedTodoText('');
  };
  
  
  // console.log(todos);

// console.log("This is",todos)
  return todos?.map((todo) => (
    <div key={todo.docId} className='todo-box'>
      {/* {console.log("id",todo.docId)} */}
      <div className='content'>
        {editingTodoId === todo.id ? (
          <input
            type='text'
            value={editedTodoText}
            onChange={(e) => setEditedTodoText(e.target.value)}
          />
        ) : (
          <p
            className='mt-2'
            style={
              todo.completed === true
                ? { textDecoration: 'line-through' }
                : { textDecoration: 'none' }
            }
          >
            {todo.item}
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
              onClick={() => dispatch(removeTodo(todo.docId))}
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
