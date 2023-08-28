import React from 'react'
import { getDocs, collection, updateDoc,addDoc,deleteDoc, doc, onSnapshot } from "firebase/firestore"; 
import db from './Firebase'

const Try = () => {
    const todoList = [];
    const fetchdata = async ()=>{
          try {
            const querySnapshot =  await getDocs(collection(db, 'Todo-List'));
        
            // console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
              todoList.push({
                id: doc.id,
                ...doc.data(),
              })
            })
        
            // todo=todoList;
            console.log("Helo",todoList);
            // console.log(action.payload)
        
          }catch(error){
            console.log("data not fetch", error)
          }
          
        }
        window.onload =fetchdata()
        {JSON.stringify(todoList)}
        return (
            <div>
        <h1>heloo{todoList}</h1>
        {todoList.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.title; // Assuming 'title' is a property in your todo object
        todoList.appendChild(li);
    })}
    </div>
  )
}

export default Try
