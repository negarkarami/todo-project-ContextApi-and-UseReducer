import TodoContext from "./TodoContext";
import {useCallback, useReducer} from "react";
import todoReducer from "./todoReducer";
import axios from "axios";
import Swal from "sweetalert2";


const TodoProvider = ({children}) => {
    const initialState = {
        todos : [],
        error : null
    }
   const [state, dispatch] = useReducer(todoReducer, initialState)

   const getTodo = useCallback(async ()  => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
            dispatch({type:'SET_TODOS', payload: res.data})
            dispatch({type:'SET_ERROR', payload: null})

        }catch (err) {
            dispatch({type:'SET_ERROR', payload: err.message})
            dispatch({type:'SET_TODOS', payload: []})
        }

    }, [])

    const filterTodo = async (count)  => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`);
            dispatch({type:'FILTER_TODOS', payload: res.data})
            dispatch({type:'SET_ERROR', payload: null})

        }catch (err) {
            dispatch({type:'SET_ERROR', payload: err.message})
            dispatch({type:'FILTER_TODOS', payload: []})
        }

    }

    const addTodo = async (title)  => {
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
                title: title,
                completed: false
            });
            console.log(res.data)
            dispatch({type:'ADD_TODO', payload: res.data})
            dispatch({type:'SET_ERROR', payload: null})
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'task added',
                showConfirmButton: false,
                timerProgressBar: true,
                toast:true,
                timer: 3000
            })

        }catch (err) {
            dispatch({type:'SET_ERROR', payload: err.message})
            dispatch({type:'FILTER_TODOS', payload: []})
        }

    }

    const updateTodo = async (todoItem)  => {
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
                title: todoItem.title,
                completed: !todoItem.completed
            });
            console.log(res.data)
            dispatch({type:'UPDATE_TODO', payload: res.data})
            dispatch({type:'SET_ERROR', payload: null})
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'task updated',
                showConfirmButton: false,
                timerProgressBar: true,
                toast:true,
                timer: 3000
            })

        }catch (err) {
            dispatch({type:'SET_ERROR', payload: err.message})
            dispatch({type:'UPDATE_TODO', payload: []})
        }

    }

    const removeTodo = async (todoId)  => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            console.log(res.data)
            dispatch({type:'DELETE_TODO', payload:todoId})
            dispatch({type:'SET_ERROR', payload: null})
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'task deleted',
                showConfirmButton: false,
                timerProgressBar: true,
                toast:true,
                timer: 3000
            })

        }catch (err) {
            dispatch({type:'SET_ERROR', payload: err.message})
            dispatch({type:'DELETE_TODO', payload: []})
        }

    }

    return(
        <TodoContext.Provider value={{...state, getTodo, filterTodo, addTodo, updateTodo, removeTodo}}>
            {children}
        </TodoContext.Provider>
    )

}

export default TodoProvider