import React, { useState } from 'react'
import TodoList from './TodoList'
import '../src/App.css'
import {useDispatch, useSelector} from 'react-redux';
import Form  from './Form';
import Form2  from './Form_2';
import Header  from './Header';
const App = () => {
  const dispatch = useDispatch();

  
  const todos = useSelector((state)=>state.operationsReducer);

  const [editFormVisibility, setEditFormVisibility]=useState(false);
  const [editTodo, setEditTodo]=useState('');

  
  const handleEditClick=(todo)=>{
    setEditFormVisibility(true);
    setEditTodo(todo);
  }

  const cancelUpdate=()=>{
    setEditFormVisibility(false);
  }
  return (
  <>  
        <Header/>
    <div className='container contain-components mt-5'>
      <Form/>
      {/* <Form2 editFormVisibility={editFormVisibility} editTodo={editTodo} */}
      {/* cancelUpdate={cancelUpdate}/> */}
      <TodoList handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
    </div>
  </>
  )
}

export default App
