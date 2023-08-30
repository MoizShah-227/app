  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
  import db from './Firebase'
  import { dataRef } from './Firebase';
  import { getDocs, collection, updateDoc,addDoc,deleteDoc, doc, onSnapshot, Firestore } from "firebase/firestore";
  import { Firebase } from 'firebase/app';


  export const fetchdata = createAsyncThunk('Todo/fetchTodos', async()=>{
    try {
      const querySnapshot = await getDocs(collection(db, 'Todo-List-3'));
      let tempArr = []
      querySnapshot?.docs?.forEach(doc=>{
        tempArr.push({
          docId: doc.id,
          ...doc.data()
        })
      })
     return {data: tempArr}
    } catch (error) {
      console.log("Data not fetched", error);
    }
  })
  
  const initialState = {
    todos:[],
  }
    // console.log(initialState.value)
   const todoSlice = createSlice({
      name: 'Todo',
      initialState,
      reducers: {
        

        Add_item(state , action){
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
  
        async removeTodo(state, action){
          const todoIdToRemove = action.payload;
          console.log(todoIdToRemove);
          try {
            await deleteDoc(doc(db, "Todo-List-3", todoIdToRemove));
            console.log("Document deleted with ID: ", todoIdToRemove);
          } catch (e) {
            console.error("Error deleting document: ",e);
          }
        },
      
        editTodo(state, action){
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

      extraReducers:(builder)=>{
        builder.addCase(fetchdata.fulfilled, (state, action)=>{
          console.log('action', action)
          state.todos = action?.payload?.data
        })
      }
    
    })
    
    
    export default todoSlice.reducer