import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Add_item } from './Todoslice';
const Form = () => {
    const todos = useSelector((state) => state.Todo.value);
     const dispatch = useDispatch();
    
    // console.log(todos)
    const [todoValue, setTodoValue]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj={
            id: time,
            todo: todoValue,
            completed: false
        }
        
        dispatch(Add_item(todoObj))
        setTodoValue('')
      }
    
      return (
    <div className='form'>
    
    <input type='text'  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue} />
    <button className='btn btn-danger mx-2' onClick={handleSubmit}>Add</button>
    
    </div>
  )
}

export default Form
