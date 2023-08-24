import React, { useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Add_item } from './Todoslice';
const Form2 = ({editFormVisibility, editTodo, cancelUpdate}) => {
    const todos = useSelector((state) => state.Todo.value);
     const dispatch = useDispatch();
    
    // console.log(todos)
    const [todoValue, setTodoValue]=useState('');
  const [editValue, setEditValue]=useState('');

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

      useEffect(()=>{
        setEditValue(editTodo.todo);
      },[editTodo])

      const editSubmit = (e) =>{
        e.preventDefault();
        let editedObj={
          id: editTodo.id,
          todo: editValue,
          completed: false
        }
      


      return (
    <div className='form'>
    <form>
    <input type='text'  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue} />
    <button className='btn btn-danger' onClick={handleSubmit} >Add</button>
    </form>
 
    
      {editFormVisibility===false?(
        <form className='form-group custom-form'>
          <label>Enter Item</label>
          <div className='input-and-btn'>
              <input type="text" className='form-control' required
              value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
              <button  className='btn btn-secondary btn-md mx-2'
               onClick={{handleSubmit}}>ADD</button>
          </div>
        </form>
      ):(
        <form className='form-group custom-form' >
          <label>Update your todo-items</label>
          <div className='input-and-btn'>
              <input type="text" className='form-control' required
              value={editValue||""} onChange={(e)=>setEditValue(e.target.value)}/>
              <button onClick={editSubmit}  className='btn btn-secondary btn-md'>UPDATE</button>
          </div>
          <button type="button"  className='btn btn-primary btn-md back-btn'
          onClick={cancelUpdate}>BACK</button>
        </form>
      )}
    
    </div>
  )}
      }

export default Form2
