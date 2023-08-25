import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Add_item,fetchData } from './Todoslice';
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

        // dispatch(Add_item(todoObj),saveData(todoObj))
        setTodoValue('')
      }
      const getData=(e)=>{
        e.preventDefault();
        dispatch(fetchData())
      }
      
      
      
      return (
    <div className='form'>
    {/* <form method="POST" className='d-flex'> */}
    <input type='text' placeholder='Enter Item' required onChange={(e)=>setTodoValue(e.target.value)} value={todoValue} />
    <button className='btn btn-danger mx-2' onClick={handleSubmit}>Add</button>
    <button className='btn btn-danger mx-2' onClick={getData}>Getdata</button>

    {/* </form>   */}
    
    </div>
  )
}

export default Form
