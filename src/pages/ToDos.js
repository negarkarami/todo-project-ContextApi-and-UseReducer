import {useContext, useEffect, useState} from "react";
import TodoContext from "../context/TodoContext";
import FilterToDos from "../component/todo/Filter";
import CreateToDo from "../component/todo/Create";
import UpdateToDo from "../component/todo/Update";
import DeleteToDo from "../component/todo/Delete";



const ToDos = () => {
   // const todoContext = useContext(TodoContext)
   // const {state, dispatch} = useContext(TodoContext)
   const {error, getTodo, todos} = useContext(TodoContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // روش fetch

        // fetch("https://jsonplaceholder.typicode.com/todos")
        //     .then(res => res.json()).then(data => {
        //     todoContext.dispatch({type: 'SET_TODOS', payload: data})
        // })

        // روش 1 axios
        // axios.get("https://jsonplaceholder.typicode.com/todos")
        //     .then(res => console.log(res.data))
        //     .catch((err) => console.log(err) )

        // روش 2 axios
       // async function fetchData() {
       //     try {
       //         const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
       //         dispatch({type:'SET_TODOS', payload: res.data})
       //         setLoading(false)
       //     }catch (err) {
       //         console.log(err.message)
       //     }
       //
       //  }
       //  fetchData()

        // const fetchData = async () => {
        //     await getTodo()
        //     setLoading(false)
        // }
        // fetchData()

        (
            async () => {
                await getTodo()
                setLoading(false)
            }
        )()



    }, [getTodo])

    return(
        <div className='container mt-5'>
            <div className='row g-3'>
                <CreateToDo/>
                <FilterToDos/>
                {
                    error &&  <div>{error}</div>
                }
                {
                    loading &&
                    <div className='col-md-12 text-center'>
                        <div className='spinner-border mt-5'></div>
                    </div>
                }
                {todos && todos.map((item, index) => (
                    <div className='col-md-4' key={index}>
                        <div className={'card ' + (item.completed && 'bg-light')}>
                            <div className='card-body d-flex justify-content-between align-items-center'>
                                <div>{item.completed ? <del>{item.title}</del> : <span>{item.title}</span>}</div>
                                <div className='d-flex align-items-center'>
                                    <UpdateToDo item={item}/>
                                    <DeleteToDo todoId={item.id}/>
                                </div>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ToDos