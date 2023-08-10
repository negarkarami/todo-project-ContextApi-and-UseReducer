import {useContext, useState} from "react";
import TodoContext from "../../context/TodoContext";

const CreateToDo = () => {
    const {addTodo} = useContext(TodoContext)

    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title) {
            setLoading(true)
          await addTodo(title)
            setLoading(false)

        }


    }
    return(
        <>
            <h4>Create Todo</h4>
            <form onSubmit={(e) => handleSubmit(e)} className='row mt-3'>
                <div className='col-md-6'>
                    <input type='text'   onChange={(e) => setTitle(e.target.value)} value={title} className='form-control' placeholder='Todo Title....'/>
                    <div className='form-text text-danger'>{title? '' : 'This is required'}</div>
                </div>
                <div className='col-auto'>
                    <button type={"submit"} className='btn btn-dark'>Create
                        {
                            loading &&
                            <div className='spinner-border spinner-border-sm'></div>
                        }
                    </button>

                </div>
            </form>


        </>
    )

}

export default CreateToDo