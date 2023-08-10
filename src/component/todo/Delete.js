import {useContext} from "react";
import TodoContext from "../../context/TodoContext";

const DeleteToDo = ({todoId}) => {
    const {removeTodo} = useContext(TodoContext)
    const handleDelete = async () => {
       await removeTodo(todoId)

    }
  return(
      <>
          <i onClick={handleDelete} className='bi bi-trash-fill fs-6'></i>
      </>
  )
}

export default DeleteToDo