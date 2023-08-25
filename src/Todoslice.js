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
        
        //THIS WILL SAVE DATA TO FIREBASE DATABASE

        const id = action.payload.id;
        const product = action.payload.todo;
        console.log("This is id: "+id);
        fetch(
          "https://todoreactapp-1f616-default-rtdb.firebaseio.com/Todo_Items_01.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              product,
            }),
          }
        );
      },

      removeTodo:(state,action)=>{
        // const id = action.payload;
        // console.log(id);
        state.value = state.value.filter(todo => todo.id !== action.payload);
       
      },
      
      editTodo: (state, action) => {
        const { id, updatedTodo } = action.payload;
        const todoToEdit = state.value.find(todo => todo.id === id);
        if (todoToEdit) {
          todoToEdit.todo = updatedTodo;
          
          fetch(
            `https://todoreactapp-1f616-default-rtdb.firebaseio.com/Todo_Items_01/${id}.json`,
            {
              method: "PATCH", // Use PATCH for partial updates
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id,  
                product: updatedTodo,
              }),
            }
          );
  
        }
      },

      
    },
  })
  
  export const {Add_item,removeTodo,editTodo,saveData} = todoSlice.actions
  
  export default todoSlice.reducer