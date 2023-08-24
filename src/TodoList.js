import { useSelector, useDispatch } from 'react-redux'
import { Add_item,removeTodo } from './Todoslice'
  const TodoList = ({handleEditClick, editFormVisibility}) => {
    const todos = useSelector((state) => state.Todo.value);
    const dispatch = useDispatch()
    
    
    console.log(todos)
    {return todos.map((todo)=>(
        <div key={todo.id} className='todo-box'>
            <div className='content'>
                
                <p className='mt-2' style={todo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                    {todo.todo}
                </p>
            </div>
            <div className='actions-box'>
                  {editFormVisibility===false&&(
                    <>
                      <button  className='btn btn-dark m-1'>Edit</button>
                      <button onClick={()=>dispatch(removeTodo(todo.id))} className='btn btn-danger m-1'>Dlt</button>
                      {/* <button onClick={()=>{console.log(todo.id)}} className='btn btn-danger m-1'>Dlt</button> */}
                    
                    </>
                  )}
            </div>
        </div>
      ))}
    
}
  
  export default TodoList
  