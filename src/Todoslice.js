  import { createSlice } from '@reduxjs/toolkit'
  import db from './Firebase'
  // import { dataRef } from './Firebase';
  import { getDocs, collection, updateDoc,addDoc,deleteDoc, doc } from "firebase/firestore"; 
  import { useEffect } from 'react';

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
          const id =action.payload.id;
          const item =action.payload.todo;
          
          try {
            const docRef =addDoc(collection(db, "Todo-List-2"), {
              id: id,
              item: item,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

        
        },
        
          
        fetchData: async (state) => {
          try {
            const querySnapshot = await getDocs(collection(db, "Todo-List-2"));

            const data = querySnapshot.docs.doc;
            console.log("Data fetched from database:", data);
            state.value = data; // Update the state with fetched data
          } catch (e) {
            console.error("Error fetching data: ", e);
          }
        },
        

        removeTodo:(state,action)=>{
          const todoIdToRemove = action.payload;
          console.log(todoIdToRemove);
          state.value = state.value.filter(todo => todo.id !== action.payload);
          
          try {
            deleteDoc(doc(db, "Todo-List-2", todoIdToRemove));
            console.log("Document deleted with ID: ", todoIdToRemove);
          } catch (e) {
            console.error("Error deleting document: ", e);
          }

          
        },

        

        editTodo: (state, action) => {
          const { id, updatedTodo } = action.payload;
          const todoToEdit = state.value.find(todo => todo.id === id);  
          console.log(updatedTodo);
          try {
            console.log("Edit press");
            updateDoc(doc(db, "Todo-List-2", id), {
              item: updatedTodo,
            });
            console.log("Document updated with ID: ", id);
          } catch (e) {
            console.error("Error updating document: ", e);
          }
          if (todoToEdit) {
            todoToEdit.todo = updatedTodo;
          }
          
        },

      },
    
    })
    
    export const {Add_item,removeTodo,editTodo,saveData,fetchData} = todoSlice.actions
    
    export default todoSlice.reducer