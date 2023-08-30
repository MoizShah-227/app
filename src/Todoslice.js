  import { createSlice } from '@reduxjs/toolkit'
  import db from './Firebase'
  // import { dataRef } from './Firebase';
  import { getDocs, collection, updateDoc,addDoc,deleteDoc, doc, onSnapshot, Firestore } from "firebase/firestore";
  import { Firebase } from 'firebase/app';

  
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
          console.log(action.payload);
          // state.value.push(action.payload);
          const id =action.payload.id;
          const item =action.payload.todo;
          // console.log(item);
          try {
            const docRef = addDoc(collection(db, "Todo-List-3"), {
              id: id,
              item: item,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        },
  
        removeTodo: async (state, action) => {
          const todoIdToRemove = action.payload;
          console.log(todoIdToRemove);
          state.value = state.value.filter(todo => todo.id !== todoIdToRemove);
          // console.log(doc(todoIdToRemove))
          try {          
            await deleteDoc(doc(db, "Todo-List-3", todoIdToRemove));
            console.log("Document deleted with ID: ", todoIdToRemove);
          } catch (e) {
            console.error("Error deleting document: ", e);
          }
        },

        

        editTodo: (state, action) => {
          const { id, updatedTodo } = action.payload;
          console.log(id,updatedTodo);
           const todoToEdit = state.value.find(todo => todo.id === id);  
          console.log("Hello",todoToEdit);
          try {
            console.log("Edit press");
            updateDoc(doc(db, "Todo-List-3", id), {
              item: updatedTodo,
            });
            console.log("Document updated with ID: ", id);
          } catch (e) {
            console.error("Error updating document: ", e);
          }
          if (todoToEdit) {
            console.log("Edit-One",todoToEdit)
            todoToEdit.todo = updatedTodo;
          }
          
        },

      },
    
    })
    
    export const {Add_item,removeTodo,editTodo,saveData,FetchData,todos} = todoSlice.actions
    
    export default todoSlice.reducer