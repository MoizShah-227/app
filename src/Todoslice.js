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

    export const removeTodo =createAsyncThunk('Todo/removetodo', async(payload)=>{
    console.log("payload",payload);
      const todoIdToRemove = payload;
    console.log("This is id",todoIdToRemove);
      try {
           deleteDoc(doc(db, "Todo-List-3", todoIdToRemove));
            console.log("Document deleted with ID: ", todoIdToRemove);
            // return state; 
          } catch (e) {
            console.error("Error deleting document: ",e);
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
      
        editTodo(state, action){
          console.log(action.payload)
          const { id, updatedTodo } = action.payload;
          console.log(id)
          try {
            updateDoc(doc(db, "Todo-List-3", id), {
              item: updatedTodo,
            });
            console.log("Document updated with ID: ", id);
          } catch (e) {
            console.error("Error updating document: ", e);
          }
          // if (todoToEdit) {
          //   console.log("Edit-One",todoToEdit)
          //   todoToEdit.todo = updatedTodo;
          // }
          
        },

      },

      extraReducers:(builder)=>{
        builder.addCase(fetchdata.fulfilled,(state, action)=>{
          console.log('action', action)
          state.todos = action?.payload?.data
        })

        
      }
    
    })

    export const {Add_item,editTodo,saveData,todos} = todoSlice.actions
    export default todoSlice.reducer