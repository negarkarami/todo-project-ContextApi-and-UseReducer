import {useContext, useState} from "react";
import TodoContext from "../../context/TodoContext";

const UpdateToDo = ({item}) => {
    const {updateTodo} = useContext(TodoContext)
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        setLoading(true)
       await updateTodo(item)
        setLoading(false)

    }

  return(
      <>
          {item.completed?
              <i onClick={handleUpdate} className='bi bi-check-all fs-4'></i>
              :
              <i onClick={handleUpdate} className='bi bi-check fs-4'></i>
          }
          {
              loading &&
              <div className='spinner-border spinner-border-sm'></div>
          }

      </>
  )
}

export default UpdateToDo