import { createSlice } from '@reduxjs/toolkit'
const initialState = {
value:[    
 ],
}

// console.log(initialState.value)

  export const todoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
      Add_item: (state , action) => {

       state.value.push(action.payload);  
      },
      removeTodo:(state,action)=>{
        state.value = state.value.filter(todo => todo.id !== action.payload);
      },
      editTodo: (state, action) => {
        const { id, updatedTodo } = action.payload;
        const todoToEdit = state.value.find(todo => todo.id === id);
        if (todoToEdit) {
          todoToEdit.todo = updatedTodo;
        }
      },
    },
  })
  
  export const {Add_item,removeTodo,editTodo} = todoSlice.actions
  
  export default todoSlice.reducer