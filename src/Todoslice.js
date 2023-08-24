import { createSlice } from '@reduxjs/toolkit'
const initialState = {
value:[    
    // {id:1,todo:'cake',completed:false},
    // {id:2,todo:'NoThing',completed:false},
    // {id:3,todo:'Habibian',completed:false},
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
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {Add_item,removeTodo} = todoSlice.actions
  
  export default todoSlice.reducer